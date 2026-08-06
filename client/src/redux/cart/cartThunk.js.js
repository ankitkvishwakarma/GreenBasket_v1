import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getCartAPI,
  addToCartAPI,
  updateCartItemAPI,
  removeCartItemAPI,
  clearCartAPI,
  getCartSummaryAPI,
} from "@/redux/cart/cartService.js";

/* ==========================================
   GET CART
========================================== */

export const getCart = createAsyncThunk(
  "cart/getCart",
  async (_, thunkAPI) => {
    try {
      return await getCartAPI();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message
      );
    }
  }
);

/* ==========================================
   ADD TO CART
========================================== */

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (cartData, thunkAPI) => {
    try {
      return await addToCartAPI(cartData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message
      );
    }
  }
);

/* ==========================================
   UPDATE CART ITEM
========================================== */

export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async (cartData, thunkAPI) => {
    try {
      return await updateCartItemAPI(cartData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message
      );
    }
  }
);

/* ==========================================
   REMOVE CART ITEM
========================================== */

export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (productId, thunkAPI) => {
    try {
      return await removeCartItemAPI(productId);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message
      );
    }
  }
);

/* ==========================================
   CLEAR CART
========================================== */

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, thunkAPI) => {
    try {
      return await clearCartAPI();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message
      );
    }
  }
);

/* ==========================================
   CART SUMMARY
========================================== */

export const getCartSummary = createAsyncThunk(
  "cart/getCartSummary",
  async (_, thunkAPI) => {
    try {
      return await getCartSummaryAPI();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message
      );
    }
  }
);