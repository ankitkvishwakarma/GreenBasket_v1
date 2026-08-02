import { Eye, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const getStatusStyle = (status) => {
    switch (status) {
        case "Delivered":
            return "bg-green-100 text-green-700";
        case "Pending":
            return "bg-yellow-100 text-yellow-700";
        case "Confirmed":
            return "bg-indigo-100 text-indigo-700";
        case "Packed":
            return "bg-orange-100 text-orange-700";
        case "Shipped":
            return "bg-blue-100 text-blue-700";
        case "Cancelled":
            return "bg-red-100 text-red-700";
        default:
            return "bg-gray-100 text-gray-700";
    }
};

const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};

const RecentOrders = ({ orders = [] }) => {

    const navigate = useNavigate();

    return (
        <div className="bg-white rounded-2xl border border-gray-200 p-4">

            {/* Header */}
            <div className="flex items-center justify-between mb-4">

                <div>

                    <h2 className="text-base font-semibold text-gray-800">
                        Recent Orders
                    </h2>

                    <p className="text-xs text-gray-500 mt-1">
                        Latest grocery orders
                    </p>

                </div>

                <button
                    onClick={() => navigate("/user/orders")}
                    className="flex items-center gap-1 text-green-600 text-sm font-medium hover:text-green-700"
                >
                    View All
                    <ArrowRight size={15} />
                </button>

            </div>

            {orders.length === 0 ? (

                <div className="py-12 text-center text-gray-500">
                    No recent orders found.
                </div>

            ) : (

                <div className="overflow-x-auto">

                    <table className="w-full">

                        <thead>

                            <tr className="border-b text-left">

                                <th className="pb-3 text-xs font-medium text-gray-500">
                                    Order ID
                                </th>

                                <th className="pb-3 text-xs font-medium text-gray-500">
                                    Date
                                </th>

                                <th className="pb-3 text-xs font-medium text-gray-500">
                                    Amount
                                </th>

                                <th className="pb-3 text-xs font-medium text-gray-500">
                                    Status
                                </th>

                                <th className="pb-3 text-right text-xs font-medium text-gray-500">
                                    Action
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {orders.map((order) => (

                                <tr
                                    key={order._id}
                                    className="border-b last:border-0 hover:bg-gray-50 transition"
                                >

                                    <td className="py-4 text-sm font-semibold text-gray-800">
                                        {order.orderNumber || order._id?.slice(-8)}
                                    </td>

                                    <td className="py-4 text-sm text-gray-600">
                                        {formatDate(order.createdAt)}
                                    </td>

                                    <td className="py-4 text-sm font-medium text-gray-800">
                                        ₹{order.totalAmount}
                                    </td>

                                    <td className="py-4">

                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(order.orderStatus)}`}
                                        >
                                            {order.orderStatus}
                                        </span>

                                    </td>

                                    <td className="py-4 text-right">

                                        <button
                                            onClick={() =>
                                                navigate(`/user/orders/${order._id}`)
                                            }
                                            className="w-8 h-8 rounded-lg border border-gray-200 hover:bg-green-50 hover:border-green-500 flex items-center justify-center ml-auto"
                                        >

                                            <Eye
                                                size={15}
                                                className="text-gray-600"
                                            />

                                        </button>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            )}

        </div>
    );
};

export default RecentOrders;