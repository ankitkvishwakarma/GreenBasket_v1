import api from "@/services/axios";

/* ==========================================
   GET CART
========================================== */

export const getCartAPI = async () => {
  const { data } = await api.get("/cart");
  return data;
};

/* ==========================================
   ADD TO CART
========================================== */

export const addToCartAPI = async (cartData) => {
  const { data } = await api.post(
    "/cart/add",
    cartData
  );

  return data;
};

/* ==========================================
   UPDATE CART ITEM
========================================== */

export const updateCartItemAPI = async (
  cartData
) => {
  const { data } = await api.put(
    "/cart/update",
    cartData
  );

  return data;
};

/* ==========================================
   REMOVE CART ITEM
========================================== */

export const removeCartItemAPI = async (
  productId
) => {
  const { data } = await api.delete(
    `/cart/remove/${productId}`
  );

  return data;
};

/* ==========================================
   CLEAR CART
========================================== */

export const clearCartAPI = async () => {
  const { data } = await api.delete(
    "/cart/clear"
  );

  return data;
};

/* ==========================================
   CART SUMMARY
========================================== */

export const getCartSummaryAPI =
  async () => {
    const { data } = await api.get(
      "/cart/summary"
    );

    return data;
  };