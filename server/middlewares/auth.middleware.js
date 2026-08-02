import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {

  try {
    let token;


    // Authorization Header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // Token Not Found
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Token missing.",
      });
    }

    // Verify Token
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    // Get User
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found.",
      });
    }

    // Check Active User
    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "Account is deactivated.",
      });
    }

    // Attach User
    req.user = user;
    console.log("Logged In User:", user);
    console.log("User Role:", user.role);

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or Expired Token.",
    });
  }
};
// Role Based Authorization
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // Case-insensitive comparison
    const userRole = req.user.role?.toLowerCase();
    const allowedRoles = roles.map((role) => role.toLowerCase());

    // Debug (baad me remove kar dena)
    console.log("User Role:", userRole);
    console.log("Allowed Roles:", allowedRoles);

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        message: "Access Denied",
      });
    }

    next();
  };
};