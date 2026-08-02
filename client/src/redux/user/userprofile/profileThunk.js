import { createAsyncThunk } from "@reduxjs/toolkit";
import profileService from "./profileService";

/* ==========================================
   Get Profile
========================================== */

export const getProfile = createAsyncThunk(
    "profile/getProfile",
    async (_, thunkAPI) => {
        try {
            return await profileService.getProfile();
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);

/* ==========================================
   Update Profile
========================================== */

export const updateProfile = createAsyncThunk(
    "profile/updateProfile",
    async (profileData, thunkAPI) => {
        try {
            return await profileService.updateProfile(profileData);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);

/* ==========================================
   Update Avatar
========================================== */

export const updateAvatar = createAsyncThunk(
    "profile/updateAvatar",
    async (formData, thunkAPI) => {
        try {
            return await profileService.updateAvatar(formData);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);

/* ==========================================
   Remove Avatar
========================================== */

export const removeAvatar = createAsyncThunk(
    "profile/removeAvatar",
    async (_, thunkAPI) => {
        try {
            return await profileService.removeAvatar();
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);

/* ==========================================
   Change Password
========================================== */

export const changePassword = createAsyncThunk(
    "profile/changePassword",
    async (passwordData, thunkAPI) => {
        try {
            return await profileService.changePassword(passwordData);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);

/* ==========================================
   Deactivate Account
========================================== */

export const deactivateAccount = createAsyncThunk(
    "profile/deactivateAccount",
    async (_, thunkAPI) => {
        try {
            return await profileService.deactivateAccount();
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);