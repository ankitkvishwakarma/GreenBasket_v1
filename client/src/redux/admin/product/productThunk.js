import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getProductsAPI,
  getProductByIdAPI,
  createProductAPI,
  updateProductAPI,
  deleteProductAPI,
  getLowStockProductsAPI,
  getFeaturedProductsAPI,
  getLatestProductsAPI,
  getBestSellerProductsAPI,
  getRelatedProductsAPI,
  getProductStatsAPI,
} from "./productService";

// ==============================
// Get All Products
// ==============================
export const getProducts = createAsyncThunk(
  "product/getProducts",
  async (params = {}, thunkAPI) => {
    try {
      return await getProductsAPI(params);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch products"
      );
    }
  }
);

// ==============================
// Get Product By ID
// ==============================
export const getProductById = createAsyncThunk(
  "product/getProductById",
  async (id, thunkAPI) => {
    try {
      return await getProductByIdAPI(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch product"
      );
    }
  }
);

// ==============================
// Create Product
// ==============================
export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (productData, thunkAPI) => {
    try {
      return await createProductAPI(productData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to create product"
      );
    }
  }
);

// ==============================
// Update Product
// ==============================
export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ id, productData }, thunkAPI) => {
    try {
      return await updateProductAPI({
        id,
        productData,
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to update product"
      );
    }
  }
);

// ==============================
// Delete Product
// ==============================
export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id, thunkAPI) => {
    try {
      return await deleteProductAPI(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to delete product"
      );
    }
  }
);

// ==============================
// Low Stock Products
// ==============================
export const getLowStockProducts =
  createAsyncThunk(
    "product/getLowStockProducts",
    async (_, thunkAPI) => {
      try {
        return await getLowStockProductsAPI();
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            "Failed to fetch low stock products"
        );
      }
    }
  );

// ==============================
// Featured Products
// ==============================
export const getFeaturedProducts =
  createAsyncThunk(
    "product/getFeaturedProducts",
    async (_, thunkAPI) => {
      try {
        return await getFeaturedProductsAPI();
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            "Failed to fetch featured products"
        );
      }
    }
  );

// ==============================
// Latest Products
// ==============================
export const getLatestProducts =
  createAsyncThunk(
    "product/getLatestProducts",
    async (_, thunkAPI) => {
      try {
        return await getLatestProductsAPI();
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            "Failed to fetch latest products"
        );
      }
    }
  );

// ==============================
// Best Seller Products
// ==============================
export const getBestSellerProducts =
  createAsyncThunk(
    "product/getBestSellerProducts",
    async (_, thunkAPI) => {
      try {
        return await getBestSellerProductsAPI();
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            "Failed to fetch best seller products"
        );
      }
    }
  );

// ==============================
// Related Products
// ==============================
export const getRelatedProducts =
  createAsyncThunk(
    "product/getRelatedProducts",
    async (id, thunkAPI) => {
      try {
        return await getRelatedProductsAPI(id);
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            "Failed to fetch related products"
        );
      }
    }
  );

// ==============================
// Product Statistics
// ==============================
export const getProductStats =
  createAsyncThunk(
    "product/getProductStats",
    async (_, thunkAPI) => {
      try {
        return await getProductStatsAPI();
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            "Failed to fetch product statistics"
        );
      }
    }
  );