import { createSlice } from "@reduxjs/toolkit";

import {
    getProfile,
    updateProfile,
    updateAvatar,
    removeAvatar,
    changePassword,
    deactivateAccount,
} from "./profileThunk";

const initialState = {
    profile: null,

    loading: false,

    success: false,

    error: false,

    message: "",
};

const profileSlice = createSlice({
    name: "profile",

    initialState,

    reducers: {

        resetProfileState: (state) => {
            state.loading = false;
            state.success = false;
            state.error = false;
            state.message = "";
        },

        clearProfile: (state) => {
            state.profile = null;
            state.loading = false;
            state.success = false;
            state.error = false;
            state.message = "";
        },
    },

    extraReducers: (builder) => {

        /* =====================================================
                    GET PROFILE
        ====================================================== */

        builder
            .addCase(getProfile.pending, (state) => {
                state.loading = true;
                state.error = false;
                state.success = false;
                state.message = "";
            })

            .addCase(getProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.profile = action.payload.user;
                state.message = action.payload.message || "";
            })

            .addCase(getProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.message = action.payload;
            });

        /* =====================================================
                    UPDATE PROFILE
        ====================================================== */

        builder
            .addCase(updateProfile.pending, (state) => {
                state.loading = true;
                state.error = false;
                state.success = false;
            })

            .addCase(updateProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.profile = action.payload.user;
                state.message = action.payload.message;
            })

            .addCase(updateProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.message = action.payload;
            });

        /* =====================================================
                    UPDATE AVATAR
        ====================================================== */

        builder
            .addCase(updateAvatar.pending, (state) => {
                state.loading = true;
            })

            .addCase(updateAvatar.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;

                if (state.profile) {
                    state.profile.avatar = action.payload.avatar;
                }

                state.message = action.payload.message;
            })

            .addCase(updateAvatar.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.message = action.payload;
            });

        /* =====================================================
                    REMOVE AVATAR
        ====================================================== */

        builder
            .addCase(removeAvatar.pending, (state) => {
                state.loading = true;
            })

            .addCase(removeAvatar.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;

                if (state.profile) {
                    state.profile.avatar = {
                        public_id: "",
                        url: "",
                    };
                }

                state.message = action.payload.message;
            })

            .addCase(removeAvatar.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.message = action.payload;
            });

        /* =====================================================
                    CHANGE PASSWORD
        ====================================================== */

        builder
            .addCase(changePassword.pending, (state) => {
                state.loading = true;
            })

            .addCase(changePassword.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;
            })

            .addCase(changePassword.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.message = action.payload;
            });

        /* =====================================================
                    DEACTIVATE ACCOUNT
        ====================================================== */

        builder
            .addCase(deactivateAccount.pending, (state) => {
                state.loading = true;
            })

            .addCase(deactivateAccount.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.profile = null;
                state.message = action.payload.message;
            })

            .addCase(deactivateAccount.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.message = action.payload;
            });
    },
});

export const {
    resetProfileState,
    clearProfile,
} = profileSlice.actions;

export default profileSlice.reducer;