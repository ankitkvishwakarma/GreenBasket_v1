import express from "express";

import {
    createCoupon,
    getCoupons,
    getCouponById,
    updateCoupon,
    deleteCoupon,
    applyCoupon,
} from "../controllers/coupon.controller.js";

import {
    protect,
    authorize,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

// ===========================
// Public Routes
// ===========================

// Apply Coupon
router.post("/apply", protect, applyCoupon);

// ===========================
// Admin Routes
// ===========================

// Create Coupon
router.post(
    "/",
    protect,
    authorize("admin"),
    createCoupon
);

// Get All Coupons
router.get(
    "/",
    protect,
    authorize("admin"),
    getCoupons
);

// Get Coupon By ID
router.get(
    "/:id",
    protect,
    authorize("admin"),
    getCouponById
);

// Update Coupon
router.put(
    "/:id",
    protect,
    authorize("admin"),
    updateCoupon
);

// Delete Coupon
router.delete(
    "/:id",
    protect,
    authorize("admin"),
    deleteCoupon
);

export default router;