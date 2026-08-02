import jwt from "jsonwebtoken";
import Delivery from "../models/DeliveryBoy.js";

export const deliveryProtect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Token missing.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    const deliveryBoy = await Delivery.findById(decoded.id).select("-password");

    if (!deliveryBoy) {
      return res.status(401).json({
        success: false,
        message: "Delivery Boy not found.",
      });
    }

    req.user = deliveryBoy;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or Expired Token.",
    });
  }
};