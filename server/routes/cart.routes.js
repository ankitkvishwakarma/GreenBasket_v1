import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart,
  getCartSummary,
} from "../controllers/cart.controller.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.json({ message: "Test OK" });
});

router.post("/add", protect, addToCart);
router.get("/", protect, getCart);
router.put("/update", protect, updateCartItem);

// 👇 Clear ko remove se pehle rakho
router.delete("/clear", protect, clearCart);

router.delete("/remove/:productId", protect, removeCartItem);
router.get("/summary", protect, getCartSummary);

export default router;