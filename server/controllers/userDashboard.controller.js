import User from "../models/User.js";
import Order from "../models/Order.js";
import Wishlist from "../models/Wishlist.js";
import Address from "../models/Address.js";
import Cart from "../models/Cart.js";
import Notification from "../models/Notification.js";
import Coupon from "../models/Coupon.js";
import Product from "../models/Product.js";

export const getUserDashboard = async (req, res) => {
    try {
        const userId = req.user._id;

        const [
            user,
            wishlist,
            addressCount,
            cart,
            unreadNotifications,
            recentOrders,
            recentNotifications,
            activeCoupons,
            recommendedProducts,
            orderStatusStats,
            spendingStats,
        ] = await Promise.all([

            User.findById(userId)
                .select("-password -refreshToken"),

            Wishlist.findOne({ user: userId }),

            Address.countDocuments({ user: userId }),

            Cart.findOne({ user: userId }),

            Notification.countDocuments({
                user: userId,
                isRead: false,
            }),

            Order.find({ user: userId })
                .sort({ createdAt: -1 })
                .limit(5)
                .select(
                    "orderNumber totalAmount orderStatus paymentStatus createdAt"
                ),

            Notification.find({ user: userId })
                .sort({ createdAt: -1 })
                .limit(5)
                .select("title message type isRead createdAt"),

            Coupon.find({
                isActive: true,
                expiresAt: { $gte: new Date() },
            })
                .limit(5)
                .select(
                    "code discountType discountValue expiresAt"
                ),

            Product.find({
                isActive: true,
            })
                .sort({
                    createdAt: -1,
                })
                .limit(8)
                .select(
                    "name slug images sellingPrice originalPrice averageRating"
                ),

            Order.aggregate([
                {
                    $match: {
                        user: userId,
                    },
                },
                {
                    $group: {
                        _id: "$orderStatus",
                        count: {
                            $sum: 1,
                        },
                    },
                },
            ]),

            Order.aggregate([
                {
                    $match: {
                        user: userId,
                        paymentStatus: "Paid",
                    },
                },
                {
                    $group: {
                        _id: null,
                        totalSpent: {
                            $sum: "$totalAmount",
                        },
                    },
                },
            ]),
        ]);

        const stats = {
            totalOrders: 0,
            pendingOrders: 0,
            confirmedOrders: 0,
            packedOrders: 0,
            shippedOrders: 0,
            deliveredOrders: 0,
            cancelledOrders: 0,
        };

        orderStatusStats.forEach((item) => {

            stats.totalOrders += item.count;

            switch (item._id) {

                case "Pending":
                    stats.pendingOrders = item.count;
                    break;

                case "Confirmed":
                    stats.confirmedOrders = item.count;
                    break;

                case "Packed":
                    stats.packedOrders = item.count;
                    break;

                case "Shipped":
                    stats.shippedOrders = item.count;
                    break;

                case "Delivered":
                    stats.deliveredOrders = item.count;
                    break;

                case "Cancelled":
                    stats.cancelledOrders = item.count;
                    break;

                default:
                    break;
            }
        });

        const totalSpent = spendingStats[0]?.totalSpent || 0;

        const averageOrderValue =
            stats.totalOrders > 0
                ? Math.round(totalSpent / stats.totalOrders)
                : 0;

        res.status(200).json({
            success: true,

            user,

            stats: {
                ...stats,

                wishlistItems:
                    wishlist?.products?.length ||
                    wishlist?.items?.length ||
                    0,

                cartItems:
                    cart?.totalItems ||
                    cart?.items?.length ||
                    0,

                savedAddresses: addressCount,

                unreadNotifications,

                totalSpent,

                averageOrderValue,
            },

            recentOrders,

            recentNotifications,

            activeCoupons,

            recommendedProducts,
        });

    } catch (error) {

        console.error("Dashboard Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to load dashboard",
            error: error.message,
        });
    }
};