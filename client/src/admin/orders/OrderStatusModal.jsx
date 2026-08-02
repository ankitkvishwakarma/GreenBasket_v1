import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateOrderStatus } from "../../redux/admin/order/orderThunk";
import { resetOrderState } from "../../redux/admin/order/orderSlice";

const orderStatusList = [
  "Pending",
  "Confirmed",
  "Packed",
  "Assigned",
  "Picked Up",
  "Out for Delivery",
  "Delivered",
  "Cancelled",
];

const OrderStatusModal = ({
  open,
  order,
  onClose,
}) => {
  const dispatch = useDispatch();

  const { loading, success } = useSelector(
    (state) => state.order
  );

  const [status, setStatus] = useState("");

  useEffect(() => {
    if (order) {
      setStatus(order.orderStatus);
    }
  }, [order]);

  useEffect(() => {
    if (success) {
      dispatch(resetOrderState());
      onClose();
    }
  }, [success, dispatch, onClose]);

  if (!open || !order) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      updateOrderStatus({
        id: order._id,
        status,
      })
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      <div className="w-full max-w-md rounded-xl bg-white shadow-xl">

        <div className="border-b px-6 py-4">

          <h2 className="text-lg font-semibold">
            Update Order Status
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            {order.orderNumber}
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-6"
        >

          <div>

            <label className="mb-2 block text-sm font-medium">
              Order Status
            </label>

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
              className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {orderStatusList.map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}
            </select>

          </div>

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border px-5 py-2 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-primary px-5 py-2 text-white hover:opacity-90 disabled:opacity-50"
            >
              {loading
                ? "Updating..."
                : "Update Status"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default OrderStatusModal;