
import { createSlice } from "@reduxjs/toolkit";
import {
  getDeliveryBoys,
  getDeliveryBoyById,
  registerDeliveryBoy,
  updateDeliveryBoy,
  verifyDeliveryBoy,
  updateAvailability,
  deleteDeliveryBoy,
  assignDeliveryBoy,
  getDeliveryLocation,
} from "./deliveryThunk";

const initialState = {
  deliveryBoys: [],
  deliveryBoy: null,
  currentLocation: null,

  page: 1,
  totalPages: 1,
  total: 0,

  loading: false,
  success: false,
  error: null,
  message: "",
};



const deliverySlice = createSlice({
  name: "delivery",
  initialState,

  reducers: {
    resetDeliveryState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.message = "";
      state.deliveryBoy = null;
      state.currentLocation = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getDeliveryBoys.pending, (state) => {
        state.loading = true;
      })

      .addCase(getDeliveryBoys.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        state.deliveryBoys =
          action.payload.deliveryBoys || [];

        state.page =
          action.payload.currentPage || 1;

        state.totalPages =
          action.payload.totalPages || 1;

        state.total =
          action.payload.total || 0;

        state.message =
          action.payload.message || "";
      })

      .addCase(getDeliveryBoys.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getDeliveryBoyById.pending, (state) => {
        state.loading = true;
      })

      .addCase(getDeliveryBoyById.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.deliveryBoy =
          action.payload.deliveryBoy;
      })

      .addCase(getDeliveryBoyById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // =============================
      // Register Delivery Boy
      // =============================
      .addCase(registerDeliveryBoy.pending, (state) => {
        state.loading = true;
      })

      .addCase(registerDeliveryBoy.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        const newDeliveryBoy = action.payload.deliveryBoy;

        if (newDeliveryBoy) {
          state.deliveryBoys.unshift(newDeliveryBoy);
          state.total += 1;
        }

        state.message = action.payload.message;
      })

      .addCase(registerDeliveryBoy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // =============================
      // Update Delivery Boy
      // =============================
      .addCase(updateDeliveryBoy.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateDeliveryBoy.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        const updated = action.payload.deliveryBoy;

        state.deliveryBoys = state.deliveryBoys.map((item) =>
          item._id === updated._id ? updated : item
        );

        if (
          state.deliveryBoy &&
          state.deliveryBoy._id === updated._id
        ) {
          state.deliveryBoy = updated;
        }

        state.message = action.payload.message;
      })

      .addCase(updateDeliveryBoy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // =============================
      // Verify Delivery Boy
      // =============================
      .addCase(verifyDeliveryBoy.pending, (state) => {
        state.loading = true;
      })

      .addCase(verifyDeliveryBoy.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        const updated = action.payload.deliveryBoy;

        state.deliveryBoys = state.deliveryBoys.map((item) =>
          item._id === updated._id ? updated : item
        );

        if (
          state.deliveryBoy &&
          state.deliveryBoy._id === updated._id
        ) {
          state.deliveryBoy = updated;
        }

        state.message = action.payload.message;
      })

      .addCase(verifyDeliveryBoy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // =============================
      // Update Availability
      // =============================
      .addCase(updateAvailability.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateAvailability.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        const updated = action.payload.deliveryBoy;

        state.deliveryBoys = state.deliveryBoys.map((item) =>
          item._id === updated._id ? updated : item
        );

        if (
          state.deliveryBoy &&
          state.deliveryBoy._id === updated._id
        ) {
          state.deliveryBoy = updated;
        }

        state.message = action.payload.message;
      })

      .addCase(updateAvailability.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // =============================
      // Delete Delivery Boy
      // =============================
      .addCase(deleteDeliveryBoy.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteDeliveryBoy.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        state.deliveryBoys = state.deliveryBoys.filter(
          (item) => item._id !== action.payload
        );

        state.total = Math.max(0, state.total - 1);

        state.message = "Delivery Boy deleted successfully";
      })

      .addCase(deleteDeliveryBoy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // =============================
      // Assign Delivery Boy
      // =============================
      .addCase(assignDeliveryBoy.pending, (state) => {
        state.loading = true;
      })

      .addCase(assignDeliveryBoy.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        state.message = action.payload.message;
      })

      .addCase(assignDeliveryBoy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // =============================
      // Get Delivery Location
      // =============================
      .addCase(getDeliveryLocation.pending, (state) => {
        state.loading = true;
      })

      .addCase(getDeliveryLocation.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        state.currentLocation =
          action.payload.currentLocation ||
          action.payload.location ||
          null;

        state.message = action.payload.message || "";
      })

      .addCase(getDeliveryLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetDeliveryState } =
  deliverySlice.actions;

export default deliverySlice.reducer;