import { Eye, Edit } from "lucide-react";

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-700",
  Confirmed: "bg-blue-100 text-blue-700",
  Packed: "bg-indigo-100 text-indigo-700",
  Assigned: "bg-cyan-100 text-cyan-700",
  "Picked Up": "bg-purple-100 text-purple-700",
  "Out for Delivery": "bg-orange-100 text-orange-700",
  Delivered: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
};

const paymentColors = {
  Pending: "bg-yellow-100 text-yellow-700",
  Paid: "bg-green-100 text-green-700",
  Failed: "bg-red-100 text-red-700",
};

const OrderTable = ({
  orders = [],
  loading = false,
  onView,
  onStatus,
}) => {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-10 text-center">
        Loading Orders...
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="bg-white rounded-xl shadow p-10 text-center text-gray-500">
        No Orders Found
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl bg-white shadow">

      <table className="min-w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="px-5 py-3 text-left">Order</th>

            <th className="px-5 py-3 text-left">
              Customer
            </th>

            <th className="px-5 py-3 text-center">
              Items
            </th>

            <th className="px-5 py-3 text-right">
              Amount
            </th>

            <th className="px-5 py-3 text-center">
              Payment
            </th>

            <th className="px-5 py-3 text-center">
              Status
            </th>

            <th className="px-5 py-3 text-center">
              Date
            </th>

            <th className="px-5 py-3 text-center">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {orders.map((order) => (

            <tr
              key={order._id}
              className="border-t hover:bg-gray-50"
            >

              <td className="px-5 py-4">

                <div className="font-semibold">
                  {order.orderNumber}
                </div>

                <div className="text-xs text-gray-500">
                  {order._id}
                </div>

              </td>

              <td className="px-5 py-4">

                <div className="font-medium">
                  {order.user?.name}
                </div>

                <div className="text-xs text-gray-500">
                  {order.user?.email}
                </div>

              </td>

              <td className="px-5 py-4 text-center">
                {order.totalItems}
              </td>

              <td className="px-5 py-4 text-right font-semibold">
                ₹{order.finalAmount}
              </td>

              <td className="px-5 py-4 text-center">

                <div className="text-sm">
                  {order.paymentMethod}
                </div>

                <span
                  className={`inline-block mt-1 px-2 py-1 rounded-full text-xs font-medium ${
                    paymentColors[
                      order.paymentStatus
                    ]
                  }`}
                >
                  {order.paymentStatus}
                </span>

              </td>

              <td className="px-5 py-4 text-center">

                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    statusColors[
                      order.orderStatus
                    ]
                  }`}
                >
                  {order.orderStatus}
                </span>

              </td>

              <td className="px-5 py-4 text-center">

                {new Date(
                  order.createdAt
                ).toLocaleDateString()}

              </td>

              <td className="px-5 py-4">

                <div className="flex justify-center gap-2">

                  <button
                    onClick={() => onView(order)}
                    className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200"
                  >
                    <Eye size={18} />
                  </button>

                  <button
                    onClick={() => onStatus(order)}
                    className="p-2 rounded-lg bg-green-100 hover:bg-green-200"
                  >
                    <Edit size={18} />
                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};

export default OrderTable;