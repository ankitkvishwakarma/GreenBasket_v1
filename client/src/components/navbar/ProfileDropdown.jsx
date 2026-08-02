import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  LayoutDashboard,
  ShoppingBag,
  Heart,
  Bell,
  MapPin,
  TicketPercent,
  Settings,
  CircleHelp,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/auth/authSlice";

const ProfileDropdown = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  // Adjust these selectors according to your Redux state
  const wishlistCount =
    useSelector((state) => state.wishlist?.items?.length) || 0;

  const notificationCount =
    useSelector((state) => state.notification?.unreadCount) || 0;

  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());

    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");

    navigate("/login");
  };

  const menuItems = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/user/dashboard",
      color: "text-green-600",
    },
    {
      label: "My Profile",
      icon: User,
      path: "/user/profile",
      color: "text-blue-600",
    },
    {
      label: "My Orders",
      icon: ShoppingBag,
      path: "/user/orders",
      color: "text-green-600",
    },
    {
      label: "Wishlist",
      icon: Heart,
      path: "/user/wishlist",
      color: "text-pink-500",
      badge: wishlistCount,
    },
    {
      label: "Notifications",
      icon: Bell,
      path: "/user/notifications",
      color: "text-amber-500",
      badge: notificationCount,
    },
    {
      label: "My Addresses",
      icon: MapPin,
      path: "/user/addresses",
      color: "text-red-500",
    },
    {
      label: "Coupons",
      icon: TicketPercent,
      path: "/user/coupons",
      color: "text-violet-500",
    },
    {
      label: "Settings",
      icon: Settings,
      path: "/user/settings",
      color: "text-gray-500",
    },
    {
      label: "Help Center",
      icon: CircleHelp,
      path: "/user/help",
      color: "text-sky-500",
    },
  ];

  return (
    <div className="relative">
      <motion.button
        whileHover={{ y: -2, scale: 1.03 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white/80 px-2 py-1 shadow-sm backdrop-blur-xl hover:border-green-500 hover:shadow-lg"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-green-600 to-emerald-500 text-white">
          <User size={18} />
        </div>

        <ChevronDown
          size={16}
          className={`transition-transform ${open ? "rotate-180" : ""
            }`}
        />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="absolute right-0 mt-3 w-80 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 via-emerald-500 to-lime-500 p-5 text-white">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-green-600">
                  <User size={28} />
                </div>

                <div className="min-w-0">
                  <h2 className="truncate text-lg font-bold">
                    {user?.name || "Customer"}
                  </h2>

                  <p className="truncate text-sm text-green-100">
                    {user?.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Menu */}
            <div className="space-y-1 p-3">
              {menuItems.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.label}
                    to={item.path}
                    onClick={() => {
                      console.log(item.path);
                      setOpen(false);
                    }}
                    className="flex items-center justify-between rounded-2xl p-3 transition hover:bg-green-50"
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        size={18}
                        className={item.color}
                      />

                      <span className="font-medium">
                        {item.label}
                      </span>
                    </div>

                    {item.badge > 0 && (
                      <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}

              <hr className="my-3" />

              <button
                onClick={() => {
                  setOpen(false);
                  handleLogout();
                }}
                className="flex w-full items-center gap-3 rounded-2xl p-3 font-medium text-red-600 transition hover:bg-red-50"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileDropdown;