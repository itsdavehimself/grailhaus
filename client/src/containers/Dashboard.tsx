import { useAppSelector } from "../app/hooks";
import UpdateUsername from "../components/Onboarding/UpdateUsername";
import { useEffect, useState } from "react";

const Dashboard: React.FC = () => {
  const user = useAppSelector((state) => state.user.user);

  const [showUsernameModal, setShowUsernameModal] = useState(false);

  useEffect(() => {
    if (user?.firstSignIn) {
      setShowUsernameModal(true);
    }
  }, [user]);

  return (
    <main className="flex flex-col">
      <h1 className="font-semibold mt-2">Grailhaus</h1>
      <h2 className="text-xl font-semibold my-4">
        Welcome back, {user?.username}
      </h2>
      <div className="border-1 border-gray-100 rounded-xl h-100 w-full"></div>
      {showUsernameModal && (
        <UpdateUsername setShowModal={setShowUsernameModal} />
      )}
    </main>
  );
};

export default Dashboard;
