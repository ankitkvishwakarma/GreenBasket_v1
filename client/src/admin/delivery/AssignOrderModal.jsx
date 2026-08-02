import { useState } from "react";
import {
  X,
  Package,
  User,
  MapPin,
  CheckCircle,
} from "lucide-react";

const AssignOrderModal = ({
  open,
  deliveryBoy,
  orders = [],
  loading,
  onAssign,
  onClose,
}) => {
  const [selectedOrder, setSelectedOrder] = useState("");

  if (!open || !deliveryBoy) return null;

  const handleAssign = () => {
    if (!selectedOrder) return;

    onAssign({
      deliveryBoyId: deliveryBoy._id,
      orderId: selectedOrder,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">

      <div className="w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between bg-gradient-to-r from-emerald-600 to-green-600 px-8 py-6">

          <div>

            <h2 className="text-3xl font-bold text-white">
              Assign Order
            </h2>

            <p className="mt-2 text-sm text-emerald-100">
              Assign a pending order to this delivery partner.
            </p>

          </div>

          <button
            onClick={onClose}
            className="rounded-xl bg-white/20 p-2 text-white transition hover:bg-white/30"
          >
            <X size={22} />
          </button>

        </div>

        {/* Body */}

        <div className="space-y-8 p-8">

          {/* Delivery Partner */}

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">

            <div className="flex items-center gap-5">

              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-2xl font-bold text-emerald-700">
                {deliveryBoy.name?.charAt(0)?.toUpperCase()}
              </div>

              <div>

                <h3 className="text-xl font-bold text-slate-800">
                  {deliveryBoy.name}
                </h3>

                <p className="text-slate-500">
                  {deliveryBoy.phone}
                </p>

              </div>

            </div>

          </div>

          {/* Order Selection */}

          <div>

            <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Package size={18} />
              Select Pending Order
            </label>

            <select
              value={selectedOrder}
              onChange={(e) =>
                setSelectedOrder(e.target.value)
              }
              className="h-12 w-full rounded-2xl border border-slate-300 px-4 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
            >
              <option value="">
                Choose Order
              </option>

              {orders.map((order) => (
                <option
                  key={order._id}
                  value={order._id}
                >
                  #{order.orderNumber} - {order.user?.name}
                </option>
              ))}

            </select>

          </div>

          {/* Order Preview */}

          {selectedOrder && (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">

              {orders
                .filter(
                  (order) =>
                    order._id === selectedOrder
                )
                .map((order) => (
                  <div
                    key={order._id}
                    className="space-y-5"
                  >
                    <div className="flex items-center gap-3">
                      <User
                        className="text-emerald-600"
                        size={18}
                      />
                      <span className="font-medium text-slate-700">
                        {order.user?.name}
                      </span>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin
                        className="mt-1 text-red-500"
                        size={18}
                      />
                      <span className="text-slate-700">
                        {order.shippingAddress?.address}
                      </span>
                    </div>
                                        <div className="grid gap-4 md:grid-cols-2">

                      <div className="rounded-xl bg-white p-4">

                        <p className="text-xs uppercase text-slate-500">
                          Total Amount
                        </p>

                        <h3 className="mt-2 text-2xl font-bold text-emerald-600">
                          ₹{order.totalAmount}
                        </h3>

                      </div>

                      <div className="rounded-xl bg-white p-4">

                        <p className="text-xs uppercase text-slate-500">
                          Payment Method
                        </p>

                        <h3 className="mt-2 text-lg font-semibold text-slate-800">
                          {order.paymentMethod}
                        </h3>

                      </div>

                    </div>

                    <div className="rounded-xl bg-white p-4">

                      <p className="text-xs uppercase text-slate-500">
                        Order Status
                      </p>

                      <span className="mt-2 inline-flex rounded-full bg-yellow-100 px-4 py-1 text-sm font-semibold text-yellow-700">
                        {order.orderStatus}
                      </span>

                    </div>

                  </div>
                ))}

            </div>
          )}

        </div>

        {/* Footer */}

        <div className="flex flex-col-reverse gap-3 border-t border-slate-200 px-8 py-6 sm:flex-row sm:justify-end">

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-12 items-center justify-center rounded-2xl border border-slate-300 px-6 font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={!selectedOrder || loading}
            onClick={handleAssign}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <CheckCircle size={18} />

            {loading
              ? "Assigning..."
              : "Assign Order"}
          </button>

        </div>

      </div>

    </div>
  );
};

export default AssignOrderModal;