import {
    Bell,
    CheckCircle2,
    Truck,
    Tag,
    Gift,
    ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const getNotificationIcon = (type) => {
    switch (type) {
        case "ORDER_DELIVERED":
            return {
                icon: CheckCircle2,
                color: "bg-green-100 text-green-600",
            };

        case "ORDER_SHIPPED":
            return {
                icon: Truck,
                color: "bg-blue-100 text-blue-600",
            };

        case "COUPON":
            return {
                icon: Tag,
                color: "bg-orange-100 text-orange-600",
            };

        case "REWARD":
            return {
                icon: Gift,
                color: "bg-pink-100 text-pink-600",
            };

        default:
            return {
                icon: Bell,
                color: "bg-gray-100 text-gray-600",
            };
    }
};

const formatTime = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
    });
};

const Notifications = ({
    notifications = [],
    unreadCount = 0,
}) => {

    const navigate = useNavigate();

    return (
        <div className="bg-white border border-gray-200 rounded-2xl p-4">

            {/* Header */}
            <div className="flex items-center justify-between mb-4">

                <div className="flex items-center gap-2">

                    <Bell
                        size={18}
                        className="text-green-600"
                    />

                    <div>

                        <h2 className="text-base font-semibold text-gray-800">
                            Notifications
                        </h2>

                        <p className="text-xs text-gray-500">
                            {unreadCount} unread notification{unreadCount !== 1 && "s"}
                        </p>

                    </div>

                </div>

                <button
                    className="text-xs font-medium text-green-600 hover:text-green-700"
                >
                    Mark all as read
                </button>

            </div>

            {notifications.length === 0 ? (

                <div className="py-10 text-center text-gray-500">
                    No notifications available.
                </div>

            ) : (

                <div className="space-y-3">

                    {notifications.map((item) => {

                        const { icon: Icon, color } =
                            getNotificationIcon(item.type);

                        return (

                            <div
                                key={item._id}
                                className="flex items-start gap-3 rounded-xl border border-gray-200 p-3 hover:bg-gray-50 transition"
                            >

                                <div
                                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}
                                >
                                    <Icon size={18} />
                                </div>

                                <div className="flex-1">

                                    <div className="flex items-center justify-between">

                                        <h4 className="text-sm font-semibold text-gray-800">
                                            {item.title}
                                        </h4>

                                        {!item.isRead && (
                                            <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                        )}

                                    </div>

                                    <p className="text-xs text-gray-500 mt-1 leading-5">
                                        {item.message}
                                    </p>

                                    <div className="flex items-center justify-between mt-3">

                                        <span className="text-[11px] text-gray-400">
                                            {formatTime(item.createdAt)}
                                        </span>

                                        <button
                                            onClick={() => {
                                                if (item.link) {
                                                    navigate(item.link);
                                                }
                                            }}
                                            className="flex items-center gap-1 text-xs text-green-600 hover:text-green-700"
                                        >
                                            View

                                            <ArrowRight size={13} />
                                        </button>

                                    </div>

                                </div>

                            </div>

                        );

                    })}

                </div>

            )}

        </div>
    );
};

export default Notifications;