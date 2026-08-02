import crypto from "crypto";
import mongoose from "mongoose";

import razorpay from "../config/razorpay.js";

import Order from "../models/Order.js";
import Payment from "../models/Payment.js";
import Product from "../models/Product.js";
import Coupon from "../models/Coupon.js";

const calculateOrderAmount = (order) => {
    return Number(order.totalAmount.toFixed(2));
};



export const createPaymentOrder = async (req, res) => {
    const session = await mongoose.startSession();

    try {

        session.startTransaction();

        const { orderId } = req.body;

        if (!orderId) {
            await session.abortTransaction();

            return res.status(400).json({
                success: false,
                message: "Order ID is required",
            });
        }

        const order = await Order.findById(orderId).session(session);

        if (!order) {

            await session.abortTransaction();

            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        // Ownership Check

        if (order.user.toString() !== req.user._id.toString()) {

            await session.abortTransaction();

            return res.status(403).json({
                success: false,
                message: "Unauthorized access",
            });
        }

        // Already Paid

        if (order.paymentStatus === "Paid") {

            await session.abortTransaction();

            return res.status(400).json({
                success: false,
                message: "Order already paid",
            });
        }

        // Existing Pending Payment

        const existingPayment = await Payment.findOne({

            order: order._id,

            paymentStatus: "Pending",

        }).session(session);

        if (existingPayment) {

            await session.commitTransaction();

            session.endSession();

            return res.status(200).json({

                success: true,

                message: "Pending payment already exists",

                payment: existingPayment,

            });

        }

        const razorpayOrder = await razorpay.orders.create({

            amount: calculateOrderAmount(order) * 100,

            currency: "INR",

            receipt: `ORDER_${order.orderNumber}`,

            payment_capture: 1,

        });

        const payment = await Payment.create([

            {

                order: order._id,

                user: req.user._id,

                amount: calculateOrderAmount(order),

                currency: "INR",

                paymentMethod: "ONLINE",

                paymentStatus: "Pending",

                razorpayOrderId: razorpayOrder.id,

            },

        ], { session });

        await session.commitTransaction();

        session.endSession();

        return res.status(201).json({

            success: true,

            message: "Payment order created",

            razorpayOrder,

            payment: payment[0],

        });

    } catch (error) {

        await session.abortTransaction();

        session.endSession();

        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};


export const verifyPayment = async (req, res) => {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        } = req.body;

        // Validation
        if (
            !razorpay_order_id ||
            !razorpay_payment_id ||
            !razorpay_signature
        ) {
            await session.abortTransaction();
            session.endSession();

            return res.status(400).json({
                success: false,
                message: "Payment verification data is missing",
            });
        }

        // Signature Verify
        const generatedSignature = crypto
            .createHmac(
                "sha256",
                process.env.RAZORPAY_KEY_SECRET
            )
            .update(
                `${razorpay_order_id}|${razorpay_payment_id}`
            )
            .digest("hex");

        if (generatedSignature !== razorpay_signature) {
            await session.abortTransaction();
            session.endSession();

            return res.status(400).json({
                success: false,
                message: "Invalid payment signature",
            });
        }

        // Payment
        const payment = await Payment.findOne({
            razorpayOrderId: razorpay_order_id,
        }).session(session);

        if (!payment) {
            await session.abortTransaction();
            session.endSession();

            return res.status(404).json({
                success: false,
                message: "Payment not found",
            });
        }

        // Already Verified
        if (payment.paymentStatus === "Success") {
            await session.abortTransaction();
            session.endSession();

            return res.status(400).json({
                success: false,
                message: "Payment already verified",
            });
        }

        // Order
        const order = await Order.findById(payment.order).session(session);

        if (!order) {
            await session.abortTransaction();
            session.endSession();

            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        // Update Payment
        payment.paymentStatus = "Success";
        payment.transactionId = razorpay_payment_id;
        payment.razorpayPaymentId = razorpay_payment_id;
        payment.razorpaySignature = razorpay_signature;
        payment.paidAt = new Date();

        await payment.save({ session });

        // Update Order
        order.paymentStatus = "Paid";

        await createNotification({
            recipientType: "User",
            user: order.user,
            title: "Payment Successful",
            message: `Payment received for Order ${order.orderNumber}.`,
            type: "PAYMENT",
            referenceId: order._id,
        });

        await order.save({ session });

        // Update Product Stock
        for (const item of order.items) {
            const product = await Product.findById(
                item.product
            ).session(session);

            if (!product) {
                throw new Error("Product not found");
            }

            if (product.stock < item.quantity) {
                throw new Error(
                    `${product.name} is out of stock`
                );
            }

            product.stock -= item.quantity;
            product.sold += item.quantity;

            await product.save({ session });
        }

        // Coupon Usage
        if (order.coupon) {
            await Coupon.findByIdAndUpdate(
                order.coupon,
                {
                    $inc: {
                        usedCount: 1,
                    },
                },
                { session }
            );
        }

        await session.commitTransaction();
        session.endSession();

        return res.status(200).json({
            success: true,
            message: "Payment verified successfully",
            payment,
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
// ======================================
// Get My Payments
// ======================================
export const getMyPayments = async (req, res) => {
    try {
        const payments = await Payment.find({
            user: req.user._id,
        })
            .populate({
                path: "order",
                select:
                    "orderNumber finalAmount paymentStatus orderStatus paymentMethod createdAt",
            })
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: payments.length,
            payments,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// ======================================
// Get Payment By Id
// ======================================
export const getPaymentById = async (req, res) => {

    try {

        const payment = await Payment.findById(req.params.id)
            .populate("user", "name email phone")
            .populate("order");

        if (!payment) {

            return res.status(404).json({
                success: false,
                message: "Payment not found",
            });

        }

        // Owner OR Admin

        if (
            payment.user._id.toString() !== req.user._id.toString() &&
            req.user.role !== "Admin"
        ) {

            return res.status(403).json({
                success: false,
                message: "Access denied",
            });

        }

        return res.status(200).json({

            success: true,

            payment,

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

// ======================================
// Admin - Get All Payments
// ======================================

export const getAllPayments = async (req, res) => {

    try {

        const page = Number(req.query.page) || 1;

        const limit = Number(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const total = await Payment.countDocuments();

        const payments = await Payment.find()
            .populate("user", "name email")
            .populate(
                "order",
                "orderNumber finalAmount paymentStatus orderStatus"
            )
            .sort({
                createdAt: -1,
            })
            .skip(skip)
            .limit(limit);

        return res.status(200).json({

            success: true,

            currentPage: page,

            totalPages: Math.ceil(total / limit),

            totalPayments: total,

            payments,

        });

    } catch (error) {

        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

// GET PAYMENT STATS
export const getPaymentStats = async (req, res) => {
    try {
        const stats = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    totalOrders: { $sum: 1 },

                    totalRevenue: {
                        $sum: "$totalAmount",
                    },

                    paidAmount: {
                        $sum: {
                            $cond: [{ $eq: ["$isPaid", true] }, "$totalAmount", 0],
                        },
                    },

                    pendingAmount: {
                        $sum: {
                            $cond: [{ $eq: ["$isPaid", false] }, "$totalAmount", 0],
                        },
                    },

                    codOrders: {
                        $sum: {
                            $cond: [{ $eq: ["$paymentMethod", "COD"] }, 1, 0],
                        },
                    },

                    onlineOrders: {
                        $sum: {
                            $cond: [{ $eq: ["$paymentMethod", "ONLINE"] }, 1, 0],
                        },
                    },
                },
            },
        ]);

        res.status(200).json({
            success: true,
            data: stats[0] || {},
        });
    } catch (error) {
        console.error("Payment Stats Error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch payment stats",
        });
    }
};


// MARK COD AS PAID
export const markCODPaid = async (req, res) => {
    try {
        const { orderId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Order ID",
            });
        }

        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        if (order.paymentMethod !== "COD") {
            return res.status(400).json({
                success: false,
                message: "This is not a COD order",
            });
        }

        if (order.isPaid) {
            return res.status(400).json({
                success: false,
                message: "Order already marked as paid",
            });
        }

        order.isPaid = true;
        order.paidAt = new Date();

        await order.save();

        res.status(200).json({
            success: true,
            message: "COD order marked as paid successfully",
            data: order,
        });
    } catch (error) {
        console.error("Mark COD Paid Error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update payment status",
        });
    }
};