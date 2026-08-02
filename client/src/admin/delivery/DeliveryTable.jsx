import {
  Eye,
  Pencil,
  Trash2,
  MapPin,
  CheckCircle,
  Truck,
} from "lucide-react";

const DeliveryTable = ({
  deliveryBoys,
  loading,
  onView,
  onEdit,
  onDelete,
  onVerify,
  onAssign,
  onLocation,
  onAvailabilityChange,
}) => {
  if (loading) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-16 text-center shadow-sm">
        <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>

        <p className="mt-6 text-sm font-medium text-slate-500">
          Loading delivery partners...
        </p>
      </div>
    );
  }

  if (!deliveryBoys?.length) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white py-20 text-center shadow-sm">
        <Truck
          size={60}
          className="mx-auto text-slate-300"
        />

        <h3 className="mt-5 text-2xl font-bold text-slate-700">
          No Delivery Partner Found
        </h3>

        <p className="mt-2 text-slate-500">
          Try changing filters or add a new delivery
          partner.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-600">
                Delivery Boy
              </th>

              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-600">
                Contact
              </th>

              <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-slate-600">
                Verification
              </th>

              <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-slate-600">
                Availability
              </th>

              <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-slate-600">
                Orders
              </th>

              <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-slate-600">
                Actions
              </th>

            </tr>

          </thead>

          <tbody className="divide-y divide-slate-200">

                        {deliveryBoys.map((deliveryBoy, index) => (
              <tr
                key={deliveryBoy._id}
                className="transition-colors hover:bg-slate-50"
              >
                {/* Delivery Boy */}

                <td className="px-6 py-5">

                  <div className="flex items-center gap-4">

                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-700">
                      {deliveryBoy.name?.charAt(0)?.toUpperCase()}
                    </div>

                    <div>

                      <h3 className="font-semibold text-slate-800">
                        {deliveryBoy.name}
                      </h3>

                      <p className="text-xs text-slate-500">
                        ID : {index + 1}
                      </p>

                    </div>

                  </div>

                </td>

                {/* Contact */}

                <td className="px-6 py-5">

                  <div>

                    <p className="font-medium text-slate-700">
                      {deliveryBoy.email}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      {deliveryBoy.phone}
                    </p>

                  </div>

                </td>

                {/* Verification */}

                <td className="px-6 py-5 text-center">

                  {deliveryBoy.isVerified ? (
                    <span className="inline-flex rounded-full bg-green-100 px-4 py-1 text-xs font-semibold text-green-700">
                      Verified
                    </span>
                  ) : (
                    <button
                      onClick={() => onVerify(deliveryBoy)}
                      className="inline-flex items-center gap-2 rounded-full bg-yellow-100 px-4 py-1 text-xs font-semibold text-yellow-700 transition hover:bg-yellow-200"
                    >
                      <CheckCircle size={14} />
                      Verify
                    </button>
                  )}

                </td>

                {/* Availability */}

                <td className="px-6 py-5 text-center">

                  <button
                    onClick={() =>
                      onAvailabilityChange(deliveryBoy)
                    }
                    className={`rounded-full px-4 py-1 text-xs font-semibold transition ${
                      deliveryBoy.isAvailable
                        ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                        : "bg-red-100 text-red-700 hover:bg-red-200"
                    }`}
                  >
                    {deliveryBoy.isAvailable
                      ? "Available"
                      : "Offline"}
                  </button>

                </td>

                {/* Orders */}

                <td className="px-6 py-5 text-center">

                  <button
                    onClick={() => onAssign(deliveryBoy)}
                    className="rounded-xl bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-200"
                  >
                    Assign Order
                  </button>

                </td>

                {/* Actions */}

                <td className="px-6 py-5">

                  <div className="flex items-center justify-center gap-2">
                                        {/* View */}

                    <button
                      onClick={() => onView(deliveryBoy)}
                      className="rounded-xl bg-slate-100 p-2 text-slate-700 transition-all hover:bg-slate-200"
                      title="View Details"
                    >
                      <Eye size={18} />
                    </button>

                    {/* Live Location */}

                    <button
                      onClick={() => onLocation(deliveryBoy)}
                      className="rounded-xl bg-cyan-100 p-2 text-cyan-700 transition-all hover:bg-cyan-200"
                      title="Live Location"
                    >
                      <MapPin size={18} />
                    </button>

                    {/* Edit */}

                    <button
                      onClick={() => onEdit(deliveryBoy)}
                      className="rounded-xl bg-amber-100 p-2 text-amber-700 transition-all hover:bg-amber-200"
                      title="Edit"
                    >
                      <Pencil size={18} />
                    </button>

                    {/* Delete */}

                    <button
                      onClick={() => onDelete(deliveryBoy)}
                      className="rounded-xl bg-red-100 p-2 text-red-700 transition-all hover:bg-red-200"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>

                  </div>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

      {/* Footer */}

      <div className="flex flex-col gap-2 border-t border-slate-200 bg-slate-50 px-6 py-4 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">

        <p>
          Showing{" "}
          <span className="font-semibold">
            {deliveryBoys.length}
          </span>{" "}
          delivery partner
          {deliveryBoys.length !== 1 ? "s" : ""}.
        </p>

        <p className="text-xs text-slate-500">
          GreenBasket Admin • Delivery Management
        </p>

      </div>

    </div>
  );
};

export default DeliveryTable;