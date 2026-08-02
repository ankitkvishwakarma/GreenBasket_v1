import {
    ShoppingBag,
    Clock3,
    CircleCheckBig,
    IndianRupee,
    TrendingUp,
} from "lucide-react";

const OrderStats = ({ orders = [] }) => {

    //------------------------------------------
    // Statistics
    //------------------------------------------

    const totalOrders = orders.length;

    const pendingOrders = orders.filter((order) =>
        [
            "Pending",
            "Confirmed",
            "Packed",
            "Assigned",
            "Picked Up",
            "Out for Delivery",
        ].includes(order.orderStatus)
    ).length;

    const deliveredOrders = orders.filter(
        (order) => order.orderStatus === "Delivered"
    ).length;

    const totalSpent = orders
        .filter(
            (order) => order.paymentStatus === "Paid"
        )
        .reduce(
            (total, order) =>
                total + (order.finalAmount || 0),
            0
        );

    //------------------------------------------

    const stats = [
        {
            id: 1,
            title: "Total Orders",
            value: totalOrders,
            subTitle: "Orders Placed",
            icon: ShoppingBag,
            iconBg: "bg-green-100",
            iconColor: "text-green-600",
        },
        {
            id: 2,
            title: "Pending",
            value: pendingOrders,
            subTitle: "Awaiting Delivery",
            icon: Clock3,
            iconBg: "bg-amber-100",
            iconColor: "text-amber-600",
        },
        {
            id: 3,
            title: "Delivered",
            value: deliveredOrders,
            subTitle: "Successfully Delivered",
            icon: CircleCheckBig,
            iconBg: "bg-blue-100",
            iconColor: "text-blue-600",
        },
        {
            id: 4,
            title: "Total Spent",
            value: `₹${totalSpent.toLocaleString("en-IN")}`,
            subTitle: "Lifetime Spending",
            icon: IndianRupee,
            iconBg: "bg-emerald-100",
            iconColor: "text-emerald-600",
        },
    ];

    //------------------------------------------

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

            {stats.map((item) => {

                const Icon = item.icon;

                return (

                    <div
                        key={item.id}
                        className="rounded-2xl border border-gray-200 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                    >

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-xs text-gray-500">
                                    {item.title}
                                </p>

                                <h2 className="mt-2 text-2xl font-bold text-gray-800">
                                    {item.value}
                                </h2>

                            </div>

                            <div
                                className={`flex h-11 w-11 items-center justify-center rounded-xl ${item.iconBg}`}
                            >

                                <Icon
                                    size={20}
                                    className={item.iconColor}
                                />

                            </div>

                        </div>

                        <div className="mt-4 flex items-center gap-2">

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

export default OrderStats;