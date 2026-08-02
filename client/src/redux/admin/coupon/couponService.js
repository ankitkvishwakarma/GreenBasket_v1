import api from "@/services/axios";

// ==============================
// Get All Coupons
// ==============================
export const getCouponsAPI = async () => {
  const { data } = await api.get("/coupons");
  return data;
};

// ==============================
// Get Coupon By ID
// ==============================
export const getCouponByIdAPI = async (id) => {
  const { data } = await api.get(`/coupons/${id}`);
  return data;
};

// ==============================
// Create Coupon
// ==============================
export const createCouponAPI = async (couponData) => {
  const { data } = await api.post("/coupons", couponData);
  return data;
};

// ==============================
// Update Coupon
// ==============================
export const updateCouponAPI = async ({
  id,
  couponData,
}) => {
  const { data } = await api.put(
    `/coupons/${id}`,
    couponData
  );

  return data;
};

// ==============================
// Delete Coupon
// ==============================
export const deleteCouponAPI = async (id) => {
  const { data } = await api.delete(`/coupons/${id}`);
  return data;
};