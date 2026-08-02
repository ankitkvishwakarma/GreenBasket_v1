import {
  AlertTriangle,
  Trash2,
  X,
} from "lucide-react";

const DeleteDeliveryModal = ({
  open,
  loading,
  deliveryBoy,
  onClose,
  onDelete,
}) => {
  if (!open || !deliveryBoy) return null;

  const handleDelete = () => {
    onDelete(deliveryBoy._id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">

      <div className="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl">

        {/* Header */}

        <div className="bg-red-600 px-8 py-6 text-white">

          <div className="flex items-center gap-4">

            <div className="rounded-2xl bg-white/20 p-3">
              <AlertTriangle size={30} />
            </div>

            <div>

              <h2 className="text-2xl font-bold">
                Delete Delivery Partner
              </h2>

              <p className="mt-1 text-red-100">
                This action cannot be undone.
              </p>

            </div>

          </div>

        </div>

        {/* Body */}

        <div className="space-y-6 p-8">

          <div className="rounded-2xl border border-red-200 bg-red-50 p-5">

            <p className="text-slate-700">
              Are you sure you want to permanently delete
              this delivery partner?
            </p>

            <div className="mt-5 rounded-xl bg-white p-4">

              <p className="text-xs uppercase text-slate-500">
                Name
              </p>

              <h3 className="text-lg font-bold text-slate-800">
                {deliveryBoy.name}
              </h3>

              <p className="mt-3 text-xs uppercase text-slate-500">
                Email
              </p>

              <p className="font-medium text-slate-700">
                {deliveryBoy.email}
              </p>

              <p className="mt-3 text-xs uppercase text-slate-500">
                Phone
              </p>

              <p className="font-medium text-slate-700">
                {deliveryBoy.phone}
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
            className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-slate-300 px-6 font-medium text-slate-700 hover:bg-slate-100"
          >
            <X size={18} />
            Cancel
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={handleDelete}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-red-600 px-6 font-medium text-white hover:bg-red-700 disabled:opacity-60"
          >
            <Trash2 size={18} />

            {loading
              ? "Deleting..."
              : "Delete Delivery Boy"}
          </button>

        </div>

      </div>

    </div>
  );
};

export default DeleteDeliveryModal;