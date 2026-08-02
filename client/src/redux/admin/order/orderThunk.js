import { createAsyncThunk } from "@reduxjs/toolkit";
import orderService from "./orderService";

// Get All Orders
export const fetchOrders = createAsyncThunk(
  "order/fetchOrders",
  async (params, thunkAPI) => {
    try {
      return await orderService.getOrders(params);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Get Order Details
export const fetchOrderById = createAsyncThunk(
  "order/fetchOrderById",
  async (id, thunkAPI) => {
    try {
      return await orderService.getOrderById(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Update Status
export const updateOrderStatus = createAsyncThunk(
  "order/updateOrderStatus",
  async ({ id, status }, thunkAPI) => {
    try {
      return await orderService.updateOrderStatus(id, status);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);