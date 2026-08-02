import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getCouponsAPI,
  getCouponByIdAPI,
  createCouponAPI,
  updateCouponAPI,
  deleteCouponAPI,
} from "./couponService";

// ======================================
// Get All Coupons
// ======================================
export const getCoupons = createAsyncThunk(
  "coupon/getCoupons",
  async (_, thunkAPI) => {
    try {
      return await getCouponsAPI();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// ======================================
// Get Coupon By ID
// ======================================
export const getCouponById = createAsyncThunk(
  "coupon/getCouponById",
  async (id, thunkAPI) => {
    try {
      return await getCouponByIdAPI(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// ======================================
// Create Coupon
// ======================================
export const createCoupon = createAsyncThunk(
  "coupon/createCoupon",
  async (couponData, thunkAPI) => {
    try {
      return await createCouponAPI(couponData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// ======================================
// Update Coupon
// ======================================
export const updateCoupon = createAsyncThunk(
  "coupon/updateCoupon",
  async ({ id, couponData }, thunkAPI) => {
    try {
      return await updateCouponAPI({
        id,
        couponData,
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// ======================================
// Delete Coupon
// ======================================
export const deleteCoupon = createAsyncThunk(
  "coupon/deleteCoupon",
  async (id, thunkAPI) => {
    try {
      return await deleteCouponAPI(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);