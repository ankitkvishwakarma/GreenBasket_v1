import Delivery from "../models/DeliveryBoy.js";
import Order from "../models/Order.js";

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import { createNotification } from "../utils/createNotification.js";



const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_ACCESS_SECRET,
    {
      expiresIn: process.env.JWT_ACCESS_EXPIRE || "7d",
    }
  );
};


const uploadFile = async (file, folder) => {
  if (!file) return "";

  const result = await uploadToCloudinary(
    file.buffer,
    folder
  );

  return result.secure_url;
};

const uploadDocuments = async (files = {}) => {

  return {

    aadhaarFront: await uploadFile(
      files?.aadhaarFront?.[0],
      "greenbasket/delivery/documents"
    ),

    aadhaarBack: await uploadFile(
      files?.aadhaarBack?.[0],
      "greenbasket/delivery/documents"
    ),

    drivingLicense: await uploadFile(
      files?.drivingLicense?.[0],
      "greenbasket/delivery/documents"
    ),

    rcBook: await uploadFile(
      files?.rcBook?.[0],
      "greenbasket/delivery/documents"
    ),

    insurance: await uploadFile(
      files?.insurance?.[0],
      "greenbasket/delivery/documents"
    ),

  };

};

const checkDuplicateDeliveryBoy = async ({
  email,
  phone,
  aadhaarNumber,
  excludeId = null,
}) => {

  const query = {

    $or: [
      { email },
      { phone },
      { aadhaarNumber },
    ],

  };

  if (excludeId) {
    query._id = {
      $ne: excludeId,
    };
  }

  return Delivery.findOne(query);

};

export const registerDeliveryBoy = async (req, res) => {

  try {

    const {

      name,
      email,
      phone,
      password,
      vehicleType,
      vehicleNumber,
      aadhaarNumber,
      address,

    } = req.body;

    if (
      !name ||
      !email ||
      !phone ||
      !password ||
      !vehicleType ||
      !vehicleNumber ||
      !aadhaarNumber ||
      !address
    ) {

      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });

    }

    const duplicate = await checkDuplicateDeliveryBoy({
      email,
      phone,
      aadhaarNumber,
    });

    if (duplicate) {

      return res.status(409).json({
        success: false,
        message:
          "Delivery Boy already exists with Email, Phone or Aadhaar.",
      });

    }

    const profileImage = await uploadFile(
      req.files?.profileImage?.[0],
      "greenbasket/delivery/profile"
    );

    const documents = await uploadDocuments(
      req.files
    );

    const deliveryBoy = await Delivery.create({

      name,
      email,
      phone,
      password,

      vehicleType,
      vehicleNumber,

      aadhaarNumber,
      address,

      profileImage,

      documents,

    });

    res.status(201).json({

      success: true,
      message:
        "Delivery Boy registered successfully.",

      deliveryBoy,

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,
      message: error.message,

    });

  }

};

export const loginDeliveryBoy = async (req, res) => {

  try {

    const {
      email,
      password,
    } = req.body;

    if (!email || !password) {

      return res.status(400).json({
        success: false,
        message: "Email and Password are required.",
      });

    }

    const deliveryBoy = await Delivery.findOne({
      email,
    }).select("+password");

    if (!deliveryBoy) {

      return res.status(404).json({

        success: false,
        message: "Delivery Boy not found.",

      });

    }

    if (!deliveryBoy.isActive) {

      return res.status(403).json({

        success: false,
        message: "Account is disabled.",

      });

    }

    if (
      deliveryBoy.verificationStatus !== "Approved"
    ) {

      return res.status(403).json({

        success: false,

        message:
          "Your account is not approved by Admin.",

      });

    }

    const isMatch =
      await deliveryBoy.comparePassword(password);

    if (!isMatch) {

      return res.status(401).json({

        success: false,
        message: "Invalid Email or Password.",

      });

    }

    deliveryBoy.lastLogin = new Date();

    await deliveryBoy.save();

    const token = generateToken(
      deliveryBoy._id
    );

    const data = deliveryBoy.toObject();

    delete data.password;

    res.status(200).json({

      success: true,

      message: "Login successful.",

      token,

      deliveryBoy: data,

    });

  } catch (error) {

    res.status(500).json({

      success: false,
      message: error.message,

    });

  }

};

