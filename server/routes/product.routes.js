import express from "express";
// import upload from "../middlewares/upload.js";

import {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getFeaturedProducts,
    getLatestProducts,
    getRelatedProducts,
    getBestSellerProducts,
    getLowStockProducts,
    getProductStats,
    addReview,
} from "../controllers/product.controller.js";

import {
    protect,
    authorize,
} from "../middlewares/auth.middleware.js";

const router = express.Router();


// =====================================================
// PUBLIC ROUTES
// =====================================================

// Get All Products
router.get("/", getProducts);

// Featured Products
router.get("/featured", getFeaturedProducts);

// Latest Products
router.get("/latest", getLatestProducts);

// Best Seller Products
router.get("/best-seller", getBestSellerProducts);

// Related Products
router.get("/related/:id", getRelatedProducts);

// Get Single Product (⚠️ Always keep this LAST among GET routes)
router.get("/:id", getProductById);

router.post(
    "/:id/review",
    protect,
    addReview
);
// =====================================================
// ADMIN ROUTES
// =====================================================

// Product Statistics
router.get(
    "/stats",
    protect,
    authorize("Admin"),
    getProductStats
);

// Low Stock Products
router.get(
    "/low-stock",
    protect,
    authorize("Admin"),
    getLowStockProducts
);


// Create Product
router.post(
    "/",
    protect,
    authorize("Admin"),
    createProduct
);

// Update Product
router.put(
    "/:id",
    protect,
    authorize("Admin"),
    // upload.array("images", 5),
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