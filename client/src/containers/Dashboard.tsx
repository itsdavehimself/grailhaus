import { useNavigate } from "react-router";
import { useAppDispatch } from "../app/hooks";
import { logout } from "../app/slices/userSlice";

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const handleLogout = async (): Promise<void> => {
    await fetch(`${apiUrl}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    dispatch(logout());
    navigate("/login");
  };

  return (
    <main>
      <button onClick={() => handleLogout()}>Logout</button>
    </main>
  );
};

export default Dashboard;
