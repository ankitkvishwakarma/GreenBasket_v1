import {
    Receipt,
    IndianRupee,
    BadgePercent,
    Truck,
    Calculator,
    Wallet,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const currency = (amount = 0) =>
    new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(amount);

const Row = ({
    icon: Icon,
    label,
    value,
    valueClass = "text-slate-800",
}) => (
    <div className="flex items-center justify-between py-2">

        <div className="flex items-center gap-3">

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100">

                <Icon
                    size={16}
                    className="text-slate-600"
                />

            </div>

            <span className="text-sm text-slate-600">

                {label}

            </span>

        </div>

        <span
            className={`text-sm font-semibold ${valueClass}`}
        >
            {value}
        </span>

    </div>
);

const OrderPriceSummary = ({ order }) => {

    if (!order) return null;

    return (

        <Card className="rounded-2xl border border-slate-200 shadow-sm">

            <div className="p-5">

                {/* Header */}

                <div className="mb-5 flex items-center gap-2">

                    <Receipt
                        size={18}
                        className="text-green-600"
                    />

                    <h3 className="font-semibold text-slate-900">

                        Price Summary

                    </h3>

                </div>

                {/* Rows */}

                <Row
                    icon={IndianRupee}
                    label="Items Total"
                    value={currency(order.totalAmount)}
                />

                <Row
                    icon={BadgePercent}
                    label="Discount"
                    value={`- ${currency(
                        order.discount || 0
                    )}`}
                    valueClass="text-green-600"
                />

                <Row
                    icon={Truck}
                    label="Delivery Fee"
                    value={currency(
                        order.deliveryFee || 0
                    )}
                />

                <Row
                    icon={Calculator}
                    label="Tax"
                    value={currency(order.tax || 0)}
                />

                <Separator className="my-3" />

                {/* Grand Total */}

                <div className="flex items-center justify-between rounded-xl bg-green-50 p-4">

                    <div className="flex items-center gap-3">

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100">

                            <Wallet
                                size={20}
                                className="text-green-600"
                            />

                        </div>

                        <div>

                            <p className="text-sm font-semibold text-slate-900">

                                Grand Total

                            </p>

                            <p className="text-xs text-slate-500">

                                Amount Paid

                            </p>

                        </div>

                    </div>

                    <div className="text-xl font-bold text-green-700">

                        {currency(order.finalAmount)}

                    </div>

                </div>

            </div>

        </Card>

    );

};

export default OrderPriceSummary;