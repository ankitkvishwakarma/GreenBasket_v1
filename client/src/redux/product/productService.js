import api from "@/services/axios";

const PRODUCT_URL = "/products";

/* =====================================================
   GET ALL PRODUCTS
===================================================== */

export const getProductsAPI = async (params = {}) => {
  const response = await api.get(PRODUCT_URL, {
    params,
  });

  return response.data;
};

/* =====================================================
   GET PRODUCT BY SLUG
===================================================== */

export const getProductBySlugAPI = async (slug) => {
  const response = await api.get(
    `${PRODUCT_URL}/${slug}`
  );

  return response.data;
};

/* =====================================================
   GET PRODUCT BY ID
===================================================== */

export const getProductByIdAPI = async (id) => {
  const response = await api.get(
    `${PRODUCT_URL}/id/${id}`
  );

  return response.data;
};

/* =====================================================
   SEARCH PRODUCTS
===================================================== */

export const searchProductsAPI = async (keyword) => {
  const response = await api.get(
    `${PRODUCT_URL}/search`,
    {
      params: {
        keyword,
      },
    }
  );

  return response.data;
};

/* =====================================================
   FILTER PRODUCTS
===================================================== */

export const filterProductsAPI = async (
  filters = {}
) => {
  const response = await api.get(
    `${PRODUCT_URL}/filter`,
    {
      params: filters,
    }
  );

  return response.data;
};

/* =====================================================
   FEATURED PRODUCTS
===================================================== */

export const getFeaturedProductsAPI =
  async () => {
    const response = await api.get(
      `${PRODUCT_URL}/featured`
    );

    return response.data;
  };

/* =====================================================
   LATEST PRODUCTS
===================================================== */

export const getLatestProductsAPI =
  async () => {
    const response = await api.get(
      `${PRODUCT_URL}/latest`
    );

    return response.data;
  };

/* =====================================================
   TRENDING PRODUCTS
===================================================== */

export const getTrendingProductsAPI =
  async () => {
    const response = await api.get(
      `${PRODUCT_URL}/trending`
    );

    return response.data;
  };

/* =====================================================
   BEST SELLER PRODUCTS
===================================================== */

export const getBestSellerProductsAPI =
  async () => {
    const response = await api.get(
      `${PRODUCT_URL}/best-seller`
    );

    return response.data;
  };

/* =====================================================
   RELATED PRODUCTS
===================================================== */

export const getRelatedProductsAPI =
  async (productId) => {
    const response = await api.get(
      `${PRODUCT_URL}/related/${productId}`
    );

    return response.data;
  };

/* =====================================================
   ADD REVIEW
===================================================== */

export const addReviewAPI = async (
  productId,
  reviewData
) => {
  const response = await api.post(
    `${PRODUCT_URL}/${productId}/review`,
    reviewData
  );

  return response.data;
};

/* =====================================================
   UPDATE REVIEW
===================================================== */

export const updateReviewAPI = async (
  productId,
  reviewData
) => {
  const response = await api.put(
    `${PRODUCT_URL}/${productId}/review`,
    reviewData
  );

  return response.data;
};

/* =====================================================
   DELETE REVIEW
===================================================== */

export const deleteReviewAPI = async (
  productId
) => {
  const response = await api.delete(
    `${PRODUCT_URL}/${productId}/review`
  );

  return response.data;
};