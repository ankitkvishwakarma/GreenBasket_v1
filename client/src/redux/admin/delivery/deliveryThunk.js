import { createAsyncThunk } from "@reduxjs/toolkit";
import deliveryService from "./deliveryService";

// ==========================================
// GET ALL DELIVERY BOYS
// ==========================================

export const getDeliveryBoys = createAsyncThunk(
  "delivery/getDeliveryBoys",
  async (params = {}, thunkAPI) => {
    try {
      return await deliveryService.getDeliveryBoys(params);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch delivery boys"
      );
    }
  }
);

// ==========================================
// GET DELIVERY BOY BY ID
// ==========================================

export const getDeliveryBoyById = createAsyncThunk(
  "delivery/getDeliveryBoyById",
  async (id, thunkAPI) => {
    try {
      return await deliveryService.getDeliveryBoyById(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch delivery boy"
      );
    }
  }
);

// ==========================================
// REGISTER DELIVERY BOY
// ==========================================

export const registerDeliveryBoy = createAsyncThunk(
  "delivery/registerDeliveryBoy",
  async (formData, thunkAPI) => {
    try {
      return await deliveryService.registerDeliveryBoy(
        formData
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to register delivery boy"
      );
    }
  }
);

// ==========================================
// UPDATE DELIVERY BOY
// ==========================================

export const updateDeliveryBoy = createAsyncThunk(
  "delivery/updateDeliveryBoy",
  async ({ id, formData }, thunkAPI) => {
    try {
      return await deliveryService.updateDeliveryBoy(
        id,
        formData
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to update delivery boy"
      );
    }
  }
);

// ==========================================
// VERIFY DELIVERY BOY
// ==========================================

export const verifyDeliveryBoy = createAsyncThunk(
  "delivery/verifyDeliveryBoy",
  async (id, thunkAPI) => {
    try {
      return await deliveryService.verifyDeliveryBoy(
        id
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to verify delivery boy"
      );
    }
  }
);

// ==========================================
// UPDATE AVAILABILITY
// ==========================================

export const updateAvailability = createAsyncThunk(
  "delivery/updateAvailability",
  async ({ id, isAvailable }, thunkAPI) => {
    try {
      return await deliveryService.updateAvailability({
        id,
        isAvailable,
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to update availability"
      );
    }
  }
);

// ==========================================
// DELETE DELIVERY BOY
// ==========================================

export const deleteDeliveryBoy = createAsyncThunk(
  "delivery/deleteDeliveryBoy",
  async (id, thunkAPI) => {
    try {
      await deliveryService.deleteDeliveryBoy(id);

      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to delete delivery boy"
      );
    }
  }
);

// ==========================================
// ASSIGN DELIVERY BOY
// ==========================================

export const assignDeliveryBoy = createAsyncThunk(
  "delivery/assignDeliveryBoy",
  async (
    { orderId, deliveryBoyId },
    thunkAPI
  ) => {
    try {
      return await deliveryService.assignDeliveryBoy({
        orderId,
        deliveryBoyId,
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to assign delivery boy"
      );
    }
  }
);

// ==========================================
// GET DELIVERY LOCATION
// ==========================================

export const getDeliveryLocation = createAsyncThunk(
  "delivery/getDeliveryLocation",
  async (id, thunkAPI) => {
    try {
      return await deliveryService.getDeliveryLocation(
        id
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch delivery location"
      );
    }
  }
);