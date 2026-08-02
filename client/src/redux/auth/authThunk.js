import { createAsyncThunk } from "@reduxjs/toolkit";
import authService from "@/services/authService";

// ================= Login =================

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authService.login(credentials);

      localStorage.setItem(
        "accessToken",
        response.accessToken
      );
      localStorage.setItem(
        "user",
        JSON.stringify(response.user)
      );

      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Login Failed"
      );
    }
  }
);

// ================= Register =================

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authService.register(userData);

      localStorage.setItem(
        "accessToken",
        response.accessToken
      );
      localStorage.setItem(
        "user",
        JSON.stringify(response.user)
      );

      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        "Registration Failed"
      );
    }
  }
);

// ================= Forgot Password =================

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      return await authService.forgotPassword(email);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        "Unable to send reset link"
      );
    }
  }
);

// ================= Reset Password =================

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ token, password }, { rejectWithValue }) => {
    try {
      return await authService.resetPassword(
        token,
        password
      );
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        "Password Reset Failed"
      );
    }
  }
);

// ================= Logout =================

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();

      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");

      return true;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Logout Failed"
      );
    }
  }
);