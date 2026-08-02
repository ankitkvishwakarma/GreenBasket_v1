import express from "express";
import { protect } from "../middlewares/auth.middleware.js";

import {
    addToWishlist,
    getMyWishlist,
    removeFromWishlist,
    checkWishlistProduct,
    clearWishlist,
} from "../controllers/wishlist.controller.js";

const router = express.Router();

router.post("/", protect, addToWishlist);

router.get("/", protect, getMyWishlist);

router.get("/check/:productId", protect, checkWishlistProduct);

router.delete("/:productId", protect, removeFromWishlist);

router.delete("/", protect, clearWishlist);

export default router;