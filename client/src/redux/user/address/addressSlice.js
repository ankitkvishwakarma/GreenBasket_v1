import { createSlice } from "@reduxjs/toolkit";

import {
  getAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} from "./addressThunk";

const initialState = {
  addresses: [],
  loading: false,
  error: null,
  selectedAddress: null,
};

const addressSlice = createSlice({
  name: "address",

  initialState,

  reducers: {
    clearAddressError: (state) => {
      state.error = null;
    },

    clearSelectedAddress: (state) => {
      state.selectedAddress = null;
    },

    setSelectedAddress: (state, action) => {
      state.selectedAddress = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder

      // ====================================
      // GET ADDRESSES
      // ====================================

      .addCase(getAddresses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getAddresses.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = action.payload;
      })

      .addCase(getAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ====================================
      // CREATE ADDRESS
      // ====================================

      .addCase(createAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses.unshift(action.payload);
      })

      .addCase(createAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ====================================
      // UPDATE ADDRESS
      // ====================================

      .addCase(updateAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateAddress.fulfilled, (state, action) => {
        state.loading = false;

        state.addresses = state.addresses.map((address) =>
          address._id === action.payload._id
            ? action.payload
            : address
        );
      })

      .addCase(updateAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ====================================
      // DELETE ADDRESS
      // ====================================

      .addCase(deleteAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.loading = false;

        state.addresses = state.addresses.filter(
          (address) => address._id !== action.payload
        );
      })

      .addCase(deleteAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ====================================
      // SET DEFAULT ADDRESS
      // ====================================

      .addCase(setDefaultAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(setDefaultAddress.fulfilled, (state, action) => {
        state.loading = false;

        state.addresses = state.addresses.map((address) => ({
          ...address,
          isDefault:
            address._id === action.payload._id,
        }));
      })

      .addCase(setDefaultAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearAddressError,
  clearSelectedAddress,
  setSelectedAddress,
} = addressSlice.actions;

export default addressSlice.reducer;