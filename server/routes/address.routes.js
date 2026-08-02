import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import {
    addAddress,
    getAddresses,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
} from "../controllers/address.controller.js";

const router = express.Router();

router.post("/", protect, addAddress);
router.get("/", protect, getAddresses);
router.put("/:id", protect, updateAddress);
router.delete("/:id", protect, deleteAddress);
router.patch("/set-default/:id", protect, setDefaultAddress);

export default router;