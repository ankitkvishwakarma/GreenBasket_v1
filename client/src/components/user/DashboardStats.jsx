import {
    ShoppingBag,
    Heart,
    ShoppingCart,
    MapPin,
    TrendingUp,
} from "lucide-react";

const DashboardStats = ({ stats }) => {

    const dashboardStats = [
        {
            id: 1,
            title: "Total Orders",
            value: stats?.totalOrders || 0,
            subTitle: "Orders Placed",
            icon: ShoppingBag,
            iconBg: "bg-green-100",
            iconColor: "text-green-600",
        },
        {
            id: 2,
            title: "Wishlist",
            value: stats?.wishlistCount || 0,
            subTitle: "Saved Products",
            icon: Heart,
            iconBg: "bg-pink-100",
            iconColor: "text-pink-600",
        },
        {
            id: 3,
            title: "Cart Items",
            value: stats?.cartItems || 0,
            subTitle: "Ready Checkout",
            icon: ShoppingCart,
            iconBg: "bg-blue-100",
            iconColor: "text-blue-600",
        },
        {
            id: 4,
            title: "Addresses",
            value: stats?.addressCount || 0,
            subTitle: "Saved Addresses",
            icon: MapPin,
            iconBg: "bg-yellow-100",
            iconColor: "text-yellow-600",
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

            {dashboardStats.map((item) => {
                const Icon = item.icon;

                return (
                    <div
                        key={item.id}
                        className="bg-white border border-gray-200 rounded-2xl p-4 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                    >
                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-xs text-gray-500">
                                    {item.title}
                                </p>

                                <h2 className="text-2xl font-bold text-gray-800 mt-2">
                                    {item.value}
                                </h2>

                            </div>

                            <div
                                className={`w-11 h-11 rounded-xl flex items-center justify-center ${item.iconBg}`}
                            >
                                <Icon
                                    size={20}
                                    className={item.iconColor}
                                />
                            </div>

                        </div>

                        <div className="flex items-center gap-2 mt-4">

                            <TrendingUp
                                size={14}
                                className="text-green-600"
                            />

                            <span className="text-xs text-gray-500">
                                {item.subTitle}
                            </span>

                        </div>

                    </div>
                );
            })}

        </div>
    );
};

export default DashboardStats;