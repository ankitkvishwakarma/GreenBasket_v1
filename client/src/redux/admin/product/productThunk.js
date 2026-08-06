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

/* =====================================================
   GET PRODUCTS
===================================================== */

export const getProducts = createAsyncThunk(
  "adminProduct/getProducts",
  async (params = {}, thunkAPI) => {
    try {
      return await getProductsAPI(params);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

/* =====================================================
   GET PRODUCT BY ID
===================================================== */

export const getProductById = createAsyncThunk(
  "adminProduct/getProductById",
  async (id, thunkAPI) => {
    try {
      return await getProductByIdAPI(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

/* =====================================================
   CREATE PRODUCT
===================================================== */

export const createProduct = createAsyncThunk(
  "adminProduct/createProduct",
  async (productData, thunkAPI) => {
    try {
      return await createProductAPI(productData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

/* =====================================================
   UPDATE PRODUCT
===================================================== */

export const updateProduct = createAsyncThunk(
  "adminProduct/updateProduct",
  async ({ id, productData }, thunkAPI) => {
    try {
      return await updateProductAPI({
        id,
        productData,
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

/* =====================================================
   DELETE PRODUCT
===================================================== */

export const deleteProduct = createAsyncThunk(
  "adminProduct/deleteProduct",
  async (id, thunkAPI) => {
    try {
      return await deleteProductAPI(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);
/* =====================================================
   LOW STOCK PRODUCTS
===================================================== */

export const getLowStockProducts = createAsyncThunk(
  "adminProduct/getLowStockProducts",
  async (_, thunkAPI) => {
    try {
      return await getLowStockProductsAPI();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

/* =====================================================
   FEATURED PRODUCTS
===================================================== */

export const getFeaturedProducts = createAsyncThunk(
  "adminProduct/getFeaturedProducts",
  async (_, thunkAPI) => {
    try {
      return await getFeaturedProductsAPI();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

/* =====================================================
   LATEST PRODUCTS
===================================================== */

export const getLatestProducts = createAsyncThunk(
  "adminProduct/getLatestProducts",
  async (_, thunkAPI) => {
    try {
      return await getLatestProductsAPI();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

/* =====================================================
   BEST SELLER PRODUCTS
===================================================== */

export const getBestSellerProducts = createAsyncThunk(
  "adminProduct/getBestSellerProducts",
  async (_, thunkAPI) => {
    try {
      return await getBestSellerProductsAPI();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

/* =====================================================
   RELATED PRODUCTS
===================================================== */

export const getRelatedProducts = createAsyncThunk(
  "adminProduct/getRelatedProducts",
  async (id, thunkAPI) => {
    try {
      return await getRelatedProductsAPI(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

/* =====================================================
   PRODUCT STATS
===================================================== */

export const getProductStats = createAsyncThunk(
  "adminProduct/getProductStats",
  async (_, thunkAPI) => {
    try {
      return await getProductStatsAPI();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);