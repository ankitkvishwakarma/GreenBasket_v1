import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const UserProtectedRoute = () => {
  const { isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  const location = useLocation();

  // Not logged in
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  // Prevent admin from using customer routes
  if (user?.role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
};

export default UserProtectedRoute;