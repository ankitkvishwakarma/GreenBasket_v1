import { Badge } from "@/components/ui/badge";

import {
    CheckCircle2,
    Clock3,
    CircleX,
    RotateCcw,
} from "lucide-react";

const PAYMENT_CONFIG = {
    paid: {
        label: "Paid",
        icon: CheckCircle2,
        className:
            "bg-green-50 text-green-700 border-green-200",
    },

    pending: {
        label: "Pending",
        icon: Clock3,
        className:
            "bg-amber-50 text-amber-700 border-amber-200",
    },

    failed: {
        label: "Failed",
        icon: CircleX,
        className:
            "bg-red-50 text-red-700 border-red-200",
    },

    refunded: {
        label: "Refunded",
        icon: RotateCcw,
        className:
            "bg-sky-50 text-sky-700 border-sky-200",
    },
};

const OrderPaymentBadge = ({
    paymentStatus = "Pending",
    className = "",
}) => {

    const key = paymentStatus
        ?.trim()
        ?.toLowerCase();

    const config =
        PAYMENT_CONFIG[key] ||
        PAYMENT_CONFIG.pending;

    const Icon = config.icon;

    return (

        <Badge
            variant="outline"
            className={`
                h-8
                rounded-full
                border
                px-3
                text-xs
                font-semibold
                flex
                items-center
                gap-1.5
                whitespace-nowrap
                transition-all
                duration-300
                ${config.className}
                ${className}
            `}
        >

            <Icon
                size={13}
                strokeWidth={2.2}
            />

            {config.label}

        </Badge>

    );

};

export default OrderPaymentBadge;