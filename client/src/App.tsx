import "./App.css";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Register from "./features/auth/Register";
import Login from "./features/auth/Login";
import { useAppDispatch } from "./app/hooks";
import { useEffect } from "react";
import { fetchUser } from "./app/slices/userSlice";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./layouts/ProtectedRoute";
import WithMobileNav from "./layouts/WithNav";
import Collection from "./features/collection/Collection";
import Grails from "./features/grails/Grails";
import Profile from "./features/profile/Profile";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route element={<WithMobileNav />}>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/collection"
          element={
            <ProtectedRoute>
              <Collection />
            </ProtectedRoute>
          }
        />
        <Route
          path="/grails"
          element={
            <ProtectedRoute>
              <Grails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
