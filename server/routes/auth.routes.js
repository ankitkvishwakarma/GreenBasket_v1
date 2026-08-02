import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getProfile,
  updateProfile,
  changePassword,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

// import { registerUser, loginUser, logoutUser, refreshAccessToken, } from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/logout", logoutUser);


router.get("/me", protect, getProfile);

router.put("/update-profile", protect, updateProfile);

router.put("/change-password", protect, changePassword);

router.post("/forgot-password", forgotPassword);

router.put("/reset-password/:token", resetPassword);


// router.post("/refresh-token", refreshAccessToken);
export default router;