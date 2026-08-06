import express from "express";

import {
  createProduct,
  getProducts,
  getProductById,
  getProductBySlug,
  updateProduct,
  deleteProduct,

  searchProducts,
  filterProducts,

  getFeaturedProducts,
  getLatestProducts,
  getTrendingProducts,
  getBestSellerProducts,
  getRelatedProducts,
//   getLowStockProducts,
  getProductStats,

  createReview,
  updateReview,
  deleteReview,
  deleteReviewByAdmin,
} from "../controllers/product.controller.js";

import {
  protect,
  authorize,
} from "../middlewares/auth.middleware.js";

import upload from "../middlewares/upload.middleware.js";

const router = express.Router();

/* =====================================================
   PUBLIC ROUTES
===================================================== */

// All Products
router.get("/", getProducts);

// Search Products
router.get("/search", searchProducts);

// Filter Products
router.get("/filter", filterProducts);

// Featured Products
router.get("/featured", getFeaturedProducts);

// Latest Products
router.get("/latest", getLatestProducts);

// Trending Products
router.get("/trending", getTrendingProducts);

// Best Seller Products
router.get("/best-seller", getBestSellerProducts);

// Related Products
router.get("/related/:id", getRelatedProducts);

/* =====================================================
   ADMIN GET ROUTES
   (Must come before /:slug)
===================================================== */

// Product Statistics
router.get(
  "/stats",
  protect,
  authorize("Admin"),
  getProductStats
);

// Low Stock Products
// router.get(
//   "/low-stock",
//   protect,
//   authorize("Admin"),
//   getLowStockProducts
// );

// Product By Id
router.get("/id/:id", getProductById);

// Product By Slug
router.get("/:slug", getProductBySlug);

/* =====================================================
   REVIEW ROUTES
===================================================== */

// Add Review
router.post(
  "/:id/review",
  protect,
  createReview
);

// Update Review
router.put(
  "/:id/review",
  protect,
  updateReview
);

// Delete Own Review
router.delete(
  "/:id/review",
  protect,
  deleteReview
);

// Delete Review By Admin
router.delete(
  "/:productId/review/:reviewId",
  protect,
  authorize("Admin"),
  deleteReviewByAdmin
);

/* =====================================================
   ADMIN CRUD ROUTES
===================================================== */

// Create Product
router.post(
  "/",
  protect,
  authorize("Admin"),
  upload.array("images", 5),
  createProduct
);

// Update Product
router.put(
  "/:id",
  protect,
  authorize("Admin"),
  upload.array("images", 5),
  updateProduct
);

// Delete Product
router.delete(
  "/:id",
  protect,
  authorize("Admin"),
  deleteProduct
);

export default router;