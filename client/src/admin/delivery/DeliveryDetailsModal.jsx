import {
  X,
  User,
  Mail,
  Phone,
  Bike,
  ShieldCheck,
  MapPin,
  Truck,
} from "lucide-react";

const DeliveryDetailsModal = ({
  open,
  deliveryBoy,
  onClose,
}) => {
  if (!open || !deliveryBoy) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">

      <div className="w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-slate-200 bg-gradient-to-r from-emerald-600 to-green-600 px-8 py-6">

          <div>

            <h2 className="text-3xl font-bold text-white">
              Delivery Partner Details
            </h2>

            <p className="mt-2 text-sm text-emerald-100">
              Complete profile and delivery information.
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

          {/* Profile */}

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center">

            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-emerald-100 text-4xl font-bold text-emerald-700">

              {deliveryBoy.name?.charAt(0)?.toUpperCase()}

            </div>

            <div>

              <h3 className="text-3xl font-bold text-slate-800">
                {deliveryBoy.name}
              </h3>

              <p className="mt-2 text-slate-500">
                Delivery Executive
              </p>

              <div className="mt-4 flex flex-wrap gap-3">

                <span
                  className={`rounded-full px-4 py-1 text-sm font-semibold ${
                    deliveryBoy.isVerified
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {deliveryBoy.isVerified
                    ? "Verified"
                    : "Pending Verification"}
                </span>

                <span
                  className={`rounded-full px-4 py-1 text-sm font-semibold ${
                    deliveryBoy.isAvailable
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {deliveryBoy.isAvailable
                    ? "Available"
                    : "Offline"}
                </span>

              </div>

            </div>

          </div>

          {/* Information Grid */}

          <div className="grid gap-6 md:grid-cols-2">
                        {/* Personal Information */}

            <div className="rounded-2xl border border-slate-200 p-6">

              <h4 className="mb-5 text-lg font-semibold text-slate-800">
                Personal Information
              </h4>

              <div className="space-y-5">

                <div className="flex items-center gap-4">
                  <User className="text-emerald-600" size={20} />
                  <div>
                    <p className="text-xs uppercase text-slate-500">
                      Full Name
                    </p>
                    <p className="font-semibold text-slate-800">
                      {deliveryBoy.name}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Mail className="text-blue-600" size={20} />
                  <div>
                    <p className="text-xs uppercase text-slate-500">
                      Email
                    </p>
                    <p className="font-semibold text-slate-800">
                      {deliveryBoy.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Phone className="text-orange-600" size={20} />
                  <div>
                    <p className="text-xs uppercase text-slate-500">
                      Mobile
                    </p>
                    <p className="font-semibold text-slate-800">
                      {deliveryBoy.phone || "-"}
                    </p>
                  </div>
                </div>

              </div>

            </div>

            {/* Vehicle Information */}

            <div className="rounded-2xl border border-slate-200 p-6">

              <h4 className="mb-5 text-lg font-semibold text-slate-800">
                Vehicle Information
              </h4>

              <div className="space-y-5">

                <div className="flex items-center gap-4">
                  <Bike className="text-emerald-600" size={20} />
                  <div>
                    <p className="text-xs uppercase text-slate-500">
                      Vehicle Type
                    </p>
                    <p className="font-semibold text-slate-800">
                      {deliveryBoy.vehicleType || "-"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Truck className="text-indigo-600" size={20} />
                  <div>
                    <p className="text-xs uppercase text-slate-500">
                      Vehicle Number
                    </p>
                    <p className="font-semibold text-slate-800">
                      {deliveryBoy.vehicleNumber || "-"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <ShieldCheck
                    className="text-green-600"
                    size={20}
                  />
                  <div>
                    <p className="text-xs uppercase text-slate-500">
                      License Number
                    </p>
                    <p className="font-semibold text-slate-800">
                      {deliveryBoy.licenseNumber || "-"}
                    </p>
                  </div>
                </div>

              </div>

            </div>

            {/* Address */}

            <div className="rounded-2xl border border-slate-200 p-6">

              <h4 className="mb-5 text-lg font-semibold text-slate-800">
                Address
              </h4>

              <div className="flex items-start gap-4">

                <MapPin
                  className="mt-1 text-red-500"
                  size={20}
                />

                <p className="leading-7 text-slate-700">
                  {deliveryBoy.address ||
                    "Address not available"}
                </p>

              </div>

            </div>

            {/* Statistics */}

            <div className="rounded-2xl border border-slate-200 p-6">

              <h4 className="mb-5 text-lg font-semibold text-slate-800">
                Delivery Statistics
              </h4>

              <div className="grid grid-cols-2 gap-4">

                <div className="rounded-xl bg-emerald-50 p-4">
                  <p className="text-xs uppercase text-slate-500">
                    Assigned Orders
                  </p>
                  <h3 className="mt-2 text-3xl font-bold text-emerald-600">
                    {deliveryBoy.totalOrders ?? 0}
                  </h3>
                </div>

                <div className="rounded-xl bg-blue-50 p-4">
                  <p className="text-xs uppercase text-slate-500">
                    Completed
                  </p>
                  <h3 className="mt-2 text-3xl font-bold text-blue-600">
                    {deliveryBoy.completedOrders ?? 0}
                  </h3>
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Footer */}

        <div className="flex justify-end border-t border-slate-200 px-8 py-5">

          <button
            onClick={onClose}
            className="rounded-2xl bg-emerald-600 px-8 py-3 font-semibold text-white transition hover:bg-emerald-700"
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
};

export default DeliveryDetailsModal;