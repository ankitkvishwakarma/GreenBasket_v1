import express from "express";
import { protect, authorize } from "../middlewares/auth.middleware.js";

import {
  createPaymentOrder,
  verifyPayment,
  getMyPayments,
  getPaymentById,
  getAllPayments,
  getPaymentStats,
  markCODPaid,
} from "../controllers/payment.controller.js";
const router = express.Router();

router.post("/create-order", protect, createPaymentOrder);
router.post("/verify", protect, verifyPayment);
router.put("/cod/:id", protect, authorize("Admin"), markCODPaid);

// Admin
router.get(
  "/admin/all",
  protect,
  authorize("Admin"),
  getAllPayments
);

router.get(
  "/admin/stats",
  protect,
  authorize("Admin"),
  getPaymentStats
);
router.put(
  "/cod/:id",
  protect,
  authorize("Admin"),
  markCODPaid
);

export default router;