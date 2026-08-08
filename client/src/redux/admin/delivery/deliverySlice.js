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

    clearDeliveryError: (state) => {
      state.error = null;
    },

    clearDeliveryMessage: (state) => {
      state.message = "";
    },
  },

  extraReducers: (builder) => {
    builder

      // ==========================================
      // GET ALL DELIVERY BOYS
      // ==========================================

      .addCase(
        getDeliveryBoys.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        getDeliveryBoys.fulfilled,
        (state, action) => {
          state.loading = false;
          state.success = true;

          state.deliveryBoys =
            action.payload?.deliveryBoys || [];

          state.page =
            action.payload?.currentPage || 1;

          state.totalPages =
            action.payload?.totalPages || 1;

          state.total =
            action.payload?.total || 0;

          state.message =
            action.payload?.message || "";
        }
      )

      .addCase(
        getDeliveryBoys.rejected,
        (state, action) => {
          state.loading = false;
          state.success = false;
          state.error = action.payload;
        }
      )

      // ==========================================
      // GET DELIVERY BOY BY ID
      // ==========================================

      .addCase(
        getDeliveryBoyById.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        getDeliveryBoyById.fulfilled,
        (state, action) => {
          state.loading = false;
          state.success = true;

          state.deliveryBoy =
            action.payload?.deliveryBoy || null;
        }
      )

      .addCase(
        getDeliveryBoyById.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      // ==========================================
      // REGISTER DELIVERY BOY
      // ==========================================

      .addCase(
        registerDeliveryBoy.pending,
        (state) => {
          state.loading = true;
          state.error = null;
          state.success = false;
        }
      )

      .addCase(
        registerDeliveryBoy.fulfilled,
        (state, action) => {
          state.loading = false;
          state.success = true;

          const deliveryBoy =
            action.payload?.deliveryBoy ||
            action.payload?.data;

          if (deliveryBoy) {
            state.deliveryBoys.unshift(
              deliveryBoy
            );

            state.total += 1;
          }

          state.message =
            action.payload?.message ||
            "Delivery Boy registered successfully.";
        }
      )

      .addCase(
        registerDeliveryBoy.rejected,
        (state, action) => {
          state.loading = false;
          state.success = false;
          state.error = action.payload;
        }
      )

      // ==========================================
      // UPDATE DELIVERY BOY
      // ==========================================

      .addCase(
        updateDeliveryBoy.pending,
        (state) => {
          state.loading = true;
          state.error = null;
          state.success = false;
        }
      )

      .addCase(
        updateDeliveryBoy.fulfilled,
        (state, action) => {
          state.loading = false;
          state.success = true;

          const updated =
            action.payload?.deliveryBoy;

          if (updated) {
            state.deliveryBoys =
              state.deliveryBoys.map(
                (item) =>
                  item._id === updated._id
                    ? updated
                    : item
              );

            if (
              state.deliveryBoy?._id ===
              updated._id
            ) {
              state.deliveryBoy = updated;
            }
          }

          state.message =
            action.payload?.message ||
            "Delivery Boy updated successfully.";
        }
      )

      .addCase(
        updateDeliveryBoy.rejected,
        (state, action) => {
          state.loading = false;
          state.success = false;
          state.error = action.payload;
        }
      )

      // ==========================================
      // VERIFY DELIVERY BOY
      // ==========================================

      .addCase(
        verifyDeliveryBoy.pending,
        (state) => {
          state.loading = true;
          state.error = null;
          state.success = false;
        }
      )

      .addCase(
        verifyDeliveryBoy.fulfilled,
        (state, action) => {
          state.loading = false;
          state.success = true;

          const updated =
            action.payload?.deliveryBoy;

          if (updated) {
            state.deliveryBoys =
              state.deliveryBoys.map(
                (item) =>
                  item._id === updated._id
                    ? updated
                    : item
              );

            if (
              state.deliveryBoy?._id ===
              updated._id
            ) {
              state.deliveryBoy = updated;
            }
          }

          state.message =
            action.payload?.message ||
            "Delivery Boy verified successfully.";
        }
      )

      .addCase(
        verifyDeliveryBoy.rejected,
        (state, action) => {
          state.loading = false;
          state.success = false;
          state.error = action.payload;
        }
      )

      // ==========================================
      // UPDATE AVAILABILITY
      // ==========================================

      .addCase(
        updateAvailability.pending,
        (state) => {
          state.loading = true;
          state.error = null;
          state.success = false;
        }
      )

      .addCase(
        updateAvailability.fulfilled,
        (state, action) => {
          state.loading = false;
          state.success = true;

          const updated =
            action.payload?.deliveryBoy;

          if (updated) {
            state.deliveryBoys =
              state.deliveryBoys.map(
                (item) =>
                  item._id === updated._id
                    ? updated
                    : item
              );

            if (
              state.deliveryBoy?._id ===
              updated._id
            ) {
              state.deliveryBoy = updated;
            }
          }

          state.message =
            action.payload?.message ||
            "Availability updated successfully.";
        }
      )

      .addCase(
        updateAvailability.rejected,
        (state, action) => {
          state.loading = false;
          state.success = false;
          state.error = action.payload;
        }
      )

      // ==========================================
      // DELETE DELIVERY BOY
      // ==========================================

      .addCase(
        deleteDeliveryBoy.pending,
        (state) => {
          state.loading = true;
          state.error = null;
          state.success = false;
        }
      )

      .addCase(
        deleteDeliveryBoy.fulfilled,
        (state, action) => {
          state.loading = false;
          state.success = true;

          state.deliveryBoys =
            state.deliveryBoys.filter(
              (item) =>
                item._id !== action.payload
            );

          state.total = Math.max(
            0,
            state.total - 1
          );

          if (
            state.deliveryBoy?._id ===
            action.payload
          ) {
            state.deliveryBoy = null;
          }

          state.message =
            "Delivery Boy deleted successfully.";
        }
      )

      .addCase(
        deleteDeliveryBoy.rejected,
        (state, action) => {
          state.loading = false;
          state.success = false;
          state.error = action.payload;
        }
      )

      // ==========================================
      // ASSIGN DELIVERY BOY
      // ==========================================

      .addCase(
        assignDeliveryBoy.pending,
        (state) => {
          state.loading = true;
          state.error = null;
          state.success = false;
        }
      )

      .addCase(
        assignDeliveryBoy.fulfilled,
        (state, action) => {
          state.loading = false;
          state.success = true;

          state.message =
            action.payload?.message ||
            "Delivery Boy assigned successfully.";
        }
      )

      .addCase(
        assignDeliveryBoy.rejected,
        (state, action) => {
          state.loading = false;
          state.success = false;
          state.error = action.payload;
        }
      )

      // ==========================================
      // GET DELIVERY LOCATION
      // ==========================================

      .addCase(
        getDeliveryLocation.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        getDeliveryLocation.fulfilled,
        (state, action) => {
          state.loading = false;
          state.success = true;

          state.currentLocation =
            action.payload?.location ||
            action.payload?.currentLocation ||
            null;

          state.message =
            action.payload?.message || "";
        }
      )

      .addCase(
        getDeliveryLocation.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const {
  resetDeliveryState,
  clearDeliveryError,
  clearDeliveryMessage,
} = deliverySlice.actions;

export default deliverySlice.reducer;