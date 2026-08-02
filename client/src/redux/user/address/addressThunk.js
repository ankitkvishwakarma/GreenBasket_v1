import { createAsyncThunk } from "@reduxjs/toolkit";
import addressService from "./addressService";

// ===============================
// Get All Addresses
// ===============================

export const getAddresses = createAsyncThunk(
  "address/getAddresses",
  async (_, thunkAPI) => {
    try {
      const response = await addressService.getAddresses();

      return response.addresses;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message
      );
    }
  }
);

// ===============================
// Create Address
// ===============================

export const createAddress = createAsyncThunk(
  "address/createAddress",
  async (addressData, thunkAPI) => {
    try {
      const response =
        await addressService.createAddress(
          addressData
        );

      return response.address;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message
      );
    }
  }
);

// ===============================
// Update Address
// ===============================

export const updateAddress = createAsyncThunk(
  "address/updateAddress",
  async ({ id, data }, thunkAPI) => {
    try {
      const response =
        await addressService.updateAddress({
          id,
          data,
        });

      return response.address;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message
      );
    }
  }
);

// ===============================
// Delete Address
// ===============================

export const deleteAddress = createAsyncThunk(
  "address/deleteAddress",
  async (id, thunkAPI) => {
    try {
      await addressService.deleteAddress(id);

      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message
      );
    }
  }
);

// ===============================
// Set Default Address
// ===============================

export const setDefaultAddress = createAsyncThunk(
  "address/setDefaultAddress",
  async (id, thunkAPI) => {
    try {
      const response =
        await addressService.setDefaultAddress(
          id
        );

      return response.address;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message
      );
    }
  }
);