export const verifyDeliveryBoy = async (req, res) => {
  try {

    const deliveryBoy = await Delivery.findById(req.params.id);

    if (!deliveryBoy) {
      return res.status(404).json({
        success: false,
        message: "Delivery Boy not found."
      });
    }

    if (deliveryBoy.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Delivery Boy is already verified."
      });
    }

    deliveryBoy.isVerified = true;
    deliveryBoy.verificationStatus = "Approved";
    deliveryBoy.verifiedBy = req.user._id;
    deliveryBoy.verifiedAt = new Date();

    await deliveryBoy.save();

    res.status(200).json({
      success: true,
      message: "Delivery Boy verified successfully.",
      deliveryBoy,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

export const assignDeliveryBoy = async (req, res) => {
  try {

    const { orderId, deliveryBoyId } = req.body;

    if (!orderId || !deliveryBoyId) {
      return res.status(400).json({
        success: false,
        message: "Order ID and Delivery Boy ID are required.",
      });
    }

    const [order, deliveryBoy] = await Promise.all([
      Order.findById(orderId),
      Delivery.findById(deliveryBoyId),
    ]);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    if (!deliveryBoy) {
      return res.status(404).json({
        success: false,
        message: "Delivery Boy not found.",
      });
    }

    if (!deliveryBoy.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Delivery Boy is not verified.",
      });
    }

    if (!deliveryBoy.isAvailable) {
      return res.status(400).json({
        success: false,
        message: "Delivery Boy is unavailable.",
      });
    }

    if (order.deliveryBoy) {
      return res.status(400).json({
        success: false,
        message: "Order already assigned.",
      });
    }

    order.deliveryBoy = deliveryBoy._id;
    order.assignedAt = new Date();
    order.orderStatus = "Assigned";

    deliveryBoy.totalDeliveries += 1;
    deliveryBoy.isAvailable = false;

    await Promise.all([
      order.save(),
      deliveryBoy.save(),
    ]);

    try {

      await createNotification({
        recipientType: "Delivery",
        deliveryBoy: deliveryBoy._id,
        title: "New Delivery Assigned",
        message: `Order ${order.orderNumber} has been assigned to you.`,
        type: "DELIVERY_ASSIGNED",
        referenceId: order._id,
      });

    } catch (err) {
      console.log("Notification Error:", err.message);
    }

    res.status(200).json({
      success: true,
      message: "Delivery Boy assigned successfully.",
      order,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

export const getDeliveryProfile = async (req, res) => {

  try {

    const deliveryBoy = await Delivery.findById(req.user._id)
      .select("-password");

    if (!deliveryBoy) {

      return res.status(404).json({
        success: false,
        message: "Delivery Boy not found.",
      });

    }

    res.status(200).json({

      success: true,
      deliveryBoy,

    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

export const getMyAssignedOrders = async (req, res) => {

  try {

    const orders = await Order.find({

      deliveryBoy: req.user._id,

    })

      .populate("user", "name email phone")

      .populate("address")

      .populate("items.product", "name image price")

      .sort({
        createdAt: -1,
      });

    res.status(200).json({

      success: true,

      totalOrders: orders.length,

      orders,

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

export const updateDeliveryStatus = async (req, res) => {
  try {

    const { orderId } = req.params;
    const { orderStatus } = req.body;

    const allowedStatus = [
      "Picked Up",
      "Out for Delivery",
      "Delivered",
      "Cancelled",
    ];

    if (!allowedStatus.includes(orderStatus)) {
      return res.status(400).json({
        success: false,
        message: "Invalid delivery status.",
      });
    }

    const order = await Order.findOne({
      _id: orderId,
      deliveryBoy: req.user._id,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Assigned order not found.",
      });
    }

    order.orderStatus = orderStatus;

    const deliveryBoy = await Delivery.findById(req.user._id);

    if (orderStatus === "Delivered") {
      deliveryBoy.completedDeliveries += 1;
      deliveryBoy.isAvailable = true;
    }

    if (orderStatus === "Cancelled") {
      deliveryBoy.cancelledDeliveries += 1;
      deliveryBoy.isAvailable = true;
    }

    await Promise.all([
      order.save(),
      deliveryBoy.save(),
    ]);

    try {

      await createNotification({
        recipientType: "CUSTOMER",
        user: order.user,
        title: "Order Status Updated",
        message: `Your order ${order.orderNumber} is now ${orderStatus}.`,
        type: "ORDER_STATUS",
        referenceId: order._id,
      });

    } catch (err) {
      console.log(err.message);
    }

    res.status(200).json({
      success: true,
      message: "Order status updated successfully.",
      order,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

export const updateCurrentLocation = async (req, res) => {

  try {

    const { latitude, longitude } = req.body;

    if (latitude == null || longitude == null) {
      return res.status(400).json({
        success: false,
        message: "Latitude and Longitude are required.",
      });
    }

    const deliveryBoy = await Delivery.findById(req.user._id);

    if (!deliveryBoy) {
      return res.status(404).json({
        success: false,
        message: "Delivery Boy not found.",
      });
    }

    deliveryBoy.currentLocation = {
      type: "Point",
      coordinates: [
        Number(longitude),
        Number(latitude),
      ],
    };

    await deliveryBoy.save();

    res.status(200).json({
      success: true,
      message: "Location updated successfully.",
      currentLocation: deliveryBoy.currentLocation,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

export const getDeliveryLocation = async (req, res) => {

  try {

    const deliveryBoy = await Delivery.findById(req.params.id)
      .select(
        "name phone currentLocation isAvailable"
      );

    if (!deliveryBoy) {

      return res.status(404).json({
        success: false,
        message: "Delivery Boy not found.",
      });

    }

    res.status(200).json({

      success: true,

      deliveryBoy,

      location: deliveryBoy.currentLocation,

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

export const updateAvailability = async (req, res) => {

  try {

    const { isAvailable } = req.body;

    const deliveryBoy = await Delivery.findById(
      req.params.id
    );

    if (!deliveryBoy) {

      return res.status(404).json({
        success: false,
        message: "Delivery Boy not found.",
      });

    }

    deliveryBoy.isAvailable = isAvailable;

    await deliveryBoy.save();

    res.status(200).json({

      success: true,

      message: "Availability updated successfully.",

      deliveryBoy,

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};


export const getAllDeliveryBoys = async (req, res) => {
  try {

    const {
      page = 1,
      limit = 10,
      search = "",
      verificationStatus,
      isAvailable,
    } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { vehicleNumber: { $regex: search, $options: "i" } },
      ];
    }

    if (verificationStatus) {
      query.verificationStatus = verificationStatus;
    }

    if (isAvailable !== undefined) {
      query.isAvailable = isAvailable === "true";
    }

    const total = await Delivery.countDocuments(query);

    const deliveryBoys = await Delivery.find(query)
      .select("-password")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      total,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit),
      deliveryBoys,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

export const getDeliveryBoyById = async (req, res) => {

  try {

    const deliveryBoy = await Delivery.findById(req.params.id)
      .select("-password");

    if (!deliveryBoy) {

      return res.status(404).json({
        success: false,
        message: "Delivery Boy not found.",
      });

    }

    res.status(200).json({
      success: true,
      deliveryBoy,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

export const updateDeliveryBoy = async (req, res) => {

  try {

    const deliveryBoy = await Delivery.findById(req.params.id);

    if (!deliveryBoy) {

      return res.status(404).json({
        success: false,
        message: "Delivery Boy not found.",
      });

    }

    const duplicate = await checkDuplicateDeliveryBoy({

      email: req.body.email || deliveryBoy.email,

      phone: req.body.phone || deliveryBoy.phone,

      aadhaarNumber:
        req.body.aadhaarNumber ||
        deliveryBoy.aadhaarNumber,

      excludeId: deliveryBoy._id,

    });

    if (duplicate) {

      return res.status(400).json({

        success: false,

        message:
          "Email / Phone / Aadhaar already exists.",

      });

    }

    Object.assign(deliveryBoy, {

      name: req.body.name ?? deliveryBoy.name,

      email: req.body.email ?? deliveryBoy.email,

      phone: req.body.phone ?? deliveryBoy.phone,

      vehicleType:
        req.body.vehicleType ??
        deliveryBoy.vehicleType,

      vehicleNumber:
        req.body.vehicleNumber ??
        deliveryBoy.vehicleNumber,

      aadhaarNumber:
        req.body.aadhaarNumber ??
        deliveryBoy.aadhaarNumber,

      address:
        req.body.address ??
        deliveryBoy.address,

    });

    if (req.body.password) {

      deliveryBoy.password = req.body.password;

    }

    const profile = await uploadFile(

      req.files?.profileImage?.[0],

      "greenbasket/delivery/profile"

    );

    if (profile) {

      deliveryBoy.profileImage = profile;

    }

    const docs = await uploadDocuments(req.files);

    Object.keys(docs).forEach((key) => {

      if (docs[key]) {

        deliveryBoy.documents[key] = docs[key];

      }

    });

    await deliveryBoy.save();

    res.status(200).json({

      success: true,

      message:
        "Delivery Boy updated successfully.",

      deliveryBoy,

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

export const deleteDeliveryBoy = async (req, res) => {

  try {

    const deliveryBoy = await Delivery.findById(
      req.params.id
    );

    if (!deliveryBoy) {

      return res.status(404).json({
        success: false,
        message: "Delivery Boy not found.",
      });

    }

    const activeOrder = await Order.findOne({

      deliveryBoy: deliveryBoy._id,

      orderStatus: {
        $in: [
          "Assigned",
          "Picked Up",
          "Out for Delivery",
        ],
      },

    });

    if (activeOrder) {

      return res.status(400).json({

        success: false,

        message:
          "Delivery Boy has active deliveries.",

      });

    }

    await deliveryBoy.deleteOne();

    res.status(200).json({

      success: true,

      message:
        "Delivery Boy deleted successfully.",

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};