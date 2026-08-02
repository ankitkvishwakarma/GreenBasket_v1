import {
    ShoppingBag,
    MapPin,
    TicketPercent,
    CreditCard,
    ArrowRight,
    Package,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const QuickActions = ({ user }) => {
    const navigate = useNavigate();

    const actions = [
        {
            id: 1,
            title: "Shop Now",
            subtitle: "Browse Products",
            icon: ShoppingBag,
            color: "bg-green-100 text-green-600",
            path: "/",
        },
        {
            id: 2,
            title: "My Orders",
            subtitle: "Track Your Orders",
            icon: Package,
            color: "bg-blue-100 text-blue-600",
            path: "/user/orders",
        },
        {
            id: 3,
            title: "My Addresses",
            subtitle: "Manage Addresses",
            icon: MapPin,
            color: "bg-orange-100 text-orange-600",
            path: "/user/addresses",
        },
        {
            id: 4,
            title: "Coupons",
            subtitle: "Available Offers",
            icon: TicketPercent,
            color: "bg-pink-100 text-pink-600",
            path: "/user/coupons",
        },
        {
            id: 5,
            title: "Payments",
            subtitle: "Payment History",
            icon: CreditCard,
            color: "bg-purple-100 text-purple-600",
            path: "/user/payments",
        },
    ];

    return (
        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
            <div className="mb-5">
                <h2 className="text-lg font-semibold text-gray-800">
                    Quick Actions
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                    Welcome back,{" "}
                    <span className="font-medium text-green-600">
                        {user?.name || "User"}
                    </span>
                </p>
            </div>

            <div className="space-y-3">
                {actions.map((item) => {
                    const Icon = item.icon;

                    return (
                        <button
                            key={item.id}
                            type="button"
                            onClick={() => navigate(item.path)}
                            className="group w-full flex items-center justify-between rounded-xl border border-gray-200 p-4 hover:border-green-500 hover:bg-green-50 transition-all duration-300"
                        >
                            <div className="flex items-center gap-4">
                                <div
                                    className={`w-11 h-11 rounded-xl flex items-center justify-center ${item.color}`}
                                >
                                    <Icon size={20} />
                                </div>

                                <div className="text-left">
                                    <h4 className="text-sm font-semibold text-gray-800 group-hover:text-green-700 transition-colors">
                                        {item.title}
                                    </h4>

                                    <p className="text-xs text-gray-500">
                                        {item.subtitle}
                                    </p>
                                </div>
                            </div>

                            <ArrowRight
                                size={18}
                                className="text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all"
                            />
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default QuickActions;