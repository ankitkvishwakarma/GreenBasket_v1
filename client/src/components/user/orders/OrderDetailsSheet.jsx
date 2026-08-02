import {
    Download,
    Ban,
    Truck,
} from "lucide-react";

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";

import {
    ScrollArea,
} from "@/components/ui/scroll-area";

import {
    Separator,
} from "@/components/ui/separator";

import {
    Button,
} from "@/components/ui/button";

import OrderTimeline from "./OrderTimeline";
import OrderStatusBadge from "./OrderStatusBadge";
import OrderPaymentBadge from "./OrderPaymentBadge";
import OrderProductPreview from "./OrderProductPreview";
import OrderAddressCard from "./OrderAddressCard";
import OrderPriceSummary from "./OrderPriceSummary";

const OrderDetailsSheet = ({
    open,
    onOpenChange,
    order,
    loading = false,
    onDownloadInvoice,
    onCancelOrder,
    onTrackOrder,
}) => {

    if (!order) return null;

    const canCancel = [
        "Pending",
        "Confirmed",
    ].includes(order.orderStatus);

    return (

        <Sheet
            open={open}
            onOpenChange={onOpenChange}
        >

            <SheetContent
                side="right"
                className="w-full overflow-hidden p-0 sm:max-w-2xl"
            >

                {/* ================= Header ================= */}

                <SheetHeader className="border-b bg-white px-6 py-5">

                    <div className="flex items-start justify-between">

                        <div>

                            <SheetTitle className="text-xl font-bold">

                                #{order.orderNumber}

                            </SheetTitle>

                            <p className="mt-2 text-sm text-slate-500">

                                Complete Order Details

                            </p>

                        </div>

                        <div className="space-y-2">

                            <OrderStatusBadge
                                orderStatus={
                                    order.orderStatus
                                }
                            />

                            <OrderPaymentBadge
                                paymentStatus={
                                    order.paymentStatus
                                }
                            />

                        </div>

                    </div>

                </SheetHeader>

                {/* ================= Body ================= */}

                <ScrollArea className="h-[calc(100vh-170px)]">

                    <div className="space-y-6 p-6">

                                                {/* ================= Timeline ================= */}

                        <section className="space-y-4">

                            <div>

                                <h3 className="text-base font-semibold text-slate-900">

                                    Order Timeline

                                </h3>

                                <p className="text-sm text-slate-500">

                                    Current delivery progress

                                </p>

                            </div>

                            <OrderTimeline
                                order={order}
                            />

                        </section>

                        <Separator />

                        {/* ================= Products ================= */}

                        <section className="space-y-4">

                            <div>

                                <h3 className="text-base font-semibold text-slate-900">

                                    Ordered Products

                                </h3>

                                <p className="text-sm text-slate-500">

                                    {order.items.length} Items

                                </p>

                            </div>

                            <OrderProductPreview
                                items={order.items}
                                detailed
                            />

                        </section>

                        <Separator />

                        {/* ================= Address ================= */}

                        <section className="space-y-4">

                            <div>

                                <h3 className="text-base font-semibold text-slate-900">

                                    Delivery Address

                                </h3>

                            </div>

                            <OrderAddressCard
                                address={
                                    order.shippingAddress
                                }
                            />

                        </section>

                        <Separator />

                        {/* ================= Price Summary ================= */}

                        <section className="space-y-4">

                            <div>

                                <h3 className="text-base font-semibold text-slate-900">

                                    Payment Summary

                                </h3>

                            </div>

                            <OrderPriceSummary
                                order={order}
                            />

                        </section>

                    </div>

                </ScrollArea>

                {/* Footer Part-3 */}
                                {/* ================= Footer ================= */}

                <div className="border-t bg-white p-5">

                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">

                        <Button
                            variant="outline"
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

                        <Button
                            variant="outline"
                            onClick={() =>
                                onDownloadInvoice(
                                    order._id
                                )
                            }
                            className="rounded-xl"
                        >
                            <Download
                                size={16}
                                className="mr-2"
                            />

                            Download Invoice

                        </Button>

                        {canCancel && (

                            <Button
                                variant="destructive"
                                disabled={loading}
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

                                {
                                    loading
                                        ? "Cancelling..."
                                        : "Cancel Order"
                                }

                            </Button>

                        )}

                    </div>

                </div>

            </SheetContent>

        </Sheet>

    );

};

export default OrderDetailsSheet;