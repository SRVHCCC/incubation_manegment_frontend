import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const token =
    sessionStorage.getItem("token") || localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
