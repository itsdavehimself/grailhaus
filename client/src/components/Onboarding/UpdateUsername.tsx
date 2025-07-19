import { useState, useEffect } from "react";
import { useAppSelector } from "../../app/hooks";
import SubmitButton from "../common/SubmitButton";
import ValidatedInput from "../common/ValidatedInput";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import OnboardingModal from "./OnboardingModal";
import DoLaterButton from "../DoLaterButton";
import { useSkipOnboarding } from "../../hooks/useSkipOnboarding";

const apiUrl = import.meta.env.VITE_API_BASE_URL;

type Input = {
  username: string;
};

interface UpdateUsernameProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateUsername: React.FC<UpdateUsernameProps> = ({ setShowModal }) => {
  const user = useAppSelector((state) => state.user.user);
  const [usernameInput, setUsernameInput] = useState(user?.username || "");
  const [error, setError] = useState<string | null>(null);
  const { skip, error: skipError } = useSkipOnboarding();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Input>();

  useEffect(() => {
    const subscription = watch(() => {
      if (error) setError(null);
    });
    return () => subscription.unsubscribe();
  }, [watch, error]);

  const onSubmit: SubmitHandler<Input> = async (data): Promise<void> => {
    if (!errors.username) {
      setError(null);
    }

    if (user?.username === data.username) {
      setError(null);
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/api/user/update-username`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username: data.username }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const message = Array.isArray(errorData)
          ? errorData.join(", ")
          : errorData?.message || "Failed to update username";
        setError(message);
        return;
      }

      setError(null);
      setShowModal(false);
    } catch (err) {
      if (err instanceof Error) {
        console.error("Network or server error:", err.message);
        setError("Something went wrong: " + err.message);
      } else {
        console.error("Unknown error:", err);
        setError("An unknown error occurred.");
      }
    }
  };

  return (
    <div className="absolute inset-0 z-100 h-screen w-screen flex flex-col justify-center items-center">
      <OnboardingModal
        title="What do we call you?"
        subtitle="Used for your collection, wishlist, and more."
        skip={skip}
        children={
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <div className="flex flex-col w-full">
              <ValidatedInput
                register={register("username", {
                  required: "Please enter your username",
                })}
                error={errors.username}
                placeholder="Username"
                type="text"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
              />
              <div className="self-start min-h-5 text-error-red text-sm">
                {error === "Invalid credentials" ? (
                  <p>Something doesn't look right. Check your credentials.</p>
                ) : error || skipError ? (
                  <div className="self-start text-error-red text-sm space-y-1">
                    {(error || skipError)?.split(",").map((msg, idx) => (
                      <p key={idx}>{msg.trim()}</p>
                    ))}
                  </div>
                ) : errors.username?.message ? (
                  <p>{errors.username.message}</p>
                ) : null}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <SubmitButton label="Update" />
              <DoLaterButton action={skip} />
            </div>
          </form>
        }
      />
    </div>
  );
};

export default UpdateUsername;
