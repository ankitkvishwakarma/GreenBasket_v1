import { createAsyncThunk } from "@reduxjs/toolkit";
import orderService from "./orderService";

// ======================================================
// Place Order
// ======================================================

export const placeOrder = createAsyncThunk(
  "order/placeOrder",
  async (payload, thunkAPI) => {
    try {
      return await orderService.placeOrder(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to place order."
      );
    }
  }
);

// ======================================================
// Get My Orders
// ======================================================

export const getMyOrders = createAsyncThunk(
  "order/getMyOrders",
  async (_, thunkAPI) => {
    try {
      return await orderService.getMyOrders();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch orders."
      );
    }
  }
);

// ======================================================
// Get Single Order
// ======================================================

export const getOrderById = createAsyncThunk(
  "order/getOrderById",
  async (orderId, thunkAPI) => {
    try {
      return await orderService.getOrderById(orderId);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch order."
      );
    }
  }
);

// ======================================================
// Cancel Order
// ======================================================

export const cancelOrder = createAsyncThunk(
  "order/cancelOrder",
  async (orderId, thunkAPI) => {
    try {
      return await orderService.cancelOrder(orderId);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to cancel order."
      );
    }
  }
);

// ======================================================
// Download Invoice
// ======================================================

export const downloadInvoice = createAsyncThunk(
  "order/downloadInvoice",
  async (orderId, thunkAPI) => {
    try {
      return await orderService.downloadInvoice(orderId);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to download invoice."
      );
    }
  }
);