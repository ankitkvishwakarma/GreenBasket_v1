import express from "express";
import {
  placeOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
  updateOrderStatus,
  getAllOrders,

} from "../controllers/order.controller.js";

import { protect, authorize } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/place", protect, placeOrder);

router.get("/my-orders", protect, getMyOrders);

router.get("/:id", protect, getOrderById);

// User
router.put("/cancel/:id", protect, cancelOrder);

// Admin
router.put(
  "/status/:id",
  protect,
  authorize("Admin"),
  updateOrderStatus
);
router.get(
  "/",
  protect,
  authorize("Admin"),
  getAllOrders
);

export default router;