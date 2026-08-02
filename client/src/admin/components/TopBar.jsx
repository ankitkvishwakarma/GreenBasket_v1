import {
  Bell,
  Moon,
  Search,
  ChevronDown,
} from "lucide-react";

const TopBar = () => {
  return (
    <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8">

      {/* Left */}

      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          Dashboard
        </h2>

        <p className="text-sm text-gray-500">
          Welcome back, Admin 👋
        </p>
      </div>

      {/* Right */}

      <div className="flex items-center gap-5">

        {/* Search */}

        <div className="relative hidden lg:block">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search..."
            className="w-72 rounded-xl border border-gray-300 py-3 pl-11 pr-4 outline-none focus:border-green-600"
          />

        </div>

        {/* Dark Mode */}

        <button className="h-11 w-11 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition">

          <Moon size={20} />

        </button>

        {/* Notification */}

        <button className="relative h-11 w-11 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition">

          <Bell size={20} />

          <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-red-500"></span>

        </button>

        {/* Profile */}

        <button className="flex items-center gap-3 rounded-xl border border-gray-200 px-3 py-2 hover:bg-gray-100 transition">

          <img
            src="https://i.pravatar.cc/100"
            alt="Admin"
            className="h-10 w-10 rounded-full object-cover"
          />

          <div className="hidden md:block text-left">

            <h4 className="text-sm font-semibold">
              Admin
            </h4>

            <p className="text-xs text-gray-500">
              Super Admin
            </p>

          </div>

          <ChevronDown size={18} />

        </button>

      </div>

    </header>
  );
};

export default TopBar;