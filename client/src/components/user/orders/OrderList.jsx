import { AnimatePresence } from "framer-motion";

import OrderCard from "./OrderCard";
import OrderEmpty from "./OrderEmpty";
import OrderSkeleton from "./OrderSkeleton";

const OrderList = ({
    orders = [],
    loading = false,
    filters = {},
    onViewDetails,
    onTrackOrder,
    onCancelOrder,
}) => {

    //------------------------------------------
    // Loading
    //------------------------------------------

    if (loading) {

        return <OrderSkeleton count={5} />;

    }

    //------------------------------------------
    // Empty
    //------------------------------------------

    if (!orders.length) {

        return (
            <OrderEmpty
                type={
                    filters.search ||
                    filters.status !== "all"
                        ? "no-results"
                        : "no-orders"
                }
            />
        );

    }

    //------------------------------------------

    return (

        <AnimatePresence mode="popLayout">

            <div className="space-y-5">

                {
                    orders.map((order) => (

                        <OrderCard
                            key={order._id}
                            order={order}
                            onViewDetails={onViewDetails}
                            onTrackOrder={onTrackOrder}
                            onCancelOrder={onCancelOrder}
                        />

                    ))
                }

            </div>

        </AnimatePresence>

    );

};

export default OrderList;