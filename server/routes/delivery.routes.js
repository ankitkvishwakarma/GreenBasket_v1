import express from "express";
import {
  registerDeliveryBoy,
  loginDeliveryBoy,
  assignDeliveryBoy,
  getMyAssignedOrders,
  getDeliveryProfile,
  updateDeliveryStatus,
  getAllDeliveryBoys,
  getDeliveryBoyById,
  updateAvailability,
  deleteDeliveryBoy,
  updateCurrentLocation,
  getDeliveryLocation,
  updateDeliveryBoy,
  verifyDeliveryBoy,
} from "../controllers/delivery.controller.js";

import { protect, authorize } from "../middlewares/auth.middleware.js";
import { deliveryProtect } from "../middlewares/deliveryAuth.middleware.js";
import upload from "../middlewares/upload.middleware.js";


const router = express.Router();

// Admin
router.post(
  "/register",
  protect,
  authorize("Admin"),
  upload.fields([
    {
      name: "profileImage",
      maxCount: 1,
    },
    {
      name: "aadhaarFront",
      maxCount: 1,
    },
    {
      name: "aadhaarBack",
      maxCount: 1,
    },
    {
      name: "drivingLicense",
      maxCount: 1,
    },
    {
      name: "rcBook",
      maxCount: 1,
    },
    {
      name: "insurance",
      maxCount: 1,
    },
  ]),
  registerDeliveryBoy
);


router.put(
  "/verify/:id",
  protect,
  authorize("Admin"),
  verifyDeliveryBoy
);

router.put(
  "/assign",
  protect,
  authorize("Admin"),
  assignDeliveryBoy
);
// Admin Routes
router.get(
  "/",
  protect,
  authorize("Admin"),
  getAllDeliveryBoys
);

router.get(
  "/:id",
  protect,
  authorize("Admin"),
  getDeliveryBoyById
);

router.put(
  "/availability/:id",
  protect,
  authorize("Admin"),
  updateAvailability
);

router.delete(
  "/:id",
  protect,
  authorize("Admin"),
  deleteDeliveryBoy
);
router.get(
  "/location/:id",
  protect,
  getDeliveryLocation
);

router.put(
  "/:id",
  protect,
  authorize("Admin"),
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "aadhaarFront", maxCount: 1 },
    { name: "aadhaarBack", maxCount: 1 },
    { name: "drivingLicense", maxCount: 1 },
    { name: "rcBook", maxCount: 1 },
    { name: "insurance", maxCount: 1 },
  ]),
  updateDeliveryBoy
);

// Public
router.post("/login", loginDeliveryBoy);

// Delivery Boy


router.get("/profile", deliveryProtect, getDeliveryProfile);

router.get("/my-orders", deliveryProtect, getMyAssignedOrders);

router.put(
  "/update-status/:orderId",
  deliveryProtect,
  updateDeliveryStatus
);


router.put("/update-location",
  deliveryProtect,
  updateCurrentLocation
);

export default router;