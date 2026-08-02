import { Pencil, Trash2 } from "lucide-react";

const CouponTable = ({
  coupons = [],
  loading = false,
  onEdit,
  onDelete,
}) => {
  if (loading) {
    return (
      <div className="rounded-2xl border bg-white p-10 shadow-sm">
        <div className="text-center text-gray-500">
          Loading coupons...
        </div>
      </div>
    );
  }

  const getStatus = (coupon) => {
    if (!coupon.isActive) {
      return {
        label: "Inactive",
        className: "bg-red-100 text-red-700",
      };
    }

    if (new Date(coupon.expiresAt) < new Date()) {
      return {
        label: "Expired",
        className: "bg-yellow-100 text-yellow-700",
      };
    }

    return {
      label: "Active",
      className: "bg-green-100 text-green-700",
    };
  };

  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">
                Coupon Code
              </th>
              <th className="px-4 py-3 text-center">
                Type
              </th>
              <th className="px-4 py-3 text-center">
                Discount
              </th>
              <th className="px-4 py-3 text-center">
                Min Order
              </th>
              <th className="px-4 py-3 text-center">
                Max Discount
              </th>
              <th className="px-4 py-3 text-center">
                Usage
              </th>
              <th className="px-4 py-3 text-center">
                Used
              </th>
              <th className="px-4 py-3 text-center">
                Expiry
              </th>
              <th className="px-4 py-3 text-center">
                Status
              </th>
              <th className="px-4 py-3 text-center">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {coupons.length === 0 ? (
              <tr>
                <td
                  colSpan={11}
                  className="py-10 text-center text-gray-500"
                >
                  No Coupons Found
                </td>
              </tr>
            ) : (
              coupons.map((coupon, index) => {
                const status = getStatus(coupon);

                return (
                  <tr
                    key={coupon._id}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="px-4 py-4">
                      {index + 1}
                    </td>

                    <td className="px-4 py-4 font-semibold">
                      {coupon.code}
                    </td>

                    <td className="px-4 py-4 text-center">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          coupon.discountType ===
                          "PERCENTAGE"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {coupon.discountType}
                      </span>
                    </td>

                    <td className="px-4 py-4 text-center font-medium">
                      {coupon.discountType ===
                      "PERCENTAGE"
                        ? `${coupon.discountValue}%`
                        : `₹${coupon.discountValue}`}
                    </td>

                    <td className="px-4 py-4 text-center">
                      ₹{coupon.minimumOrderAmount}
                    </td>

                    <td className="px-4 py-4 text-center">
                      ₹{coupon.maximumDiscount}
                    </td>

                    <td className="px-4 py-4 text-center">
                      {coupon.usageLimit}
                    </td>

                    <td className="px-4 py-4 text-center">
                      {coupon.usedCount}
                    </td>

                    <td className="px-4 py-4 text-center">
                      {new Date(
                        coupon.expiresAt
                      ).toLocaleDateString()}
                    </td>

                    <td className="px-4 py-4 text-center">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${status.className}`}
                      >
                        {status.label}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() =>
                            onEdit(coupon)
                          }
                          className="rounded-lg bg-blue-100 p-2 text-blue-600 hover:bg-blue-200"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          onClick={() =>
                            onDelete(coupon)
                          }
                          className="rounded-lg bg-red-100 p-2 text-red-600 hover:bg-red-200"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default CouponTable;