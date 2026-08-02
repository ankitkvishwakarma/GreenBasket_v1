import {
    LayoutDashboard,
    ShoppingBag,
    Heart,
    ShoppingCart,
    MapPin,
    TicketPercent,
    Bell,
    User,
    Settings,
    LogOut,
    Crown,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/auth/authThunk";

const UserSidebar = ({ user }) => {

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const menus = [
        {
            id: 1,
            title: "Dashboard",
            icon: LayoutDashboard,
            path: "/user/dashboard",
        },
        {
            id: 2,
            title: "My Orders",
            icon: ShoppingBag,
            path: "/user/orders",
        },
        {
            id: 3,
            title: "Wishlist",
            icon: Heart,
            path: "/user/wishlist",
        },
        {
            id: 4,
            title: "Cart",
            icon: ShoppingCart,
            path: "/cart",
        },
        {
            id: 5,
            title: "Addresses",
            icon: MapPin,
            path: "/user/address",
        },
        {
            id: 6,
            title: "Coupons",
            icon: TicketPercent,
            path: "/user/coupons",
        },
        {
            id: 7,
            title: "Notifications",
            icon: Bell,
            path: "/user/notifications",
        },
        {
            id: 8,
            title: "Profile",
            icon: User,
            path: "/user/profile",
        },
        {
            id: 9,
            title: "Settings",
            icon: Settings,
            path: "/user/settings",
        },
    ];

    const handleLogout = async () => {
        try {
            await dispatch(logoutUser()).unwrap();
            navigate("/login");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <aside className="hidden lg:flex sticky top-16 h-[calc(100vh-64px)] w-56 bg-white border-r border-gray-200 flex-col">

            {/* User Info */}



            {/* Menu */}

            <div className="flex-1 overflow-y-auto px-3 py-3">

                <ul className="space-y-1">

                    {menus.map((item) => {

                        const Icon = item.icon;

                        const active =
                            location.pathname === item.path;

                        return (
                            <li key={item.id}>

                                <button
                                    onClick={() => navigate(item.path)}
                                    className={`w-full h-10 flex items-center gap-3 rounded-lg px-3 text-[13px] font-medium transition-all duration-200 ${active
                                            ? "bg-green-600 text-white shadow-sm"
                                            : "text-gray-600 hover:bg-gray-100"
                                        }`}
                                >

                                    <Icon size={16} />

                                    <span>
                                        {item.title}
                                    </span>

                                </button>

                            </li>
                        );

                    })}

                </ul>

            </div>

            {/* Bottom */}

            <div className="border-t border-gray-200 p-3">

                <div className="rounded-xl bg-gradient-to-br from-green-600 to-emerald-500 p-3 text-white">

                    <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center">

                        <Crown size={18} />

                    </div>

                    <h3 className="mt-3 text-sm font-semibold">
                        Premium Plan
                    </h3>

                    <p className="mt-1 text-[11px] leading-4 text-green-100">
                        Unlock premium grocery benefits and free delivery.
                    </p>

                    <button
                        className="mt-3 w-full h-9 rounded-lg bg-white text-green-700 text-xs font-semibold hover:bg-gray-100 transition"
                    >
                        Upgrade
                    </button>

                </div>

                <button
                    onClick={handleLogout}
                    className="mt-3 w-full h-10 rounded-lg border border-red-200 flex items-center justify-center gap-2 text-[13px] font-medium text-red-600 hover:bg-red-50 transition"
                >

                    <LogOut size={16} />

                    Logout

                </button>

            </div>

        </aside>
    );
};

export default UserSidebar;