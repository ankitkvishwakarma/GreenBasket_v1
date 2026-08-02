import { createSlice } from "@reduxjs/toolkit";
import {
  fetchOrders,
  fetchOrderById,
  updateOrderStatus,
} from "./orderThunk";

const initialState = {
  orders: [],
  order: null,

  loading: false,
  success: false,
  error: null,

  totalOrders: 0,
};

const orderSlice = createSlice({
  name: "order",
  initialState,

  reducers: {
    clearOrder: (state) => {
      state.order = null;
    },

    clearOrderError: (state) => {
      state.error = null;
    },

    resetOrderState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ==============================
      // Fetch Orders
      // ==============================

      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        state.orders = action.payload.orders || [];
        state.totalOrders = action.payload.count || 0;
      })

      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ==============================
      // Fetch Single Order
      // ==============================

      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.order;
      })

      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ==============================
      // Update Status
      // ==============================

      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;

        const updatedOrder =
          action.payload.data || action.payload.order;

        state.order = updatedOrder;

        state.orders = state.orders.map((item) =>
          item._id === updatedOrder._id
            ? updatedOrder
            : item
        );
      })

      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearOrder,
  clearOrderError,
  resetOrderState,
} = orderSlice.actions;

export default orderSlice.reducer;