import { Badge } from "@/components/ui/badge";

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

const STATUS_CONFIG = {
    pending: {
        label: "Pending",
        icon: Clock3,
        className:
            "bg-amber-50 text-amber-700 border-amber-200",
    },

    confirmed: {
        label: "Confirmed",
        icon: BadgeCheck,
        className:
            "bg-blue-50 text-blue-700 border-blue-200",
    },

    packed: {
        label: "Packed",
        icon: Package,
        className:
            "bg-purple-50 text-purple-700 border-purple-200",
    },

    assigned: {
        label: "Assigned",
        icon: UserCheck,
        className:
            "bg-cyan-50 text-cyan-700 border-cyan-200",
    },

    "picked up": {
        label: "Picked Up",
        icon: PackageCheck,
        className:
            "bg-indigo-50 text-indigo-700 border-indigo-200",
    },

    "out for delivery": {
        label: "Out For Delivery",
        icon: Truck,
        className:
            "bg-orange-50 text-orange-700 border-orange-200",
    },

    delivered: {
        label: "Delivered",
        icon: CircleCheckBig,
        className:
            "bg-green-50 text-green-700 border-green-200",
    },

    cancelled: {
        label: "Cancelled",
        icon: CircleX,
        className:
            "bg-red-50 text-red-700 border-red-200",
    },
};

const OrderStatusBadge = ({
    orderStatus = "Pending",
    className = "",
}) => {

    const key = orderStatus
        ?.trim()
        ?.toLowerCase();

    const config =
        STATUS_CONFIG[key] ||
        STATUS_CONFIG.pending;

    const Icon = config.icon;

    return (

        <Badge
            variant="outline"
            className={`
                inline-flex
                items-center
                gap-1.5
                rounded-full
                border
                px-3
                py-1
                text-xs
                font-medium
                whitespace-nowrap
                ${config.className}
                ${className}
            `}
        >

            <Icon
                size={14}
                strokeWidth={2.2}
            />

            {config.label}

        </Badge>

    );

};

export default OrderStatusBadge;