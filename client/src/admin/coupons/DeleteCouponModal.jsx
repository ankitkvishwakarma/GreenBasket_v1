import { useDispatch, useSelector } from "react-redux";
import { Trash2, X } from "lucide-react";
import { toast } from "react-hot-toast";

import {
  deleteCoupon,
  getCoupons,
} from "@/redux/admin/coupon/couponThunk";

import {
  resetCouponState,
} from "@/redux/admin/coupon/couponSlice";

const DeleteCouponModal = ({
  open,
  onClose,
  coupon,
}) => {
  const dispatch = useDispatch();

  const { loading } = useSelector(
    (state) => state.coupon
  );

  if (!open || !coupon) return null;

  const handleDelete = async () => {
    try {
      const result = await dispatch(
        deleteCoupon(coupon._id)
      );

      if (deleteCoupon.fulfilled.match(result)) {
        toast.success(
          result.payload?.message ||
          "Coupon deleted successfully"
        );

        await dispatch(getCoupons());

        dispatch(resetCouponState());

        onClose();
      } else {
        toast.error(
          result.payload ||
          "Failed to delete coupon"
        );
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-red-100 p-3">
              <Trash2
                size={22}
                className="text-red-600"
              />
            </div>

            <h2 className="text-xl font-semibold">
              Delete Coupon
            </h2>
          </div>

          <button
            onClick={onClose}
            disabled={loading}
            className="rounded-lg p-2 transition hover:bg-gray-100 disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-4 p-6">
          <p className="text-gray-600">
            Are you sure you want to delete this coupon?
          </p>

          <div className="rounded-xl bg-red-50 p-4">
            <h3 className="font-semibold text-red-700">
              {coupon.code}
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Type: {coupon.discountType}
            </p>

            <p className="text-sm text-gray-500">
              Discount:{" "}
              {coupon.discountType === "PERCENTAGE"
                ? `${coupon.discountValue}%`
                : `₹${coupon.discountValue}`}
            </p>

            <p className="text-sm text-gray-500">
              Usage Limit: {coupon.usageLimit}
            </p>
          </div>

          <p className="text-sm font-medium text-red-500">
            This action cannot be undone.
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-4 border-t p-5">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-xl border px-5 py-2.5 transition hover:bg-gray-100 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="rounded-xl bg-red-600 px-5 py-2.5 text-white transition hover:bg-red-700 disabled:opacity-50"
          >
            {loading
              ? "Deleting..."
              : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCouponModal;