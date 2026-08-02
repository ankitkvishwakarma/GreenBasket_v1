const statusColor = {
  Pending: "bg-yellow-100 text-yellow-700",
  Confirmed: "bg-blue-100 text-blue-700",
  Packed: "bg-indigo-100 text-indigo-700",
  Shipped: "bg-purple-100 text-purple-700",
  Delivered: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
};

const RecentOrders = ({ orders = [] }) => {

  return (
    <div className="rounded-2xl bg-white border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between p-6 border-b">
        <h2 className="text-xl font-bold">
          Recent Orders
        </h2>

        <button className="text-green-600 font-medium hover:underline">
          View All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">

            <tr>

              <th className="px-6 py-4 text-left">Order ID</th>

              <th className="px-6 py-4 text-left">Customer</th>

              <th className="px-6 py-4 text-left">Amount</th>

              <th className="px-6 py-4 text-left">Status</th>

              <th className="px-6 py-4 text-left">Date</th>

            </tr>

          </thead>

          <tbody>

            {orders.map((order) => (
              <tr
                key={order._id}
                className="border-t hover:bg-gray-50"
              >
                <td className="px-6 py-4 font-medium">
                  #{order.orderNumber || order._id.slice(-6)}
                </td>

                <td className="px-6 py-4">
                  {order.user?.name}
                </td>

                <td className="px-6 py-4">
                  ₹{order.totalAmount}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColor[order.orderStatus] ||
                      "bg-gray-100 text-gray-700"
                      }`}
                  >
                    {order.orderStatus}
                  </span>
                </td>

                <td className="px-6 py-4">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;