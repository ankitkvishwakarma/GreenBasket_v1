import { createSlice } from "@reduxjs/toolkit";

import {
  getCoupons,
  getCouponById,
  createCoupon,
  updateCoupon,
  deleteCoupon,
} from "./couponThunk";

const initialState = {
  coupons: [],
  selectedCoupon: null,

  loading: false,
  success: false,
  error: false,
  message: "",
};

const couponSlice = createSlice({
  name: "coupon",

  initialState,

  reducers: {
    resetCouponState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = false;
      state.message = "";
    },

    clearSelectedCoupon: (state) => {
      state.selectedCoupon = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ==========================
      // Get All Coupons
      // ==========================
      .addCase(getCoupons.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCoupons.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.coupons = action.payload.coupons || [];
      })
      .addCase(getCoupons.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })

      // ==========================
      // Get Coupon By ID
      // ==========================
      .addCase(getCouponById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCouponById.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.selectedCoupon = action.payload.coupon;
      })
      .addCase(getCouponById.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })

      // ==========================
      // Create Coupon
      // ==========================
      .addCase(createCoupon.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;

        state.coupons.unshift(action.payload.coupon);
      })
      .addCase(createCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })

      // ==========================
      // Update Coupon
      // ==========================
      .addCase(updateCoupon.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;

        state.coupons = state.coupons.map((coupon) =>
          coupon._id === action.payload.coupon._id
            ? action.payload.coupon
            : coupon
        );

        state.selectedCoupon = action.payload.coupon;
      })
      .addCase(updateCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })

      // ==========================
      // Delete Coupon
      // ==========================
      .addCase(deleteCoupon.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      })
      .addCase(deleteCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      });
  },
});

export const {
  resetCouponState,
  clearSelectedCoupon,
} = couponSlice.actions;

export default couponSlice.reducer;