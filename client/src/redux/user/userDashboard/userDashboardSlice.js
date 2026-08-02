import { createSlice } from "@reduxjs/toolkit";
import {
    getUserDashboard,
    refreshUserDashboard,
} from "./userDashboardThunk";

const initialState = {
    dashboard: null,
    loading: false,
    error: null,
};

const userDashboardSlice = createSlice({
    name: "userDashboard",
    initialState,

    reducers: {
        resetDashboardState: (state) => {
            state.error = null;
        },
    },

    extraReducers: (builder) => {
        builder

            // Get Dashboard
            .addCase(getUserDashboard.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(getUserDashboard.fulfilled, (state, action) => {
                state.loading = false;
                state.dashboard = action.payload;
            })

            .addCase(getUserDashboard.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Refresh Dashboard
            .addCase(refreshUserDashboard.pending, (state) => {
                state.loading = true;
            })

            .addCase(refreshUserDashboard.fulfilled, (state, action) => {
                state.loading = false;
                state.dashboard = action.payload;
            })

            .addCase(refreshUserDashboard.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { resetDashboardState } = userDashboardSlice.actions;

export default userDashboardSlice.reducer;