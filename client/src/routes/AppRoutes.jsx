import { Routes, Route } from "react-router-dom";

// ================= Customer Pages =================
import MainLayout from "@/layouts/MainLayout";
import Home from "@/pages/Home/Home";
// import CategoryPage from "@/pages/Category/Category";
import CategoryProducts from "@/pages/Category/CategoryProducts";
import ProductDetails from "@/pages/Product/ProductDetails";
import NotFound from "@/pages/Notfound";

// ================= Authentication =================
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import ForgotPassword from "@/pages/Auth/ForgotPassword";
import ResetPassword from "@/pages/Auth/ResetPassword";

// ================= User =================
import UserLayout from "@/layouts/UserLayout";
import UserDashboard from "@/pages/user/Dashboard";
import Profile from "@/pages/user/Profile";
import Address from "@/pages/user/Address";
import Orders from "@/pages/user/Order";
import CartPage from "@/pages/Cart/CartPage";
import CheckoutPage from "@/pages/Checkout/CheckoutPage";


// import Cart from "@/pages/Cart/Cart";
// import Wishlist from "@/pages/Wishlist/Wishlist";
// import Search from "@/pages/Search/Search";

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
import ProtectedRoute from "@/admin/Routes/ProtectedRoute";
import UserProtectedRoute from "@/routes/UserProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>

      {/* ================= Customer Layout ================= */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />

        <Route
          path="/product/:slug"
          element={<ProductDetails />}
        />
        <Route
   path="/category/:slug"
   element={<CategoryProducts />}
/>


        {/* Uncomment when created */}

        {/* <Route path="/wishlist" element={<Wishlist />} /> */}

        {/* <Route path="/search" element={<Search />} /> */}
     
 </Route>
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
          <Route path="cart" element={<CartPage />} />
          <Route
  path="checkout"
  element={<CheckoutPage />}
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