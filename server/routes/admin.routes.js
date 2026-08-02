import express from "express";
import { protect, authorize } from "../middlewares/auth.middleware.js";
import { createCategories } from "../controllers/Categories.controller.js";

import {
  getAdminDashboard,
  getOrderStats,
  getOrdersByStatus,
  getTodaysOrders,
  getMonthlyRevenue,
  getOrderStatusStats,
  getTopSellingProducts,
  getSalesByCategories,
  getRecentOrders,
  getLowStockProducts,

} from "../controllers/admin/analytics.controller.js";

const router = express.Router();

// Protect all admin routes
router.use(protect, authorize("Admin"));

// Dashboard
router.get("/dashboard", getAdminDashboard);

// Categories
router.post("/Categories", createCategories);

// Analytics

router.get("/analytics/stats", getOrderStats);
router.get("/analytics/today-orders", getTodaysOrders);
router.get("/analytics/monthly-revenue", getMonthlyRevenue);
router.get("/analytics/order-status", getOrderStatusStats);
router.get("/analytics/top-products", getTopSellingProducts);
router.get("/analytics/Categories-sales", getSalesByCategories);
router.get("/analytics/recent-orders", getRecentOrders);
router.get("/analytics/low-stock", getLowStockProducts);
router.get("/analytics/status/:status", getOrdersByStatus);

export default router;