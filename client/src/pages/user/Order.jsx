import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import OrderHeader from "@/components/user/orders/OrderHeader";
import OrderFilters from "@/components/user/orders/OrderFilters";
import OrderList from "@/components/user/orders/OrderList";
import OrderDetailsSheet from "@/components/user/orders/OrderDetailsSheet";

import {
    getMyOrders,
    getOrderById,
    cancelOrder,
} from "@/redux/user/userorder/orderThunk";

const Orders = () => {
    const dispatch = useDispatch();

    const {
        orders = [],
        selectedOrder = null,
        loading = false,
        buttonLoading = false,
    } = useSelector((state) => state.order);

    //-----------------------------------------

    const [open, setOpen] = useState(false);

    const [filters, setFilters] = useState({
        search: "",
        status: "all",
        sort: "-createdAt",
    });

    //-----------------------------------------

    useEffect(() => {
        dispatch(getMyOrders());
    }, [dispatch]);

    //-----------------------------------------

    const refreshOrders = () => {
        dispatch(getMyOrders());
    };

    //-----------------------------------------

    const handleViewDetails = async (order) => {
        const result = await dispatch(
            getOrderById(order._id)
        );

        if (getOrderById.fulfilled.match(result)) {
            setOpen(true);
        }
    };

    //-----------------------------------------

    const handleCancel = async (id) => {
        const yes = window.confirm(
            "Are you sure you want to cancel this order?"
        );

        if (!yes) return;

        const result = await dispatch(cancelOrder(id));

        if (cancelOrder.fulfilled.match(result)) {
            dispatch(getMyOrders());
            setOpen(false);
        }
    };

    //-----------------------------------------

    const handleTrack = (order) => {
        console.log(order);

        // Delivery Tracking Module
    };

    //-----------------------------------------

    const handleInvoice = (id) => {
        // Future Invoice API
        window.open(`/api/invoice/${id}`, "_blank");
    };

    //-----------------------------------------

    const filteredOrders = useMemo(() => {
        let data = [...orders];

        // Search

        if (filters.search.trim()) {
            const keyword = filters.search
                .trim()
                .toLowerCase();

            data = data.filter((order) =>
                order.orderNumber
                    ?.toLowerCase()
                    .includes(keyword)
            );
        }

        // Status

        if (filters.status !== "all") {
            data = data.filter(
                (order) =>
                    order.orderStatus === filters.status
            );
        }

        // Sort

        switch (filters.sort) {
            case "createdAt":
                data.sort(
                    (a, b) =>
                        new Date(a.createdAt) -
                        new Date(b.createdAt)
                );
                break;

            case "-createdAt":
                data.sort(
                    (a, b) =>
                        new Date(b.createdAt) -
                        new Date(a.createdAt)
                );
                break;

            case "finalAmount":
                data.sort(
                    (a, b) =>
                        (a.finalAmount || 0) -
                        (b.finalAmount || 0)
                );
                break;

            case "-finalAmount":
                data.sort(
                    (a, b) =>
                        (b.finalAmount || 0) -
                        (a.finalAmount || 0)
                );
                break;

            default:
                break;
        }

        return data;
    }, [
        orders,
        filters.search,
        filters.status,
        filters.sort,
    ]);

    //-----------------------------------------

    return (
        <div className="space-y-6">
            <OrderHeader
                orders={orders}
                loading={loading}
                onRefresh={refreshOrders}
            />

            <OrderFilters
                filters={filters}
                onChange={setFilters}
                loading={loading}
            />

            <OrderList
                orders={filteredOrders}
                filters={filters}
                loading={loading}
                onViewDetails={handleViewDetails}
                onTrackOrder={handleTrack}
                onCancelOrder={handleCancel}
            />

            <OrderDetailsSheet
                open={open}
                onOpenChange={setOpen}
                order={selectedOrder}
                loading={buttonLoading}
                onDownloadInvoice={handleInvoice}
                onCancelOrder={handleCancel}
                onTrackOrder={handleTrack}
            />
        </div>
    );
};

export default Orders;