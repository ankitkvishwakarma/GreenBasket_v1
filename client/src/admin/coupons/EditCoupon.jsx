import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { X } from "lucide-react";

import CouponForm from "./CouponForm";

import {
  updateCoupon,
  getCoupons,
} from "@/redux/admin/coupon/couponThunk";

import {
  resetCouponState,
} from "@/redux/admin/coupon/couponSlice";

const EditCoupon = ({
  open,
  onClose,
  coupon,
}) => {
  const dispatch = useDispatch();

  const { loading } = useSelector(
    (state) => state.coupon
  );

  if (!open || !coupon) return null;

  const handleSubmit = async (formData) => {
    const result = await dispatch(
      updateCoupon({
        id: coupon._id,
        couponData: formData,
      })
    );

    if (updateCoupon.fulfilled.match(result)) {
      toast.success(
        result.payload.message ||
        "Coupon updated successfully"
      );

      await dispatch(getCoupons());

      dispatch(resetCouponState());

      onClose();
    } else {
      toast.error(
        result.payload ||
        "Failed to update coupon"
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-2xl font-semibold">
            Edit Coupon
          </h2>

          <button
            onClick={onClose}
            disabled={loading}
            className="rounded-lg p-2 transition hover:bg-gray-100 disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[80vh] overflow-y-auto p-6">
          <CouponForm
            initialData={coupon}
            onSubmit={handleSubmit}
            loading={loading}
          />
        </div>

      </div>
    </div>
  );
};

export default EditCoupon;