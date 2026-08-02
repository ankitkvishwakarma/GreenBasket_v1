import { motion } from "framer-motion";

import {
    CalendarDays,
    CreditCard,
    IndianRupee,
    Eye,
    Truck,
    Ban,
} from "lucide-react";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Separator } from "@/components/ui/separator";

import OrderStatusBadge from "./OrderStatusBadge";
import OrderPaymentBadge from "./OrderPaymentBadge";
import OrderProductPreview from "./OrderProductPreview";

const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });

const OrderCard = ({
    order,
    onViewDetails,
    onTrackOrder,
    onCancelOrder,
}) => {

    const canCancel =
        [
            "Pending",
            "Confirmed",
        ].includes(order.orderStatus);

    return (

        <motion.div
            layout
            initial={{
                opacity: 0,
                y: 20,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            exit={{
                opacity: 0,
                y: 20,
            }}
            whileHover={{
                y: -4,
            }}
            transition={{
                duration: .25,
            }}
        >

            <Card className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg">

                <CardContent className="p-0">

                    {/* Header */}

                    <div className="flex flex-col gap-5 p-5 lg:flex-row lg:items-start lg:justify-between">

                        <div className="space-y-3">

                            <div>

                                <p className="text-xs uppercase tracking-wider text-slate-400">

                                    Order Number

                                </p>

                                <h3 className="mt-1 text-lg font-bold text-slate-900">

                                    #{order.orderNumber}

                                </h3>

                            </div>

                            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">

                                <div className="flex items-center gap-2">

                                    <CalendarDays size={15} />

                                    {formatDate(order.createdAt)}

                                </div>

                                <div className="flex items-center gap-2">

                                    <CreditCard size={15} />

                                    {order.paymentMethod}

                                </div>

                            </div>

                        </div>

                        <div className="flex flex-col items-start gap-3 lg:items-end">

                            <OrderStatusBadge
                                orderStatus={order.orderStatus}
                            />

                            <OrderPaymentBadge
                                paymentStatus={order.paymentStatus}
                            />

                            <div className="flex items-center gap-1 text-3xl font-bold text-green-700">

                                <IndianRupee
                                    size={22}
                                />

                                {order.finalAmount}

                            </div>

                        </div>

                    </div>

                    <Separator />

                    {/* Product */}

                    <div className="space-y-5 p-5">

                        <OrderProductPreview
                            items={order.items}
                        />

                        <div className="grid gap-5 text-sm md:grid-cols-3">

                            <div>

                                <p className="text-xs uppercase text-slate-400">

                                    Products

                                </p>

                                <h4 className="mt-1 font-semibold">

                                    {order.items.length} Items

                                </h4>

                            </div>

                            <div>

                                <p className="text-xs uppercase text-slate-400">

                                    Payment

                                </p>

                                <h4 className="mt-1 font-semibold">

                                    {order.paymentMethod}

                                </h4>

                            </div>

                            <div>

                                <p className="text-xs uppercase text-slate-400">

                                    Status

                                </p>

                                <h4 className="mt-1 font-semibold">

                                    {order.orderStatus}

                                </h4>

                            </div>

                        </div>

                    </div>

                    <Separator />

                    {/* Footer Next */}
                    {/* Footer */}

                    <div className="flex flex-col gap-3 p-5 lg:flex-row lg:items-center lg:justify-between">

                        {/* Left */}

                        <div className="flex flex-wrap items-center gap-3">

                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                    onViewDetails(order)
                                }
                                className="rounded-xl"
                            >
                                <Eye
                                    size={16}
                                    className="mr-2"
                                />

                                View Details

                            </Button>

                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                    onTrackOrder(order)
                                }
                                className="rounded-xl"
                            >
                                <Truck
                                    size={16}
                                    className="mr-2"
                                />

                                Track Order

                            </Button>

                            {
                                canCancel && (

                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() =>
                                            onCancelOrder(
                                                order._id
                                            )
                                        }
                                        className="rounded-xl"
                                    >

                                        <Ban
                                            size={16}
                                            className="mr-2"
                                        />

                                        Cancel Order

                                    </Button>

                                )
                            }

                        </div>

                        {/* Right */}

                        <div className="text-xs text-slate-500">

                            Ordered on{" "}

                            <span className="font-semibold text-slate-700">

                                {formatDate(
                                    order.createdAt
                                )}

                            </span>

                        </div>

                    </div>

                </CardContent>

            </Card>

        </motion.div>

    );

};

export default OrderCard;