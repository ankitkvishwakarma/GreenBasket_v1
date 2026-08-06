import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getProductsAPI,
  getProductBySlugAPI,
  getProductByIdAPI,
  searchProductsAPI,
  filterProductsAPI,
  getFeaturedProductsAPI,
  getLatestProductsAPI,
  getTrendingProductsAPI,
  getBestSellerProductsAPI,
  getRelatedProductsAPI,
  addReviewAPI,
  updateReviewAPI,
  deleteReviewAPI,
} from "./productService";

/* =====================================================
   GET PRODUCTS
===================================================== */

export const getProducts = createAsyncThunk(
  "product/getProducts",
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
   GET PRODUCT BY SLUG
===================================================== */

export const getProductBySlug = createAsyncThunk(
  "product/getProductBySlug",
  async (slug, thunkAPI) => {
    try {
      return await getProductBySlugAPI(slug);
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
  "product/getProductById",
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
   SEARCH PRODUCTS
===================================================== */

export const searchProducts = createAsyncThunk(
  "product/searchProducts",
  async (keyword, thunkAPI) => {
    try {
      return await searchProductsAPI(keyword);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

/* =====================================================
   FILTER PRODUCTS
===================================================== */

export const filterProducts = createAsyncThunk(
  "product/filterProducts",
  async (filters = {}, thunkAPI) => {
    try {
      return await filterProductsAPI(filters);
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
  "product/getFeaturedProducts",
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
  "product/getLatestProducts",
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
   TRENDING PRODUCTS
===================================================== */

export const getTrendingProducts = createAsyncThunk(
  "product/getTrendingProducts",
  async (_, thunkAPI) => {
    try {
      return await getTrendingProductsAPI();
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
  "product/getBestSellerProducts",
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
  "product/getRelatedProducts",
  async (productId, thunkAPI) => {
    try {
      return await getRelatedProductsAPI(productId);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

/* =====================================================
   ADD REVIEW
===================================================== */

export const addReview = createAsyncThunk(
  "product/addReview",
  async ({ productId, reviewData }, thunkAPI) => {
    try {
      return await addReviewAPI(
        productId,
        reviewData
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

/* =====================================================
   UPDATE REVIEW
===================================================== */

export const updateReview = createAsyncThunk(
  "product/updateReview",
  async ({ productId, reviewData }, thunkAPI) => {
    try {
      return await updateReviewAPI(
        productId,
        reviewData
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

/* =====================================================
   DELETE REVIEW
===================================================== */

export const deleteReview = createAsyncThunk(
  "product/deleteReview",
  async (productId, thunkAPI) => {
    try {
      return await deleteReviewAPI(productId);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);