import { createSlice } from "@reduxjs/toolkit";

import {
  getProducts,
  getProductBySlug,
  getProductById,
  searchProducts,
  filterProducts,
  getFeaturedProducts,
  getLatestProducts,
  getTrendingProducts,
  getBestSellerProducts,
  getRelatedProducts,
  addReview,
  updateReview,
  deleteReview,
} from "./productThunk";

const initialState = {
  // Product List
  products: [],

  // Product Details
  product: null,

  // Home Products
  featuredProducts: [],
  latestProducts: [],
  trendingProducts: [],
  bestSellerProducts: [],
  relatedProducts: [],

  // Pagination
  currentPage: 1,
  totalPages: 1,
  totalProducts: 0,
  limit: 12,

  // Status
  loading: false,
  success: false,
  error: null,
  message: "",
};

const productSlice = createSlice({
  name: "product",

  initialState,

  reducers: {
    clearProductState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.message = "";
    },

    clearSelectedProduct: (state) => {
      state.product = null;
    },
  },

  extraReducers: (builder) => {
    builder

      /* ==========================================
         GET PRODUCTS
      ========================================== */

      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        state.products =
          action.payload?.products || [];

        state.currentPage =
          action.payload?.currentPage || 1;

        state.totalPages =
          action.payload?.totalPages || 1;

        state.totalProducts =
          action.payload?.totalProducts || 0;

        state.limit =
          action.payload?.limit || 12;
      })

      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.success = false;

        state.error =
          action.payload ||
          action.error?.message;
      })

      /* ==========================================
         GET PRODUCT BY SLUG
      ========================================== */

      .addCase(getProductBySlug.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getProductBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        state.product =
          action.payload?.product || null;
      })

      .addCase(getProductBySlug.rejected, (state, action) => {
        state.loading = false;
        state.success = false;

        state.error =
          action.payload ||
          action.error?.message;
      })

      /* ==========================================
         GET PRODUCT BY ID
      ========================================== */

      .addCase(getProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        state.product =
          action.payload?.product || null;
      })

      .addCase(getProductById.rejected, (state, action) => {
        state.loading = false;
        state.success = false;

        state.error =
          action.payload ||
          action.error?.message;
      })

            /* ==========================================
         SEARCH PRODUCTS
      ========================================== */

      .addCase(searchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(searchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        state.products =
          action.payload?.products || [];

        state.currentPage =
          action.payload?.currentPage || 1;

        state.totalPages =
          action.payload?.totalPages || 1;

        state.totalProducts =
          action.payload?.totalProducts ||
          action.payload?.count ||
          0;
      })

      .addCase(searchProducts.rejected, (state, action) => {
        state.loading = false;
        state.success = false;

        state.error =
          action.payload ||
          action.error?.message;
      })

      /* ==========================================
         FILTER PRODUCTS
      ========================================== */

      .addCase(filterProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(filterProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        state.products =
          action.payload?.products || [];

        state.currentPage =
          action.payload?.currentPage || 1;

        state.totalPages =
          action.payload?.totalPages || 1;

        state.totalProducts =
          action.payload?.totalProducts || 0;

        state.limit =
          action.payload?.limit || 12;
      })

      .addCase(filterProducts.rejected, (state, action) => {
        state.loading = false;
        state.success = false;

        state.error =
          action.payload ||
          action.error?.message;
      })

      /* ==========================================
         FEATURED PRODUCTS
      ========================================== */

      .addCase(getFeaturedProducts.pending, (state) => {
        state.loading = true;
      })

      .addCase(getFeaturedProducts.fulfilled, (state, action) => {
        state.loading = false;

        state.featuredProducts =
          action.payload?.products || [];
      })

      .addCase(getFeaturedProducts.rejected, (state, action) => {
        state.loading = false;

        state.error =
          action.payload ||
          action.error?.message;
      })

      /* ==========================================
         LATEST PRODUCTS
      ========================================== */

      .addCase(getLatestProducts.pending, (state) => {
        state.loading = true;
      })

      .addCase(getLatestProducts.fulfilled, (state, action) => {
        state.loading = false;

        state.latestProducts =
          action.payload?.products || [];
      })

      .addCase(getLatestProducts.rejected, (state, action) => {
        state.loading = false;

        state.error =
          action.payload ||
          action.error?.message;
      })

      /* ==========================================
         TRENDING PRODUCTS
      ========================================== */

      .addCase(getTrendingProducts.pending, (state) => {
        state.loading = true;
      })

      .addCase(getTrendingProducts.fulfilled, (state, action) => {
        state.loading = false;

        state.trendingProducts =
          action.payload?.products || [];
      })

      .addCase(getTrendingProducts.rejected, (state, action) => {
        state.loading = false;

        state.error =
          action.payload ||
          action.error?.message;
      })

      /* ==========================================
         BEST SELLER PRODUCTS
      ========================================== */

      .addCase(getBestSellerProducts.pending, (state) => {
        state.loading = true;
      })

      .addCase(getBestSellerProducts.fulfilled, (state, action) => {
        state.loading = false;

        state.bestSellerProducts =
          action.payload?.products || [];
      })

      .addCase(getBestSellerProducts.rejected, (state, action) => {
        state.loading = false;

        state.error =
          action.payload ||
          action.error?.message;
      })

      /* ==========================================
         RELATED PRODUCTS
      ========================================== */

      .addCase(getRelatedProducts.pending, (state) => {
        state.loading = true;
      })

      .addCase(getRelatedProducts.fulfilled, (state, action) => {
        state.loading = false;

        state.relatedProducts =
          action.payload?.products || [];
      })

      .addCase(getRelatedProducts.rejected, (state, action) => {
        state.loading = false;

        state.error =
          action.payload ||
          action.error?.message;
      })
            /* ==========================================
         ADD REVIEW
      ========================================== */

      .addCase(addReview.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.message = "";
      })

      .addCase(addReview.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        state.message =
          action.payload?.message ||
          "Review added successfully.";

        if (action.payload?.product) {
          state.product = action.payload.product;
        }
      })

      .addCase(addReview.rejected, (state, action) => {
        state.loading = false;
        state.success = false;

        state.error =
          action.payload ||
          action.error?.message ||
          "Failed to add review.";
      })

      /* ==========================================
         UPDATE REVIEW
      ========================================== */

      .addCase(updateReview.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.message = "";
      })

      .addCase(updateReview.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        state.message =
          action.payload?.message ||
          "Review updated successfully.";

        if (action.payload?.product) {
          state.product = action.payload.product;
        }
      })

      .addCase(updateReview.rejected, (state, action) => {
        state.loading = false;
        state.success = false;

        state.error =
          action.payload ||
          action.error?.message ||
          "Failed to update review.";
      })

      /* ==========================================
         DELETE REVIEW
      ========================================== */

      .addCase(deleteReview.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.message = "";
      })

      .addCase(deleteReview.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        state.message =
          action.payload?.message ||
          "Review deleted successfully.";

        if (action.payload?.product) {
          state.product = action.payload.product;
        }
      })

      .addCase(deleteReview.rejected, (state, action) => {
        state.loading = false;
        state.success = false;

        state.error =
          action.payload ||
          action.error?.message ||
          "Failed to delete review.";
      });
  },
});

export const {
  clearProductState,
  clearSelectedProduct,
} = productSlice.actions;

export default productSlice.reducer;