import {
  Plus,
  Truck,
  Users,
  ShieldCheck,
  WifiOff,
} from "lucide-react";

const DeliveryHeader = ({
  stats,
  onAdd,
}) => {
  return (
    <div className="space-y-6">

      {/* ================= Hero Section ================= */}

      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 p-8 shadow-xl">

        {/* Background Blur */}

        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

        <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <span className="inline-flex items-center rounded-full bg-white/20 px-4 py-1 text-sm font-medium text-white backdrop-blur">
              GreenBasket Admin Panel
            </span>

            <h1 className="mt-4 text-4xl font-bold text-white">
              Delivery Management
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-emerald-50">
              Manage delivery partners, monitor verification,
              availability, assignments and overall delivery
              operations from one centralized dashboard.
            </p>

          </div>

          <button
            onClick={onAdd}
            className="inline-flex h-14 items-center justify-center gap-3 rounded-2xl bg-white px-7 font-semibold text-emerald-700 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
          >
            <Plus size={22} />
            Add Delivery Boy
          </button>

        </div>

      </div>

      {/* ================= Statistics ================= */}

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

        {/* Total */}

        <div className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-medium text-slate-500">
                Total Delivery Boys
              </p>

              <h2 className="mt-3 text-4xl font-bold text-slate-800">
                {stats.total}
              </h2>

            </div>

            <div className="rounded-2xl bg-emerald-100 p-4 transition group-hover:scale-110">
              <Users
                size={28}
                className="text-emerald-600"
              />
            </div>

          </div>

        </div>

        {/* Verified */}

        <div className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-medium text-slate-500">
                Verified
              </p>

              <h2 className="mt-3 text-4xl font-bold text-blue-600">
                {stats.verified}
              </h2>

            </div>

            <div className="rounded-2xl bg-blue-100 p-4 transition group-hover:scale-110">
              <ShieldCheck
                size={28}
                className="text-blue-600"
              />
            </div>

          </div>

        </div>
                {/* Available */}

        <div className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-medium text-slate-500">
                Available
              </p>

              <h2 className="mt-3 text-4xl font-bold text-emerald-600">
                {stats.available}
              </h2>

            </div>

            <div className="rounded-2xl bg-emerald-100 p-4 transition-transform duration-300 group-hover:scale-110">
              <Truck
                size={28}
                className="text-emerald-600"
              />
            </div>

          </div>

        </div>

        {/* Offline */}

        <div className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-medium text-slate-500">
                Offline
              </p>

              <h2 className="mt-3 text-4xl font-bold text-red-600">
                {stats.unavailable}
              </h2>

            </div>

            <div className="rounded-2xl bg-red-100 p-4 transition-transform duration-300 group-hover:scale-110">
              <WifiOff
                size={28}
                className="text-red-600"
              />
            </div>

          </div>

        </div>

      </div>

      {/* ================= Bottom Analytics Strip ================= */}

      <div className="rounded-3xl border border-emerald-100 bg-gradient-to-r from-emerald-50 via-white to-green-50 p-6 shadow-sm">

        <div className="grid gap-6 md:grid-cols-3">

          <div>

            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Verification Rate
            </p>

            <h3 className="mt-2 text-3xl font-bold text-slate-800">
              {stats.total
                ? Math.round((stats.verified / stats.total) * 100)
                : 0}
              %
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Delivery partners verified by admin.
            </p>

          </div>

          <div>

            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Active Fleet
            </p>

            <h3 className="mt-2 text-3xl font-bold text-emerald-600">
              {stats.available}
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Currently available for order assignment.
            </p>

          </div>

          <div>

            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Fleet Status
            </p>

            <h3 className="mt-2 text-3xl font-bold text-blue-600">
              {stats.total === 0
                ? "No Data"
                : stats.available >= stats.unavailable
                ? "Healthy"
                : "Attention"}
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Overall operational health of delivery partners.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default DeliveryHeader;