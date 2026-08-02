import fs from "fs";
import mongoose from "mongoose";
import User from "../models/User.js";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import Address from "../models/Address.js";
import Payment from "../models/Payment.js";
import { sendEmail } from "../services/email.service.js";
import orderConfirmationTemplate from "../templates/orderConfirmation.template.js";
import { generateInvoice } from "../utils/generateInvoice.js";
import { createNotification } from "./notification.controller.js";

export const placeOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const { addressId, paymentMethod } = req.body;

    // Validate address
    const address = await Address.findOne({
      _id: addressId,
      user: userId,
    });

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    // Get cart
    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    let orderItems = [];
    let totalAmount = 0;
    let totalItems = 0;

    // Verify stock
    for (const item of cart.items) {
      const product = await Product.findById(item.product._id);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `${item.product.name} not found`,
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `${product.name} is out of stock`,
        });
      }

      // Reduce stock
      product.stock -= item.quantity;
      await product.save();

      const subtotal = product.sellingPrice * item.quantity;

      orderItems.push({
        product: product._id,
        name: product.name,
        image: product.images[0]?.url || "",
        price: product.sellingPrice,
        quantity: item.quantity,
        subtotal,
      });

      totalAmount += subtotal;
      totalItems += item.quantity;
    }

    // Generate Order Number
    const orderNumber =
      "GB" + Date.now() + Math.floor(Math.random() * 1000);

    // Create Order
   // Create Order
const order = await Order.create({
  orderNumber,
  user: userId,
  items: orderItems,
  address: addressId,

  totalAmount,
  finalAmount: totalAmount,

  totalItems,

  paymentMethod,
  paymentStatus: "Pending",

  discount: 0,
  coupon: null,
  couponCode: "",
});
    await createNotification({
      recipientType: "User",
      user: userId,
      title: "Order Placed",
      message: `Your order ${order.orderNumber} has been placed successfully.`,
      type: "ORDER",
      referenceId: order._id,
    });


    // Create Payment Record for COD
    if (paymentMethod === "COD") {
      await Payment.create({
        order: order._id,
        user: userId,
        amount: totalAmount,
        paymentMethod: "COD",
        paymentStatus: "Pending",
      });
    }

    // Clear Cart
    // Clear Cart
    cart.items = [];
    await cart.save();

    const user = await User.findById(userId);

    // ✅ YAHAN ADD KARO
    const invoicePath = await generateInvoice(order);

    // Send Order Confirmation Email
    try {
      await sendEmail({
        to: user.email,
        subject: `Order Confirmation - ${order.orderNumber}`,
        html: orderConfirmationTemplate(user.name, order),
        attachments: [
          {
            filename: `${order.orderNumber}.pdf`,
            path: invoicePath,
          },
        ],
      });

      fs.unlinkSync(invoicePath);

    } catch (error) {
      console.log("Email Error:", error.message);
    }

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get My Orders
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("address")
      .populate("items.product", "name images sellingPrice")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Order
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("address")
      .populate("user", "name email phone")
      .populate("items.product", "name images sellingPrice");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // User sirf apna order dekh sakta hai
    if (order.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Cancel Order
export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Sirf apna order cancel kar sakta hai
    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // Delivered ya Cancelled order dobara cancel nahi hoga
    if (
      order.orderStatus === "Delivered" ||
      order.orderStatus === "Cancelled"
    ) {
      return res.status(400).json({
        success: false,
        message: `Order is already ${order.orderStatus}`,
      });
    }

    // Stock wapas add karo
    for (const item of order.items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: item.quantity },
      });
    }

    order.orderStatus = "Cancelled";
    await order.save();

    res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Order Status
export const updateOrderStatus = async (req, res) => {
  try {
    
    const { status } = req.body;

    const { id } = req.params;

		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res.status(400).json({
				success: false,
				message: "Invalid Order ID",
		});
}

const order = await Order.findById(id);

   const allowedStatus = [
               "Pending",
              "Confirmed",
				"Packed",
				"Assigned",
					"Picked Up",
					"Out for Delivery",
							"Delivered",
							"Cancelled",
				];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Order Status",
      });
    }



    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.orderStatus = status;

    if (status === "Delivered") {
      order.deliveredAt = new Date();

      if (!order.isPaid && order.paymentMethod === "COD") {
        order.isPaid = true;
        order.paidAt = new Date();
      }
    }

    if (status === "Cancelled") {
      order.cancelledAt = new Date();
    }

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: order,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update order status",
    });
  }

};

// Get All Orders (Admin)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("address")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// const invoicePath = await generateInvoice(order);
// await sendEmail({
//   to: user.email,
//   subject: `Order Confirmation - ${order.orderNumber}`,
//   html: orderConfirmationTemplate(user.name, order),

//   attachments: [
//     {
//       filename: `${order.orderNumber}.pdf`,
//       path: invoicePath,
//     },
//   ],
// });