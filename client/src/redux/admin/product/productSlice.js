import { createSlice } from "@reduxjs/toolkit";

import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getLowStockProducts,
  getFeaturedProducts,
  getLatestProducts,
  getBestSellerProducts,
  getRelatedProducts,
  getProductStats,
} from "./productThunk";

const initialState = {
  // Product List
  products: [],
  product: null,

  // Dashboard Data
  lowStockProducts: [],
  featuredProducts: [],
  latestProducts: [],
  bestSellerProducts: [],
  relatedProducts: [],
  productStats: null,

  // Pagination
  totalProducts: 0,
  currentPage: 1,
  totalPages: 1,
  limit: 10,

  // Status
  loading: false,
  success: false,
  error: null,
  message: "",
};

const productSlice = createSlice({
  name: "adminProduct",

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

        state.totalProducts =
          action.payload?.totalProducts || 0;

        state.currentPage =
          action.payload?.currentPage || 1;

        state.totalPages =
          action.payload?.totalPages || 1;

        state.limit =
          action.payload?.limit || 10;
      })

      .addCase(getProducts.rejected, (state, action) => {
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
         CREATE PRODUCT
      ========================================== */

      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.message = "";
      })

      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        state.message =
          action.payload?.message ||
          "Product created successfully.";

        if (action.payload?.product) {
          state.products.unshift(action.payload.product);
        }
      })

      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.success = false;

        state.error =
          action.payload ||
          action.error?.message ||
          "Failed to create product.";
      })

      /* ==========================================
         UPDATE PRODUCT
      ========================================== */

      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.message = "";
      })

      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        state.message =
          action.payload?.message ||
          "Product updated successfully.";

        if (action.payload?.product) {
          state.product = action.payload.product;

          state.products = state.products.map((item) =>
            item._id === action.payload.product._id
              ? action.payload.product
              : item
          );
        }
      })

      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.success = false;

        state.error =
          action.payload ||
          action.error?.message ||
          "Failed to update product.";
      })

      /* ==========================================
         DELETE PRODUCT
      ========================================== */

      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.message = "";
      })

      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        state.message =
          action.payload?.message ||
          "Product deleted successfully.";

        if (action.meta?.arg) {
          state.products = state.products.filter(
            (item) => item._id !== action.meta.arg
          );
        }
      })

      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.success = false;

        state.error =
          action.payload ||
          action.error?.message ||
          "Failed to delete product.";
      })
            /* ==========================================
         LOW STOCK PRODUCTS
      ========================================== */

      .addCase(getLowStockProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getLowStockProducts.fulfilled, (state, action) => {
        state.loading = false;

        state.lowStockProducts =
          action.payload?.products || [];
      })

      .addCase(getLowStockProducts.rejected, (state, action) => {
        state.loading = false;

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
         PRODUCT STATS
      ========================================== */

      .addCase(getProductStats.pending, (state) => {
        state.loading = true;
      })

      .addCase(getProductStats.fulfilled, (state, action) => {
        state.loading = false;

        state.productStats =
          action.payload?.stats ||
          action.payload ||
          null;
      })

      .addCase(getProductStats.rejected, (state, action) => {
        state.loading = false;

        state.error =
          action.payload ||
          action.error?.message;
      });
  },
});

export const {
  clearProductState,
  clearSelectedProduct,
} = productSlice.actions;

export default productSlice.reducer;