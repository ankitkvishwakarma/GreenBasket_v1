import express from "express";
import {
  addReview,
  getProductReviews,
  updateReview,
  deleteReview,
  deleteReviewByAdmin,
} from "../controllers/review.controller.js";

import { protect, authorize } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Public
router.get("/:productId", getProductReviews);

// User
router.post("/:productId", protect, addReview);
router.put("/:productId", protect, updateReview);
router.delete("/:productId", protect, deleteReview);



// Admin Delete Review
router.delete(
  "/admin/:productId/:reviewId",
  protect,
  authorize("Admin"),
  deleteReviewByAdmin);

export default router;