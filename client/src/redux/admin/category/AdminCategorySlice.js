import { createSlice } from "@reduxjs/toolkit";

import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "./AdminCategoryThunk";

const initialState = {
  categories: [],
  category: null,

  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },

  loading: false,
  success: false,
  error: false,
  message: "",
};

const categorySlice = createSlice({
  name: "category",
  initialState,

  reducers: {
    resetCategoryState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = false;
      state.message = "";
    },

    clearCategory: (state) => {
      state.category = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ==========================
      // Get Categories
      // ==========================
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = false;
        state.message = "";
      })

      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;

        state.categories =
          action.payload.categories ||
          action.payload.data ||
          action.payload ||
          [];

        if (action.payload.pagination) {
          state.pagination = action.payload.pagination;
        }

        state.message = action.payload.message || "";
      })

      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = true;
        state.message = action.payload;
      })

      // ==========================
      // Get Category By ID
      // ==========================
      .addCase(getCategoryById.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = false;
        state.message = "";
      })

      .addCase(getCategoryById.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;

        state.category =
          action.payload.category ||
          action.payload.data ||
          action.payload;

        state.message = action.payload.message || "";
      })

      .addCase(getCategoryById.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = true;
        state.message = action.payload;
      })

      // ==========================
      // Create Category
      // ==========================
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = false;
        state.message = "";
      })

      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;

        const category =
          action.payload.category ||
          action.payload.data ||
          action.payload;

        state.categories = [
          category,
          ...state.categories.filter((item) => item._id !== category._id),
        ];

        state.message = action.payload.message || "";
      })

      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = true;
        state.message = action.payload;
      })

      // ==========================
      // Update Category
      // ==========================
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = false;
        state.message = "";
      })

      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;

        const updated =
          action.payload.category ||
          action.payload.data ||
          action.payload;

        state.categories = state.categories.map((item) =>
          item._id === updated._id ? updated : item
        );

        state.category = updated;
        state.message = action.payload.message || "";
      })

      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = true;
        state.message = action.payload;
      })

      // ==========================
      // Delete Category
      // ==========================
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = false;
        state.message = "";
      })

      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;

        const deletedId =
          action.payload.id ||
          action.payload._id ||
          action.meta.arg;

        state.categories = state.categories.filter(
          (item) => item._id !== deletedId
        );

        if (state.category?._id === deletedId) {
          state.category = null;
        }

        state.message = action.payload.message || "";
      })

      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = true;
        state.message = action.payload;
      });
  },
});

export const { resetCategoryState, clearCategory } =
  categorySlice.actions;

export default categorySlice.reducer;