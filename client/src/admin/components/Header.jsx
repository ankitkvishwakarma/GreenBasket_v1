import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  Search,
  Moon,
  Sun,
  LogOut,
  ChevronDown,
  Settings,
} from "lucide-react";

import { logoutAdmin } from "../../services/authApi";

const Header = () => {
  const [dark, setDark] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutAdmin();
    } catch (err) {
      console.error(err);
    }

    localStorage.removeItem("accessToken");
    localStorage.removeItem("admin");

    navigate("/admin/login", { replace: true });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
      <div className="flex h-20 items-center justify-between px-8">

        {/* Search */}
        <div className="relative w-full max-w-lg">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search products, orders, customers..."
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 outline-none transition-all duration-300 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
          />
        </div>

        {/* Right */}
        <div className="ml-8 flex items-center gap-4">

          {/* Dark Mode */}
          <button
            onClick={() => setDark(!dark)}
            className="rounded-2xl bg-slate-100 p-3 transition hover:bg-slate-200"
          >
            {dark ? (
              <Sun className="text-yellow-500" size={20} />
            ) : (
              <Moon className="text-slate-700" size={20} />
            )}
          </button>

          {/* Notification */}
          <button className="relative rounded-2xl bg-slate-100 p-3 transition hover:bg-slate-200">
            <Bell className="text-slate-700" size={20} />

            <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white"></span>
          </button>

          {/* Settings */}
          <button className="rounded-2xl bg-slate-100 p-3 transition hover:bg-slate-200">
            <Settings
              className="text-slate-700"
              size={20}
            />
          </button>

          {/* Divider */}
          <div className="h-10 w-px bg-slate-200" />

          {/* Profile */}
          <button className="flex items-center gap-3 rounded-2xl px-2 py-2 transition hover:bg-slate-100">

            <img
              src="https://i.pravatar.cc/100"
              alt="Admin"
              className="h-11 w-11 rounded-full border-2 border-emerald-500"
            />

            <div className="text-left">
              <h3 className="font-semibold text-slate-800">
                Admin
              </h3>

              <p className="text-sm text-slate-500">
                Super Admin
              </p>
            </div>

            <ChevronDown
              size={18}
              className="text-slate-500"
            />
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-red-500 to-red-600 px-5 py-3 text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>
      </div>
    </header>
  );
};

export default Header;