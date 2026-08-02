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
  products: [],
  selectedProduct: null,

  featuredProducts: [],
  latestProducts: [],
  bestSellerProducts: [],
  relatedProducts: [],
  lowStockProducts: [],

  productStats: {},

  loading: false,
  success: false,
  error: null,
  message: "",

  page: 1,
  totalPages: 1,
  totalProducts: 0,
};

const productSlice = createSlice({
  name: "product",

  initialState,

  reducers: {
    resetProductState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.message = "";
    },

    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ==========================
      // Get Products
      // ==========================
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products || [];
        state.page = action.payload.page || 1;
        state.totalPages =
          action.payload.totalPages || 1;
        state.totalProducts =
          action.payload.totalProducts || 0;
      })

      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ==========================
      // Get Product By ID
      // ==========================
      .addCase(
        getProductById.fulfilled,
        (state, action) => {
          state.selectedProduct =
            action.payload.product;
        }
      )

      // ==========================
      // Create Product
      // ==========================
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
      })

      .addCase(
        createProduct.fulfilled,
        (state, action) => {
          state.loading = false;
          state.success = true;
          state.message =
            action.payload.message;

          if (action.payload.product) {
            state.products.unshift(
              action.payload.product
            );
          }
        }
      )

      .addCase(
        createProduct.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      // ==========================
      // Update Product
      // ==========================
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })

      .addCase(
        updateProduct.fulfilled,
        (state, action) => {
          state.loading = false;
          state.success = true;
          state.message =
            action.payload.message;

          const index = state.products.findIndex(
            (item) =>
              item._id ===
              action.payload.product._id
          );

          if (index !== -1) {
            state.products[index] =
              action.payload.product;
          }

          state.selectedProduct =
            action.payload.product;
        }
      )

      .addCase(
        updateProduct.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      // ==========================
      // Delete Product
      // ==========================
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })

      .addCase(
        deleteProduct.fulfilled,
        (state, action) => {
          state.loading = false;
          state.success = true;
          state.message =
            action.payload.message;

          state.products = state.products.filter(
            (item) =>
              item._id !== action.meta.arg
          );
        }
      )

      .addCase(
        deleteProduct.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      // ==========================
      // Featured Products
      // ==========================
      .addCase(
        getFeaturedProducts.fulfilled,
        (state, action) => {
          state.featuredProducts =
            action.payload.products || [];
        }
      )

      // ==========================
      // Latest Products
      // ==========================
      .addCase(
        getLatestProducts.fulfilled,
        (state, action) => {
          state.latestProducts =
            action.payload.products || [];
        }
      )

      // ==========================
      // Best Seller Products
      // ==========================
      .addCase(
        getBestSellerProducts.fulfilled,
        (state, action) => {
          state.bestSellerProducts =
            action.payload.products || [];
        }
      )

      // ==========================
      // Related Products
      // ==========================
      .addCase(
        getRelatedProducts.fulfilled,
        (state, action) => {
          state.relatedProducts =
            action.payload.products || [];
        }
      )

      // ==========================
      // Low Stock Products
      // ==========================
      .addCase(
        getLowStockProducts.fulfilled,
        (state, action) => {
          state.lowStockProducts =
            action.payload.products || [];
        }
      )

      // ==========================
      // Product Stats
      // ==========================
      .addCase(
        getProductStats.fulfilled,
        (state, action) => {
          state.productStats =
            action.payload.stats || {};
        }
      );
  },
});

export const {
  resetProductState,
  clearSelectedProduct,
} = productSlice.actions;

export default productSlice.reducer;