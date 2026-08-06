import { createSlice } from "@reduxjs/toolkit";

import {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
  getCartSummary,
} from "@/redux/cart/cartThunk.js";

const initialState = {
  cart: null,

  items: [],

  totalItems: 0,

  totalPrice: 0,

  summary: {
    subtotal: 0,
    deliveryCharge: 0,
    platformFee: 0,
    discount: 0,
    grandTotal: 0,
  },

  loading: false,

  success: false,

  error: null,

  message: "",
};

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    clearCartState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.message = "";
    },
  },

  extraReducers: (builder) => {
    builder;

    /* ==========================================
       GET CART
    ========================================== */

    builder
      .addCase(getCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getCart.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        const cart = action.payload.cart;

        state.cart = cart;

        state.items = cart?.items || [];

        state.totalItems =
          cart?.totalItems || 0;

        state.totalPrice =
          cart?.totalPrice || 0;
      })

      .addCase(getCart.rejected, (state, action) => {
        state.loading = false;

        state.error =
          action.payload ||
          action.error.message;
      });

    /* ==========================================
       ADD TO CART
    ========================================== */

    builder
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })

      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;

        state.success = true;

        state.message =
          action.payload.message;

        const cart = action.payload.cart;

        state.cart = cart;

        state.items = cart.items;

        state.totalItems =
          cart.totalItems;

        state.totalPrice =
          cart.totalPrice;
      })

      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;

        state.error =
          action.payload ||
          action.error.message;
      });

    /* ==========================================
       UPDATE CART
    ========================================== */

    builder
      .addCase(updateCartItem.pending, (state) => {
        state.loading = true;
      })

      .addCase(
        updateCartItem.fulfilled,
        (state, action) => {
          state.loading = false;

          state.success = true;

          state.message =
            action.payload.message;

          const cart = action.payload.cart;

          state.cart = cart;

          state.items = cart.items;

          state.totalItems =
            cart.totalItems;

          state.totalPrice =
            cart.totalPrice;
        }
      )

      .addCase(
        updateCartItem.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload ||
            action.error.message;
        }
      );

    /* ==========================================
       REMOVE ITEM
    ========================================== */

    builder
      .addCase(removeCartItem.pending, (state) => {
        state.loading = true;
      })

      .addCase(
        removeCartItem.fulfilled,
        (state, action) => {
          state.loading = false;

          state.success = true;

          state.message =
            action.payload.message;

          const cart = action.payload.cart;

          state.cart = cart;

          state.items = cart.items;

          state.totalItems =
            cart.totalItems;

          state.totalPrice =
            cart.totalPrice;
        }
      )

      .addCase(
        removeCartItem.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload ||
            action.error.message;
        }
      );

    /* ==========================================
       CLEAR CART
    ========================================== */

    builder
      .addCase(clearCart.pending, (state) => {
        state.loading = true;
      })

      .addCase(clearCart.fulfilled, (state, action) => {
        state.loading = false;

        state.success = true;

        state.message =
          action.payload.message;

        const cart = action.payload.cart;

        state.cart = cart;

        state.items = [];

        state.totalItems = 0;

        state.totalPrice = 0;
      })

      .addCase(clearCart.rejected, (state, action) => {
        state.loading = false;

        state.error =
          action.payload ||
          action.error.message;
      });

    /* ==========================================
       CART SUMMARY
    ========================================== */

    builder
      .addCase(getCartSummary.pending, (state) => {
        state.loading = true;
      })

      .addCase(
        getCartSummary.fulfilled,
        (state, action) => {
          state.loading = false;

          state.summary =
            action.payload.summary;
        }
      )

      .addCase(
        getCartSummary.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload ||
            action.error.message;
        }
      );
  },
});

export const {
  clearCartState,
} = cartSlice.actions;

export default cartSlice.reducer;