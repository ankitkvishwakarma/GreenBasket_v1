import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchOrders } from "../../redux/admin/order/orderThunk";

import OrderHeader from "../orders/OrderHeader";
import OrderSearch from "../orders/OrderSearch";
import OrderFilters from "../orders/OrderFilters";
import OrderTable from "../orders/OrderTable";
import OrderDetailsModal from "../orders/OrderDetailsModal";
import OrderStatusModal from "../orders/OrderStatusModal";

const Orders = () => {
  const dispatch = useDispatch();

  const { orders, loading } = useSelector(
    (state) => state.order
  );

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const [selectedOrder, setSelectedOrder] = useState(null);

  const [detailsOpen, setDetailsOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);

  useEffect(() => {
    dispatch(
      fetchOrders({
        search,
        status,
      })
    );
  }, [dispatch, search, status]);

  const handleView = (order) => {
    setSelectedOrder(order);
    setDetailsOpen(true);
  };

  const handleStatus = (order) => {
    setSelectedOrder(order);
    setStatusOpen(true);
  };

  const closeDetailsModal = () => {
    setDetailsOpen(false);
    setSelectedOrder(null);
  };

  const closeStatusModal = () => {
    setStatusOpen(false);
    setSelectedOrder(null);
  };

  return (
    <div className="space-y-6">

      <OrderHeader />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        <OrderSearch
          value={search}
          onChange={setSearch}
        />

        <OrderFilters
          status={status}
          setStatus={setStatus}
        />

      </div>

      <OrderTable
        orders={orders}
        loading={loading}
        onView={handleView}
        onStatus={handleStatus}
      />

      <OrderDetailsModal
        open={detailsOpen}
        order={selectedOrder}
        onClose={closeDetailsModal}
      />

      <OrderStatusModal
        open={statusOpen}
        order={selectedOrder}
        onClose={closeStatusModal}
      />

    </div>
  );
};

export default Orders;