import api from "@/services/axios";

const PRODUCT_URL = "/products";

// ==============================
// Get All Products
// ==============================
export const getProductsAPI = async (params = {}) => {
  const response = await api.get(PRODUCT_URL, {
    params,
  });

  return response.data;
};

// ==============================
// Get Product By ID
// ==============================
export const getProductByIdAPI = async (id) => {
  const response = await api.get(
    `${PRODUCT_URL}/${id}`
  );

  return response.data;
};

// ==============================
// Create Product
// ==============================
export const createProductAPI = async (
  productData
) => {
  const response = await api.post(
    PRODUCT_URL,
    productData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return response.data;
};

// ==============================
// Update Product
// ==============================
export const updateProductAPI = async ({
  id,
  productData,
}) => {
  const response = await api.put(
    `${PRODUCT_URL}/${id}`,
    productData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return response.data;
};

// ==============================
// Delete Product
// ==============================
export const deleteProductAPI = async (
  id
) => {
  const response = await api.delete(
    `${PRODUCT_URL}/${id}`
  );

  return response.data;
};

// ==============================
// Low Stock Products
// ==============================
export const getLowStockProductsAPI =
  async () => {
    const response = await api.get(
      `${PRODUCT_URL}/low-stock`
    );

    return response.data;
  };

// ==============================
// Featured Products
// ==============================
export const getFeaturedProductsAPI =
  async () => {
    const response = await api.get(
      `${PRODUCT_URL}/featured`
    );

    return response.data;
  };

// ==============================
// Latest Products
// ==============================
export const getLatestProductsAPI =
  async () => {
    const response = await api.get(
      `${PRODUCT_URL}/latest`
    );

    return response.data;
  };

// ==============================
// Best Seller Products
// ==============================
export const getBestSellerProductsAPI =
  async () => {
    const response = await api.get(
      `${PRODUCT_URL}/best-sellers`
    );

    return response.data;
  };

// ==============================
// Related Products
// ==============================
export const getRelatedProductsAPI =
  async (id) => {
    const response = await api.get(
      `${PRODUCT_URL}/${id}/related`
    );

    return response.data;
  };

// ==============================
// Product Statistics
// ==============================
export const getProductStatsAPI =
  async () => {
    const response = await api.get(
      `${PRODUCT_URL}/stats`
    );

    return response.data;
  };