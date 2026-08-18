import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ adminOnly }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("users"));

  if (!token || !user) {
    return <Navigate to="/Login" replace />;
  }

  if (adminOnly && !user.isAdmin) {
    return <Navigate to="/home" replace />;
  }


  return <Outlet />;
};

export default ProtectedRoute;
