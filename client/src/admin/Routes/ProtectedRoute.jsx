import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("accessToken");
  const admin = JSON.parse(localStorage.getItem("admin"));

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  if (!admin || admin.role !== "Admin") {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("admin");

    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;