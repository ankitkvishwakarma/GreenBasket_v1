import { X } from "lucide-react";

const OrderDetailsModal = ({ open, order, onClose }) => {
  if (!open || !order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      <div className="w-full max-w-5xl rounded-xl bg-white shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">

          <div>
            <h2 className="text-xl font-bold">
              Order Details
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              {order.orderNumber}
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-gray-100"
          >
            <X size={20} />
          </button>

        </div>

        {/* Body */}
        <div className="grid gap-6 p-6 lg:grid-cols-2">

          {/* Customer */}
          <div className="rounded-lg border p-4">

            <h3 className="mb-4 font-semibold">
              Customer Information
            </h3>

            <div className="space-y-2 text-sm">

              <p>
                <strong>Name :</strong>{" "}
                {order.user?.name}
              </p>

              <p>
                <strong>Email :</strong>{" "}
                {order.user?.email}
              </p>

              <p>
                <strong>Phone :</strong>{" "}
                {order.user?.phone || "-"}
              </p>

            </div>

          </div>

          {/* Payment */}
          <div className="rounded-lg border p-4">

            <h3 className="mb-4 font-semibold">
              Payment Information
            </h3>

            <div className="space-y-2 text-sm">

              <p>
                <strong>Method :</strong>{" "}
                {order.paymentMethod}
              </p>

              <p>
                <strong>Status :</strong>{" "}
                {order.paymentStatus}
              </p>

              <p>
                <strong>Total :</strong> ₹
                {order.totalAmount}
              </p>

              <p>
                <strong>Discount :</strong> ₹
                {order.discount}
              </p>

              <p>
                <strong>Final Amount :</strong> ₹
                {order.finalAmount}
              </p>

            </div>

          </div>

          {/* Address */}
          <div className="rounded-lg border p-4 lg:col-span-2">

            <h3 className="mb-4 font-semibold">
              Delivery Address
            </h3>

            <div className="text-sm leading-7">

              <p>{order.address?.fullName}</p>

              <p>{order.address?.phone}</p>

              <p>
                {order.address?.addressLine1}
              </p>

              <p>
                {order.address?.addressLine2}
              </p>

              <p>
                {order.address?.city},{" "}
                {order.address?.state}
              </p>

              <p>{order.address?.pincode}</p>

            </div>

          </div>

          {/* Products */}
          <div className="rounded-lg border p-4 lg:col-span-2">

            <h3 className="mb-4 font-semibold">
              Ordered Products
            </h3>

            <div className="overflow-x-auto">

              <table className="min-w-full">

                <thead>

                  <tr className="border-b">

                    <th className="py-2 text-left">
                      Product
                    </th>

                    <th className="py-2 text-center">
                      Qty
                    </th>

                    <th className="py-2 text-right">
                      Price
                    </th>

                    <th className="py-2 text-right">
                      Total
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {order.items?.map((item) => (

                    <tr
                      key={item.product}
                      className="border-b"
                    >

                      <td className="py-3">

                        <div className="flex items-center gap-3">

                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-12 w-12 rounded object-cover"
                          />

                          <span>{item.name}</span>

                        </div>

                      </td>

                      <td className="text-center">
                        {item.quantity}
                      </td>

                      <td className="text-right">
                        ₹{item.price}
                      </td>

                      <td className="text-right font-medium">
                        ₹{item.subtotal}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default OrderDetailsModal;