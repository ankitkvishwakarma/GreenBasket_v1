import express from "express";
import {
    protect,
    authorize,
} from "../middlewares/auth.middleware.js";
import { getUserDashboard } from "../controllers/userDashboard.controller.js";

const router = express.Router();


router.get(
    "/",
    protect,
    authorize("Customer"),
    getUserDashboard
);

export default router;