import { createSlice } from "@reduxjs/toolkit";
import {
  placeOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
  downloadInvoice,
} from "./orderThunk";

const initialState = {
  orders: [],
  selectedOrder: null,

  loading: false,
  buttonLoading: false,

  success: false,
  error: null,
  message: "",

  invoice: null,
};

const orderSlice = createSlice({
  name: "order",

  initialState,

  reducers: {
    clearOrderState: (state) => {
      state.loading = false;
      state.buttonLoading = false;
      state.success = false;
      state.error = null;
      state.message = "";
    },

    clearSelectedOrder: (state) => {
      state.selectedOrder = null;
    },
  },

  extraReducers: (builder) => {
    builder;

    // ======================================
    // PLACE ORDER
    // ======================================

    builder
      .addCase(placeOrder.pending, (state) => {
        state.buttonLoading = true;
        state.error = null;
      })

      .addCase(placeOrder.fulfilled, (state, action) => {
        state.buttonLoading = false;
        state.success = true;
        state.message = action.payload.message;

        state.orders.unshift(action.payload.order);
      })

      .addCase(placeOrder.rejected, (state, action) => {
        state.buttonLoading = false;
        state.error = action.payload;
      });

    // ======================================
    // GET MY ORDERS
    // ======================================

    builder
      .addCase(getMyOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getMyOrders.fulfilled, (state, action) => {
        state.loading = false;

        state.orders = action.payload.orders;
      })

      .addCase(getMyOrders.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      });

    // ======================================
    // GET ORDER DETAILS
    // ======================================

    builder
      .addCase(getOrderById.pending, (state) => {
        state.loading = true;
      })

      .addCase(getOrderById.fulfilled, (state, action) => {
        state.loading = false;

        state.selectedOrder = action.payload.order;
      })

      .addCase(getOrderById.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      });

    // ======================================
    // CANCEL ORDER
    // ======================================

    builder
      .addCase(cancelOrder.pending, (state) => {
        state.buttonLoading = true;
      })

      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.buttonLoading = false;

        state.message = action.payload.message;

        const index = state.orders.findIndex(
          (item) => item._id === action.payload.order._id
        );

        if (index !== -1) {
          state.orders[index] = action.payload.order;
        }

        if (
          state.selectedOrder &&
          state.selectedOrder._id === action.payload.order._id
        ) {
          state.selectedOrder = action.payload.order;
        }
      })

      .addCase(cancelOrder.rejected, (state, action) => {
        state.buttonLoading = false;

        state.error = action.payload;
      });

    // ======================================
    // DOWNLOAD INVOICE
    // ======================================

    builder
      .addCase(downloadInvoice.pending, (state) => {
        state.buttonLoading = true;
      })

      .addCase(downloadInvoice.fulfilled, (state, action) => {
        state.buttonLoading = false;

        state.invoice = action.payload;
      })

      .addCase(downloadInvoice.rejected, (state, action) => {
        state.buttonLoading = false;

        state.error = action.payload;
      });
  },
});

export const {
  clearOrderState,
  clearSelectedOrder,
} = orderSlice.actions;

export default orderSlice.reducer;