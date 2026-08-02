import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { X } from "lucide-react";

import CouponForm from "./CouponForm";

import {
  createCoupon,
  getCoupons,
} from "@/redux/admin/coupon/couponThunk";

import {
  resetCouponState,
} from "@/redux/admin/coupon/couponSlice";

const AddCoupon = ({
  open,
  onClose,
}) => {
  const dispatch = useDispatch();

  const { loading } = useSelector(
    (state) => state.coupon
  );

  if (!open) return null;

  const handleSubmit = async (formData) => {
    const result = await dispatch(
      createCoupon(formData)
    );

    if (createCoupon.fulfilled.match(result)) {
      toast.success(
        result.payload.message ||
        "Coupon created successfully"
      );

      await dispatch(getCoupons());

      dispatch(resetCouponState());

      onClose();
    } else {
      toast.error(
        result.payload ||
        "Failed to create coupon"
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">

          <h2 className="text-2xl font-semibold">
            Add Coupon
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-gray-100"
          >
            <X size={20} />
          </button>

        </div>

        {/* Body */}
        <div className="max-h-[80vh] overflow-y-auto p-6">

          <CouponForm
            onSubmit={handleSubmit}
            loading={loading}
          />

        </div>

      </div>

    </div>
  );
};

export default AddCoupon;