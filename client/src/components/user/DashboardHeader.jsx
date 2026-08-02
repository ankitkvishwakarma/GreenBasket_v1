import { Search, Bell, ChevronDown, Menu } from "lucide-react";

const DashboardHeader = ({
    onMenuClick,
    user,
    notificationCount = 0,
}) => {

    const hour = new Date().getHours();

    const greeting =
        hour < 12
            ? "Morning"
            : hour < 17
                ? "Afternoon"
                : "Evening";

    const userName = user?.name || "User";
    const userRole = user?.role || "Customer";

    // ✅ Correct avatar url
    const profileImage =
        user?.avatar?.url ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=16a34a&color=fff`;

    return (
        <header className="sticky top-0 z-50 h-16 bg-white border-b border-gray-200">

            <div className="h-full px-3 lg:px-5 flex items-center justify-between gap-3">

                {/* Left */}
                <div className="flex items-center gap-3 lg:gap-8">

                    <button
                        onClick={onMenuClick}
                        className="lg:hidden w-9 h-9 rounded-lg border flex items-center justify-center"
                    >
                        <Menu size={18} />
                    </button>

                    <div className="flex items-center gap-2 cursor-pointer">

                        <div className="w-9 h-9 rounded-xl bg-green-600 flex items-center justify-center text-white font-bold text-sm">
                            G
                        </div>

                        <div className="hidden sm:block">
                            <h2 className="text-sm font-bold text-green-700">
                                GreenBasket
                            </h2>

                            <p className="text-[10px] text-gray-500">
                                Grocery Store
                            </p>
                        </div>

                    </div>

                    <div className="hidden xl:block">

                        <h3 className="text-sm font-semibold text-gray-800">
                            Good {greeting}, {userName} 👋
                        </h3>

                        <p className="text-xs text-gray-500">
                            Welcome Back
                        </p>

                    </div>

                </div>

                {/* Search */}
                <div className="hidden md:flex flex-1 max-w-lg">

                    <div className="w-full h-10 rounded-xl border bg-gray-50 border-gray-200 flex items-center px-3">

                        <Search
                            size={16}
                            className="text-gray-400"
                        />

                        <input
                            type="text"
                            placeholder="Search..."
                            className="flex-1 bg-transparent outline-none ml-2 text-sm"
                        />

                    </div>

                </div>

                {/* Right */}
                <div className="flex items-center gap-2 lg:gap-4">

                    <button className="relative w-9 h-9 rounded-lg hover:bg-gray-100 flex items-center justify-center">

                        <Bell
                            size={18}
                            className="text-gray-700"
                        />

                        {notificationCount > 0 && (
                            <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center">
                                {notificationCount > 99 ? "99+" : notificationCount}
                            </span>
                        )}

                    </button>

                    <button className="flex items-center gap-2">

                        <img
                            src={profileImage}
                            alt={userName}
                            className="w-9 h-9 rounded-full object-cover border"
                            onError={(e) => {
                                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=16a34a&color=fff`;
                            }}
                        />

                        <div className="hidden lg:block text-left">

                            <h4 className="text-xs font-semibold">
                                {userName}
                            </h4>

                            <p className="text-[11px] text-gray-500 capitalize">
                                {userRole}
                            </p>

                        </div>

                        <ChevronDown
                            size={16}
                            className="hidden lg:block"
                        />

                    </button>

                </div>

            </div>

            {/* Mobile Search */}
            <div className="md:hidden px-3 pb-3">

                <div className="h-10 rounded-xl border border-gray-200 bg-gray-50 flex items-center px-3">

                    <Search
                        size={16}
                        className="text-gray-400"
                    />

                    <input
                        type="text"
                        placeholder="Search..."
                        className="flex-1 ml-2 bg-transparent outline-none text-sm"
                    />

                </div>

            </div>

        </header>
    );
};

export default DashboardHeader;