import { Routes, Route } from "react-router-dom";

// ================= Customer Pages =================
import Home from "@/pages/Home/Home";
import NotFound from "@/pages/Notfound";

// ================= Authentication =================
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import ForgotPassword from "@/pages/Auth/ForgotPassword";
import ResetPassword from "@/pages/Auth/ResetPassword";

// ================= User =================
import UserDashboard from "@/pages/user/Dashboard";
import UserLayout from "@/layouts/UserLayout";

// Uncomment these when pages are created
import Profile from "@/pages/user/Profile";
import Address from "@/pages/user/Address";
// import Wishlist from "@/pages/user/Wishlist";
// import Cart from "@/pages/user/Cart";
import Orders from "@/pages/user/Order";

// ================= Admin =================
import AdminLogin from "@/admin/pages/Login";
import AdminLayout from "@/layouts/AdminLayout";
import AdminDashboard from "@/admin/pages/Dasboard";
import Products from "@/admin/pages/Products";
import AdminCategories from "@/admin/pages/Category";
import AdminOrders from "@/admin/pages/Order";
import Users from "@/admin/pages/User";
import Coupons from "@/admin/pages/Coupons";
import Delivery from "@/admin/pages/Delivery";

// ================= Protected Routes =================
import ProtectedRoute from "../admin/Routes/ProtectedRoute";
import UserProtectedRoute from "@/routes/UserProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>

      {/* ================= Public ================= */}

      <Route path="/" element={<Home />} />

      {/* ================= Authentication ================= */}

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />
      <Route
        path="/reset-password/:token"
        element={<ResetPassword />}
      />

      {/* ================= User ================= */}

      <Route element={<UserProtectedRoute />}>
        <Route path="/user" element={<UserLayout />}>
          <Route
            index
            element={<UserDashboard />}
          />

          <Route
            path="dashboard"
            element={<UserDashboard />}
          />

          <Route
            path="profile"
            element={<Profile />}
          />

          <Route
            path="address"
            element={<Address />}
          />

          <Route
            path="orders"
            element={<Orders />}
          />
        </Route>
      </Route>
      {/* ================= Admin Login ================= */}

      <Route
        path="/admin/login"
        element={<AdminLogin />}
      />

      {/* ================= Admin ================= */}

      <Route element={<ProtectedRoute />}>
        <Route
          path="/admin"
          element={<AdminLayout />}
        >
          <Route
            index
            element={<AdminDashboard />}
          />

          <Route
            path="products"
            element={<Products />}
          />

          <Route
            path="categories"
            element={<AdminCategories />}
          />

          <Route
            path="orders"
            element={<AdminOrders />}
          />

          <Route
            path="delivery"
            element={<Delivery />}
          />

          <Route
            path="users"
            element={<Users />}
          />

          <Route
            path="coupons"
            element={<Coupons />}
          />
        </Route>
      </Route>

      {/* ================= 404 ================= */}

      <Route
        path="*"
        element={<NotFound />}
      />

    </Routes>
  );
};

export default AppRoutes;