import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cloudinary from "./config/cloudinary.js";

import authRoutes from "./routes/auth.routes.js";
import CategoriesRoutes from "./routes/Categories.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import addressRoutes from "./routes/address.routes.js";
import orderRoutes from "./routes/order.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import couponRoutes from "./routes/coupon.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import wishlistRoutes from "./routes/wishlist.routes.js";
import deliveryRoutes from "./routes/delivery.routes.js";
import userDashboardRoutes from "./routes/userDashboard.routes.js";
import notificationRoutes from "./routes/notification.routes.js";
import userRoutes from "./routes/user.routes.js";




dotenv.config();

const app = express();

/* ===========================
   Security Middleware
=========================== */

app.use(helmet());

app.use(
   cors({
      origin: process.env.CLIENT_URL,
      credentials: true,
   })
);

/* ===========================
   Body Parser
=========================== */

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));


/* ===========================
   Cookies
=========================== */

app.use(cookieParser());

/* ===========================
   Logger
=========================== */

app.use(morgan("dev"));

/* ===========================
   Health Check
=========================== */

app.get("/", (req, res) => {
   res.status(200).json({
      success: true,
      message: "GreenBasket API Running 🚀",
   });
});

/* ===========================
   API Routes
=========================== */

app.use("/api/auth", authRoutes);
app.use("/api/Categories", CategoriesRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/delivery", deliveryRoutes);
app.use("/api/user/dashboard", userDashboardRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/user", userRoutes);
/* ===========================
   404 Handler
=========================== */

app.all("/*splat", (req, res) => {
   res.status(404).json({
      success: false,
      message: "Route not found",
   });
});

export default app;