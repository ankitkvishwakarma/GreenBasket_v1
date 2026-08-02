import express from "express";
import {
  getMyNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
  getUnreadNotificationCount,
} from "../controllers/notification.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", protect, getMyNotifications);

router.put("/read-all", protect, markAllNotificationsAsRead);

router.put("/:id/read", protect, markNotificationAsRead);

router.delete("/:id", protect, deleteNotification);

router.get("/unread-count", protect, getUnreadNotificationCount);





export default router;