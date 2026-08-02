import { createAsyncThunk } from "@reduxjs/toolkit";
import deliveryService from "./deliveryService";

/* ===========================================
   Get All Delivery Boys
=========================================== */

export const getDeliveryBoys = createAsyncThunk(
  "delivery/getDeliveryBoys",
  async (_, thunkAPI) => {
    try {
      return await deliveryService.getDeliveryBoys();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

/* ===========================================
   Get Delivery Boy By Id
=========================================== */

export const getDeliveryBoyById = createAsyncThunk(
  "delivery/getDeliveryBoyById",
  async (id, thunkAPI) => {
    try {
      return await deliveryService.getDeliveryBoyById(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

/* ===========================================
   Register Delivery Boy
=========================================== */

export const registerDeliveryBoy = createAsyncThunk(
  "delivery/registerDeliveryBoy",
  async (formData, thunkAPI) => {
    try {
      return await deliveryService.registerDeliveryBoy(formData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

/* ===========================================
   Update Delivery Boy
=========================================== */

export const updateDeliveryBoy = createAsyncThunk(
  "delivery/updateDeliveryBoy",
  async ({ id, formData }, thunkAPI) => {
    try {
      return await deliveryService.updateDeliveryBoy(id, formData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

/* ===========================================
   Delete Delivery Boy
=========================================== */

export const deleteDeliveryBoy = createAsyncThunk(
  "delivery/deleteDeliveryBoy",
  async (id, thunkAPI) => {
    try {
      return await deliveryService.deleteDeliveryBoy(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

/* ===========================================
   Verify Delivery Boy
=========================================== */

export const verifyDeliveryBoy = createAsyncThunk(
  "delivery/verifyDeliveryBoy",
  async (id, thunkAPI) => {
    try {
      return await deliveryService.verifyDeliveryBoy(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

/* ===========================================
   Update Availability
=========================================== */

export const updateAvailability = createAsyncThunk(
  "delivery/updateAvailability",
  async ({ id, isAvailable }, thunkAPI) => {
    try {
      return await deliveryService.toggleAvailability(id, isAvailable);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

/* ===========================================
   Assign Delivery Boy
=========================================== */

export const assignDeliveryBoy = createAsyncThunk(
  "delivery/assignDeliveryBoy",
  async (payload, thunkAPI) => {
    try {
      return await deliveryService.assignOrder(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

/* ===========================================
   Get Delivery Location
=========================================== */

export const getDeliveryLocation = createAsyncThunk(
  "delivery/getDeliveryLocation",
  async (id, thunkAPI) => {
    try {
      return await deliveryService.getLiveLocation(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);