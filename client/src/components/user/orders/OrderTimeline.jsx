import { motion } from "framer-motion";

import {
    Clock3,
    BadgeCheck,
    Package,
    UserCheck,
    PackageCheck,
    Truck,
    CircleCheckBig,
    CircleX,
} from "lucide-react";

const TIMELINE = [
    {
        key: "Pending",
        title: "Order Placed",
        description:
            "Your order has been placed successfully.",
        icon: Clock3,
    },
    {
        key: "Confirmed",
        title: "Order Confirmed",
        description:
            "Seller has confirmed your order.",
        icon: BadgeCheck,
    },
    {
        key: "Packed",
        title: "Packed",
        description:
            "Items are packed and ready.",
        icon: Package,
    },
    {
        key: "Assigned",
        title: "Delivery Assigned",
        description:
            "Delivery partner assigned.",
        icon: UserCheck,
    },
    {
        key: "Picked Up",
        title: "Picked Up",
        description:
            "Package picked from warehouse.",
        icon: PackageCheck,
    },
    {
        key: "Out for Delivery",
        title: "Out For Delivery",
        description:
            "Your package is on the way.",
        icon: Truck,
    },
    {
        key: "Delivered",
        title: "Delivered",
        description:
            "Order delivered successfully.",
        icon: CircleCheckBig,
    },
];

const STATUS_INDEX = {
    Pending: 0,
    Confirmed: 1,
    Packed: 2,
    Assigned: 3,
    "Picked Up": 4,
    "Out for Delivery": 5,
    Delivered: 6,
};

const formatDate = (date) => {

    if (!date) return "";

    return new Date(date).toLocaleString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }
    );

};
const OrderTimeline = ({ order }) => {

    if (!order) return null;

    //-----------------------------------------

    if (order.orderStatus === "Cancelled") {

        return (

            <div className="rounded-2xl border border-red-200 bg-red-50 p-5">

                <div className="flex items-start gap-4">

                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-100">

                        <CircleX
                            size={22}
                            className="text-red-600"
                        />

                    </div>

                    <div>

                        <h3 className="font-semibold text-red-700">

                            Order Cancelled

                        </h3>

                        <p className="mt-1 text-sm text-red-500">

                            {order.cancelReason ||
                                "This order has been cancelled."}

                        </p>

                        <p className="mt-2 text-xs text-red-400">

                            {formatDate(order.updatedAt)}

                        </p>

                    </div>

                </div>

            </div>

        );

    }

    //-----------------------------------------

    const currentStep =
        STATUS_INDEX[order.orderStatus] ?? 0;

    //-----------------------------------------

    return (

        <div className="space-y-6">

            {

                TIMELINE.map((step, index) => {

                    const Icon = step.icon;

                    const completed =
                        index <= currentStep;

                    const active =
                        index === currentStep;

                    return (

                        <motion.div
                            key={step.key}
                            initial={{
                                opacity: 0,
                                x: -20,
                            }}
                            animate={{
                                opacity: 1,
                                x: 0,
                            }}
                            transition={{
                                delay: index * .08,
                            }}
                            className="relative flex gap-4 pb-8 last:pb-0"
                        >

                            {

                                index !== TIMELINE.length - 1 && (

                                    <div
                                        className={`absolute left-5 top-10 h-full w-[2px]
                                        ${
                                            completed
                                                ? "bg-green-500"
                                                : "bg-slate-200"
                                        }`}
                                    />

                                )

                            }

                            <motion.div
                                animate={{
                                    scale: active
                                        ? [1, 1.15, 1]
                                        : 1,
                                }}
                                transition={{
                                    repeat: active
                                        ? Infinity
                                        : 0,
                                    duration: 1.8,
                                }}
                                className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2

                                ${
                                    completed
                                        ? "border-green-600 bg-green-600 text-white"
                                        : "border-slate-300 bg-white text-slate-400"
                                }`}
                            >

                                <Icon size={18} />

                            </motion.div>

                            <div className="flex-1">

                                <div className="flex items-center gap-2">

                                    <h4
                                        className={`font-semibold

                                        ${
                                            completed
                                                ? "text-slate-900"
                                                : "text-slate-400"
                                        }`}
                                    >

                                        {step.title}

                                    </h4>

                                    {

                                        active && (

                                            <span className="rounded-full bg-green-100 px-2 py-1 text-[10px] font-semibold text-green-700">

                                                Current

                                            </span>

                                        )

                                    }

                                </div>

                                <p className="mt-1 text-sm text-slate-500">

                                    {step.description}

                                </p>

                                {

                                    completed && (

                                        <p className="mt-2 text-xs text-slate-400">

                                            {formatDate(
                                                order.updatedAt
                                            )}

                                        </p>

                                    )

                                }

                            </div>

                        </motion.div>

                    );

                })

            }

        </div>

    );

};

export default OrderTimeline;