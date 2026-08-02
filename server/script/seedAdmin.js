import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "../models/User.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/grocery");
//
    console.log("✅ MongoDB Connected");

    // Check Existing Admin
    const adminExists = await User.findOne({
      email: "admin@greenbasket.com",
    });

    if (adminExists) {
      console.log("⚠️ Admin already exists");
      process.exit();
    }

    // Create Admin
    const admin = await User.create({
      name: "Super Admin",
      email: "admin@greenbasket.com",
      phone: "9999999999",
      password: "Admin@123", // User model pre("save") isko hash karega
      role: "Admin",
      isVerified: true,
    });

    console.log("🎉 Admin Created Successfully");
    console.log({
      email: admin.email,
      password: "Admin@123",
    });

    process.exit();

  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedAdmin();
