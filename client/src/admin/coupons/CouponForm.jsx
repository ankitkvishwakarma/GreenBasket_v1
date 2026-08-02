import { useEffect, useState } from "react";

const CouponForm = ({
  initialData = null,
  onSubmit,
  loading = false,
}) => {
  const [formData, setFormData] = useState({
    code: "",
    discountType: "PERCENTAGE",
    discountValue: "",
    minimumOrderAmount: "",
    maximumDiscount: "",
    usageLimit: 1,
    expiresAt: "",
    isActive: true,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        code: initialData.code || "",
        discountType:
          initialData.discountType || "PERCENTAGE",
        discountValue:
          initialData.discountValue || "",
        minimumOrderAmount:
          initialData.minimumOrderAmount || "",
        maximumDiscount:
          initialData.maximumDiscount || "",
        usageLimit:
          initialData.usageLimit || 1,
        expiresAt: initialData.expiresAt
          ? initialData.expiresAt.slice(0, 16)
          : "",
        isActive:
          initialData.isActive ?? true,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } =
      e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      ...formData,
      code: formData.code.trim().toUpperCase(),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      {/* Coupon Code */}
      <div>
        <label className="mb-2 block font-medium">
          Coupon Code
        </label>

        <input
          type="text"
          name="code"
          value={formData.code}
          onChange={handleChange}
          required
          className="w-full rounded-lg border p-3"
          placeholder="SAVE20"
        />
      </div>

      {/* Discount Type */}
      <div>
        <label className="mb-2 block font-medium">
          Discount Type
        </label>

        <select
          name="discountType"
          value={formData.discountType}
          onChange={handleChange}
          className="w-full rounded-lg border p-3"
        >
          <option value="PERCENTAGE">
            Percentage
          </option>

          <option value="FIXED">
            Fixed
          </option>
        </select>
      </div>

      {/* Discount Value */}
      <div>
        <label className="mb-2 block font-medium">
          Discount Value
        </label>

        <input
          type="number"
          name="discountValue"
          value={formData.discountValue}
          onChange={handleChange}
          required
          min="1"
          className="w-full rounded-lg border p-3"
        />
      </div>

      {/* Minimum Order */}
      <div>
        <label className="mb-2 block font-medium">
          Minimum Order Amount
        </label>

        <input
          type="number"
          name="minimumOrderAmount"
          value={formData.minimumOrderAmount}
          onChange={handleChange}
          min="0"
          className="w-full rounded-lg border p-3"
        />
      </div>

      {/* Maximum Discount */}
      <div>
        <label className="mb-2 block font-medium">
          Maximum Discount
        </label>

        <input
          type="number"
          name="maximumDiscount"
          value={formData.maximumDiscount}
          onChange={handleChange}
          min="0"
          className="w-full rounded-lg border p-3"
        />
      </div>

      {/* Usage Limit */}
      <div>
        <label className="mb-2 block font-medium">
          Usage Limit
        </label>

        <input
          type="number"
          name="usageLimit"
          value={formData.usageLimit}
          onChange={handleChange}
          min="1"
          className="w-full rounded-lg border p-3"
        />
      </div>

      {/* Expiry */}
      <div>
        <label className="mb-2 block font-medium">
          Expiry Date
        </label>

        <input
          type="datetime-local"
          name="expiresAt"
          value={formData.expiresAt}
          onChange={handleChange}
          required
          className="w-full rounded-lg border p-3"
        />
      </div>

      {/* Active */}
      {initialData && (
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
          />

          <label>Active Coupon</label>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-green-600 py-3 font-semibold text-white hover:bg-green-700 disabled:opacity-50"
      >
        {loading
          ? "Saving..."
          : initialData
          ? "Update Coupon"
          : "Create Coupon"}
      </button>
    </form>
  );
};

export default CouponForm;