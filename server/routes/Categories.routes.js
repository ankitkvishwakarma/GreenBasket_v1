import express from "express";
import {
  createCategories,
  getCategories,
  getCategoriesById,
  updateCategories,
  deleteCategories,
} from "../controllers/Categories.controller.js";

import { protect, authorize } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";

const router = express.Router();

// Public
router.get("/", getCategories);
router.get("/:id", getCategoriesById);

// Admin

router.post(
  "/",
  protect,
  authorize("Admin"),
  upload.single("image"),
  createCategories
);

router.put(
  "/:id",
  protect,
  authorize("Admin"),
  upload.single("image"),
  updateCategories
);
router.put(
  "/:id",
  protect,
  authorize("Admin"),
  upload.single("image"),
  updateCategories
);

router.delete(
  "/:id",
  protect,
  authorize("Admin"),
  deleteCategories
);

export default router;