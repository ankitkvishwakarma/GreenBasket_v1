import {
  Eye,
  Pencil,
  Trash2,
  MapPin,
  Truck,
  Star,
  Phone,
  Mail,
  ShieldCheck,
  ShieldAlert,
} from "lucide-react";

const DeliveryTable = ({
  deliveryBoys = [],
  loading = false,
  onView,
  onEdit,
  onDelete,
  onVerify,
  onAssign,
  onLocation,
  onAvailabilityChange,
}) => {
  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        <div className="animate-pulse space-y-6 p-8">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="h-16 rounded-xl bg-gray-200"
            />
          ))}
        </div>
      </div>
    );
  }

  // ==========================================
  // EMPTY STATE
  // ==========================================

  if (!deliveryBoys.length) {
    return (
      <div className="rounded-2xl border bg-white p-14 text-center shadow-sm">
        <img
          src="/images/empty/delivery-empty.svg"
          alt="No Delivery Boy"
          className="mx-auto mb-6 w-56"
        />

        <h2 className="text-2xl font-bold text-slate-800">
          No Delivery Partner Found
        </h2>

        <p className="mt-2 text-slate-500">
          Add your first delivery executive to
          start assigning grocery orders.
        </p>
      </div>
    );
  }

  // ==========================================
  // TABLE
  // ==========================================

  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">

      {/* ======================================
          TABLE HEADER
      ====================================== */}

      <div className="flex flex-col justify-between border-b bg-gradient-to-r from-emerald-50 via-white to-green-50 px-6 py-5 md:flex-row md:items-center">

        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Delivery Partners
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Manage delivery executives,
            verification, availability and
            assignments.
          </p>
        </div>

        <div className="mt-4 flex items-center gap-3 md:mt-0">

          {/* TOTAL */}

          <div className="rounded-xl bg-emerald-100 px-4 py-2">
            <p className="text-xs text-slate-500">
              Total
            </p>

            <h3 className="font-bold text-emerald-700">
              {deliveryBoys.length}
            </h3>
          </div>

          {/* VERIFIED */}

          <div className="rounded-xl bg-blue-100 px-4 py-2">
            <p className="text-xs text-slate-500">
              Verified
            </p>

            <h3 className="font-bold text-blue-700">
              {
                deliveryBoys.filter(
                  (item) =>
                    item.isVerified === true
                ).length
              }
            </h3>
          </div>

          {/* AVAILABLE */}

          <div className="rounded-xl bg-green-100 px-4 py-2">
            <p className="text-xs text-slate-500">
              Available
            </p>

            <h3 className="font-bold text-green-700">
              {
                deliveryBoys.filter(
                  (item) =>
                    item.isAvailable === true
                ).length
              }
            </h3>
          </div>

        </div>
      </div>

      {/* ======================================
          DESKTOP TABLE
      ====================================== */}

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-slate-100">
            <tr>

              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-600">
                Delivery Partner
              </th>

              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-600">
                Vehicle
              </th>

              <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-slate-600">
                Performance
              </th>

              <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-slate-600">
                Verification
              </th>

              <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-slate-600">
                Availability
              </th>

              <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider text-slate-600">
                Actions
              </th>

            </tr>
          </thead>

          {/* IMPORTANT:
              tbody stays open while rows render
          */}

          <tbody className="divide-y divide-slate-100">

            {deliveryBoys.map((deliveryBoy) => (
              <tr
                key={deliveryBoy._id}
                className="group transition-all duration-300 hover:bg-emerald-50/40"
              >

                {/* ==================================
                    DELIVERY PARTNER
                ================================== */}

                <td className="px-6 py-5">

                  <div className="flex items-start gap-4">

                    {/* PROFILE */}

                    <div className="relative shrink-0">

                      <img
                        src={
                          deliveryBoy.profileImage?.url ||
                          deliveryBoy.profileImage ||
                          "/images/default-avatar.png"
                        }
                        alt={
                          deliveryBoy.name ||
                          "Delivery Partner"
                        }
                        className="h-16 w-16 rounded-2xl border-2 border-emerald-200 object-cover shadow-sm"
                      />

                      <span
                        className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white ${
                          deliveryBoy.isAvailable
                            ? "bg-green-500"
                            : "bg-gray-400"
                        }`}
                      />
                    </div>

                    {/* DETAILS */}

                    <div className="min-w-0 flex-1">

                      <div className="flex flex-wrap items-center gap-2">

                        <h3 className="text-base font-bold text-slate-800">
                          {deliveryBoy.name ||
                            "Unnamed Delivery Partner"}
                        </h3>

                        {deliveryBoy.isVerified ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                            <ShieldCheck size={14} />
                            Verified
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-1 text-xs font-semibold text-red-600">
                            <ShieldAlert size={14} />
                            Pending
                          </span>
                        )}

                      </div>

                      <div className="mt-3 space-y-1">

                        <p className="flex items-center gap-2 text-sm text-slate-600">
                          <Mail size={15} />
                          {deliveryBoy.email ||
                            "Email not available"}
                        </p>

                        <p className="flex items-center gap-2 text-sm text-slate-600">
                          <Phone size={15} />
                          {deliveryBoy.phone ||
                            "Phone not available"}
                        </p>

                      </div>

                      {deliveryBoy.address && (
                        <p className="mt-3 line-clamp-2 text-sm text-slate-500">
                          {deliveryBoy.address}
                        </p>
                      )}

                    </div>

                  </div>

                </td>

                {/* ==================================
                    VEHICLE
                ================================== */}

                <td className="px-6 py-5">

                  <div className="space-y-4">

                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">

                      <div className="flex items-center justify-between">

                        <div>

                          <p className="text-xs uppercase tracking-wide text-slate-500">
                            Vehicle
                          </p>

                          <h4 className="mt-1 text-base font-bold text-slate-800">
                            {deliveryBoy.vehicleType ||
                              "Not Available"}
                          </h4>

                        </div>

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100">
                          <Truck className="h-6 w-6 text-emerald-600" />
                        </div>

                      </div>

                      <div className="mt-4 rounded-xl border border-slate-200 bg-white px-3 py-2">

                        <p className="text-xs text-slate-500">
                          Registration Number
                        </p>

                        <p className="font-semibold tracking-wider text-slate-800">
                          {deliveryBoy.vehicleNumber ||
                            "Not Available"}
                        </p>

                      </div>

                    </div>

                  </div>

                </td>

                {/* ==================================
                    PERFORMANCE
                ================================== */}

                <td className="px-6 py-5">

                  <div className="grid grid-cols-2 gap-3">

                    {/* RATING */}

                    <div className="rounded-xl border bg-amber-50 p-3">

                      <div className="flex items-center gap-2">

                        <Star
                          size={18}
                          className="text-yellow-400"
                        />

                        <span className="font-bold text-slate-800">
                          {deliveryBoy.rating ??
                            "—"}
                        </span>

                      </div>

                      <p className="mt-1 text-xs text-slate-500">
                        Rating
                      </p>

                    </div>

                    {/* COMPLETED */}

                    <div className="rounded-xl border bg-blue-50 p-3">

                      <h4 className="text-lg font-bold text-blue-700">
                        {deliveryBoy.completedOrders ??
                          "—"}
                      </h4>

                      <p className="text-xs text-slate-500">
                        Completed
                      </p>

                    </div>

                    {/* TODAY */}

                    <div className="rounded-xl border bg-green-50 p-3">

                      <h4 className="text-lg font-bold text-green-700">
                        {deliveryBoy.todayDeliveries ??
                          "—"}
                      </h4>

                      <p className="text-xs text-slate-500">
                        Today
                      </p>

                    </div>

                    {/* SUCCESS */}

                    <div className="rounded-xl border bg-purple-50 p-3">

                      <h4 className="text-lg font-bold text-purple-700">
                        {deliveryBoy.successRate ??
                          "—"}
                      </h4>

                      <p className="text-xs text-slate-500">
                        Success
                      </p>

                    </div>

                  </div>

                </td>

                {/* ==================================
                    VERIFICATION
                ================================== */}

                <td className="px-6 py-5 text-center">

                  {deliveryBoy.isVerified ? (
                    <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2">

                      <ShieldCheck
                        size={18}
                        className="text-emerald-600"
                      />

                      <span className="font-semibold text-emerald-700">
                        Verified
                      </span>

                    </div>
                  ) : (
                    <div className="space-y-3">

                      <div className="inline-flex items-center gap-2 rounded-full bg-red-100 px-4 py-2">

                        <ShieldAlert
                          size={18}
                          className="text-red-600"
                        />

                        <span className="font-semibold text-red-600">
                          Pending
                        </span>

                      </div>

                      <div>
                        <button
                          type="button"
                          onClick={() =>
                            onVerify?.(deliveryBoy)
                          }
                          className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-emerald-700 hover:shadow-lg"
                        >
                          Verify Now
                        </button>
                      </div>

                    </div>
                  )}

                </td>

                {/* ==================================
                    AVAILABILITY
                ================================== */}

                <td className="px-6 py-5 text-center">

                  <div className="flex flex-col items-center gap-3">

                    <label className="relative inline-flex cursor-pointer items-center">

                      <input
                        type="checkbox"
                        checked={
                          deliveryBoy.isAvailable === true
                        }
                        onChange={() =>
                          onAvailabilityChange?.(
                            deliveryBoy
                          )
                        }
                        className="peer sr-only"
                      />

                      <div className="h-7 w-14 rounded-full bg-slate-300 transition-all peer-checked:bg-emerald-600">

                        <div className="absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow transition-all peer-checked:translate-x-7" />

                      </div>

                    </label>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        deliveryBoy.isAvailable
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {deliveryBoy.isAvailable
                        ? "Available"
                        : "Offline"}
                    </span>

                  </div>

                </td>

                {/* ==================================
                    ACTIONS
                ================================== */}

                <td className="px-6 py-5">

                  <div className="flex items-center justify-center gap-2">

                    {/* VIEW */}

                    <button
                      type="button"
                      onClick={() =>
                        onView?.(deliveryBoy)
                      }
                      className="group rounded-xl border border-blue-200 bg-blue-50 p-3 transition-all hover:scale-110 hover:bg-blue-600"
                      title="View Details"
                    >
                      <Eye
                        size={18}
                        className="text-blue-600 group-hover:text-white"
                      />
                    </button>

                    {/* LOCATION */}

                    <button
                      type="button"
                      onClick={() =>
                        onLocation?.(deliveryBoy)
                      }
                      className="group rounded-xl border border-indigo-200 bg-indigo-50 p-3 transition-all hover:scale-110 hover:bg-indigo-600"
                      title="Live Location"
                    >
                      <MapPin
                        size={18}
                        className="text-indigo-600 group-hover:text-white"
                      />
                    </button>

                    {/* ASSIGN */}

                    <button
                      type="button"
                      onClick={() =>
                        onAssign?.(deliveryBoy)
                      }
                      className="group rounded-xl border border-green-200 bg-green-50 p-3 transition-all hover:scale-110 hover:bg-green-600"
                      title="Assign Order"
                    >
                      <Truck
                        size={18}
                        className="text-green-600 group-hover:text-white"
                      />
                    </button>

                    {/* EDIT */}

                    <button
                      type="button"
                      onClick={() =>
                        onEdit?.(deliveryBoy)
                      }
                      className="group rounded-xl border border-yellow-200 bg-yellow-50 p-3 transition-all hover:scale-110 hover:bg-yellow-500"
                      title="Edit"
                    >
                      <Pencil
                        size={18}
                        className="text-yellow-600 group-hover:text-white"
                      />
                    </button>

                    {/* DELETE */}

                    <button
                      type="button"
                      onClick={() =>
                        onDelete?.(deliveryBoy)
                      }
                      className="group rounded-xl border border-red-200 bg-red-50 p-3 transition-all hover:scale-110 hover:bg-red-600"
                      title="Delete"
                    >
                      <Trash2
                        size={18}
                        className="text-red-600 group-hover:text-white"
                      />
                    </button>

                  </div>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

      {/* ======================================
          FOOTER
      ====================================== */}

      <div className="border-t border-slate-200 bg-slate-50 px-6 py-5">

        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

          <p className="text-sm text-slate-600">
            Showing{" "}
            <span className="font-semibold text-slate-800">
              {deliveryBoys.length}
            </span>{" "}
            Delivery Partners
          </p>

          <div className="flex items-center gap-3">

            <button
              type="button"
              disabled
              className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-500 opacity-60"
            >
              Previous
            </button>

            <button
              type="button"
              disabled
              className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white opacity-60"
            >
              Next
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default DeliveryTable;