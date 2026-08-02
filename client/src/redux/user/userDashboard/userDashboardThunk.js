import { createAsyncThunk } from "@reduxjs/toolkit";
import userDashboardService from "./userDashboardService";

// Load Dashboard
export const getUserDashboard = createAsyncThunk(
    "userDashboard/getUserDashboard",
    async (_, thunkAPI) => {
        try {
            return await userDashboardService.getDashboard();
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);

// Refresh Dashboard
export const refreshUserDashboard = createAsyncThunk(
    "userDashboard/refreshUserDashboard",
    async (_, thunkAPI) => {
        try {
            return await userDashboardService.refreshDashboard();
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);