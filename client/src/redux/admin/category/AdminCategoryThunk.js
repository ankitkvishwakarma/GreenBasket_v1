import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getCategoriesAPI,
  getCategoryByIdAPI,
  createCategoryAPI,
  updateCategoryAPI,
  deleteCategoryAPI,
} from "./AdmincategoryService";

// ==============================
// Get All Categories
// ==============================
export const getCategories = createAsyncThunk(
  "category/getCategories",
  async (params = {}, thunkAPI) => {
    try {
      return await getCategoriesAPI(params);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch categories"
      );
    }
  }
);

// ==============================
// Get Category By ID
// ==============================
export const getCategoryById = createAsyncThunk(
  "category/getCategoryById",
  async (id, thunkAPI) => {
    try {
      return await getCategoryByIdAPI(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch category"
      );
    }
  }
);

// ==============================
// Create Category
// ==============================
export const createCategory = createAsyncThunk(
  "category/createCategory",
  async (categoryData, thunkAPI) => {
    try {
      return await createCategoryAPI(categoryData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create category"
      );
    }
  }
);

// ==============================
// Update Category
// ==============================
export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async ({ id, categoryData }, thunkAPI) => {
    try {
      return await updateCategoryAPI({ id, categoryData });
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update category"
      );
    }
  }
);

// ==============================
// Delete Category
// ==============================
export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (id, thunkAPI) => {
    try {
      return await deleteCategoryAPI(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete category"
      );
    }
  }
);