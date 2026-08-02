import {
  ShieldCheck,
  X,
  CheckCircle2,
} from "lucide-react";

const VerifyDeliveryModal = ({
  open,
  loading,
  deliveryBoy,
  onClose,
  onVerify,
}) => {
  if (!open || !deliveryBoy) return null;

  const handleVerify = () => {
    onVerify(deliveryBoy._id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">

      <div className="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl">

        {/* Header */}

        <div className="bg-emerald-600 px-8 py-6">

          <div className="flex items-center gap-4">

            <div className="rounded-2xl bg-white/20 p-3">
              <ShieldCheck
                size={30}
                className="text-white"
              />
            </div>

            <div>

              <h2 className="text-2xl font-bold text-white">
                Verify Delivery Partner
              </h2>

              <p className="mt-1 text-sm text-emerald-100">
                Verify this delivery partner to allow order
                assignments.
              </p>

            </div>

          </div>

        </div>

        {/* Body */}

        <div className="space-y-6 p-8">

          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">

            <p className="text-slate-700">
              You are about to verify this delivery partner.
            </p>

            <div className="mt-5 rounded-xl bg-white p-4">

              <p className="text-xs uppercase text-slate-500">
                Name
              </p>

              <h3 className="text-lg font-bold text-slate-800">
                {deliveryBoy.name}
              </h3>

              <p className="mt-4 text-xs uppercase text-slate-500">
                Email
              </p>

              <p className="font-medium text-slate-700">
                {deliveryBoy.email}
              </p>

              <p className="mt-4 text-xs uppercase text-slate-500">
                Phone
              </p>

              <p className="font-medium text-slate-700">
                {deliveryBoy.phone}
              </p>

            </div>

          </div>

          <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4">

            <div className="flex items-start gap-3">

              <CheckCircle2
                className="mt-0.5 text-blue-600"
                size={20}
              />

              <p className="text-sm leading-6 text-slate-700">
                After verification, this delivery partner can
                receive assigned orders and access the delivery
                dashboard.
              </p>

            </div>

          </div>

        </div>

        {/* Footer */}

        <div className="flex flex-col-reverse gap-3 border-t border-slate-200 px-8 py-6 sm:flex-row sm:justify-end">

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-slate-300 px-6 font-medium text-slate-700 transition hover:bg-slate-100"
          >
            <X size={18} />
            Cancel
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={handleVerify}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <ShieldCheck size={18} />

            {loading
              ? "Verifying..."
              : "Verify Delivery Boy"}
          </button>

        </div>

      </div>

    </div>
  );
};

export default VerifyDeliveryModal;