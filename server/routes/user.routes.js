import express from "express";
import upload from "../middlewares/upload.middleware.js";

import {
    protect,
    authorize,
} from "../middlewares/auth.middleware.js";

import {
    getMyProfile,
    updateProfile,
    updateProfileAvatar,
    removeProfileAvatar,
    changePassword,
    deactivateAccount,
} from "../controllers/user.controller.js";

const router = express.Router();

/* ==========================
        Profile
========================== */

router.get(
    "/profile",
    protect,
    authorize("Customer"),
    getMyProfile
);

router.put(
    "/profile",
    protect,
    authorize("Customer"),
    updateProfile
);

/* ==========================
      Profile Avatar
========================== */

router.put(
    "/profile/avatar",
    protect,
    authorize("Customer"),
    upload.single("avatar"),
    updateProfileAvatar
);

router.delete(
    "/profile/avatar",
    protect,
    authorize("Customer"),
    removeProfileAvatar
);

/* ==========================
      Change Password
========================== */

router.put(
    "/change-password",
    protect,
    authorize("Customer"),
    changePassword
);

/* ==========================
      Deactivate Account
========================== */

router.put(
    "/deactivate",
    protect,
    authorize("Customer"),
    deactivateAccount
);

export default router;