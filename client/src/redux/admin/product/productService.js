import api from "@/services/axios";

const PRODUCT_URL = "/products";

/* =====================================================
   GET ALL PRODUCTS
===================================================== */

export const getProductsAPI = async (params = {}) => {
  const { data } = await api.get(PRODUCT_URL, {
    params,
  });

  return data;
};

/* =====================================================
   GET PRODUCT BY ID
===================================================== */

export const getProductByIdAPI = async (id) => {
  const { data } = await api.get(
    `${PRODUCT_URL}/id/${id}`
  );

  return data;
};

/* =====================================================
   CREATE PRODUCT
===================================================== */

export const createProductAPI = async (
  productData
) => {
  const { data } = await api.post(
    PRODUCT_URL,
    productData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return data;
};

/* =====================================================
   UPDATE PRODUCT
===================================================== */

export const updateProductAPI = async ({
  id,
  productData,
}) => {
  const { data } = await api.put(
    `${PRODUCT_URL}/${id}`,
    productData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return data;
};

/* =====================================================
   DELETE PRODUCT
===================================================== */

export const deleteProductAPI = async (
  id
) => {
  const { data } = await api.delete(
    `${PRODUCT_URL}/${id}`
  );

  return data;
};
/* =====================================================
   LOW STOCK PRODUCTS
===================================================== */

export const getLowStockProductsAPI =
  async () => {
    const { data } = await api.get(
      `${PRODUCT_URL}/low-stock`
    );

    return data;
  };

/* =====================================================
   FEATURED PRODUCTS
===================================================== */

export const getFeaturedProductsAPI =
  async () => {
    const { data } = await api.get(
      `${PRODUCT_URL}/featured`
    );

    return data;
  };

/* =====================================================
   LATEST PRODUCTS
===================================================== */

export const getLatestProductsAPI =
  async () => {
    const { data } = await api.get(
      `${PRODUCT_URL}/latest`
    );

    return data;
  };

/* =====================================================
   BEST SELLER PRODUCTS
===================================================== */

export const getBestSellerProductsAPI =
  async () => {
    const { data } = await api.get(
      `${PRODUCT_URL}/best-sellers`
    );

    return data;
  };

/* =====================================================
   RELATED PRODUCTS
===================================================== */

export const getRelatedProductsAPI =
  async (id) => {
    const { data } = await api.get(
      `${PRODUCT_URL}/${id}/related`
    );

    return data;
  };

/* =====================================================
   PRODUCT STATISTICS
===================================================== */

export const getProductStatsAPI =
  async () => {
    const { data } = await api.get(
      `${PRODUCT_URL}/stats`
    );

    return data;
  };