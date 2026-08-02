import Order from "../../models/Order.js";
import Product from "../../models/Product.js";
import User from "../../models/User.js";
import Categories from "../../models/Categories.js";



export const getAdminDashboard = async (req, res) => {
  try {
    const [
      totalUsers,
      totalProducts,
      totalCategories,
      totalOrders,
    ] = await Promise.all([
      User.countDocuments(),
      Product.countDocuments(),
      Categories.countDocuments(),
      Order.countDocuments(),
    ]);

    const revenue = await Order.aggregate([
      {
        $match: {
          orderStatus: "Delivered",
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$totalAmount",
          },
        },
      },
    ]);

    const recentOrders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .limit(5);

    const lowStockProducts = await Product.find({
      stock: { $lte: 10 },
    })
      .select("name stock sellingPrice images")
      .limit(5);

    res.status(200).json({
      success: true,
      data: {
        summary: {
          totalUsers,
          totalProducts,
          totalCategories,
          totalOrders,
          totalRevenue: revenue[0]?.totalRevenue || 0,
        },
        recentOrders,
        lowStockProducts,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Order Statistics
export const getOrderStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();

    const pendingOrders = await Order.countDocuments({
      orderStatus: "Pending",
    });

    const confirmedOrders = await Order.countDocuments({
      orderStatus: "Confirmed",
    });

    const shippedOrders = await Order.countDocuments({
      orderStatus: "Shipped",
    });

    const deliveredOrders = await Order.countDocuments({
      orderStatus: "Delivered",
    });

    const cancelledOrders = await Order.countDocuments({
      orderStatus: "Cancelled",
    });

    const sales = await Order.aggregate([
      {
        $match: {
          orderStatus: "Delivered",
        },
      },
      {
        $group: {
          _id: null,
          totalSales: {
            $sum: "$totalAmount",
          },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      stats: {
        totalOrders,
        pendingOrders,
        confirmedOrders,
        shippedOrders,
        deliveredOrders,
        cancelledOrders,
        totalSales: sales.length ? sales[0].totalSales : 0,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getOrdersByStatus = async (req, res) => {
  try {
    const { status } = req.params;

    const orders = await Order.find({ orderStatus: status })
      .populate("user", "name email")
      .populate("items.product", "name images")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: orders.length,
      data: orders,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
};

export const getTodaysOrders = async (req, res) => {
  try {

    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const orders = await Order.find({
      createdAt: {
        $gte: start,
        $lte: end
      }
    })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: orders.length,
      data: orders
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch today's orders"
    });

  }
};

export const getMonthlyRevenue = async (req, res) => {

  try {

    const revenue = await Order.aggregate([

      {
        $match: {
          isPaid: true
        }
      },

      {
        $group: {
          _id: {
            month: {
              $month: "$createdAt"
            },
            year: {
              $year: "$createdAt"
            }
          },

          revenue: {
            $sum: "$totalAmount"
          },

          orders: {
            $sum: 1
          }

        }
      },

      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1
        }
      }

    ]);

    res.status(200).json({
      success: true,
      data: revenue
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch revenue"
    });

  }

};

export const getOrderStatusStats = async (req, res) => {
  try {
    const stats = await Order.aggregate([
      {
        $group: {
          _id: "$orderStatus",
          totalOrders: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          status: "$_id",
          totalOrders: 1,
        },
      },
      {
        $sort: {
          totalOrders: -1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getTopSellingProducts = async (req, res) => {
  try {
    const products = await Order.aggregate([
      {
        $match: {
          orderStatus: "Delivered",
        },
      },
      {
        $unwind: "$items"
      },
      {
        $group: {
          _id: "$orderItems.product",
          name: { $first: "$Items.name" },
          image: { $first: "$Items.image" },
          totalSold: { $sum: "$Items.quantity" },
          totalRevenue: {
            $sum: {
              $multiply: [
                "$Items.price",
                "$Items.quantity",
              ],
            },
          },
        },
      },
      {
        $sort: {
          totalSold: -1,
        },
      },
      {
        $limit: 10,
      },
    ]);

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getSalesByCategories = async (req, res) => {
  try {
    const CategoriesSales = await Order.aggregate([
      {
        $match: {
          orderStatus: "Delivered",
        },
      },
      {
        $unwind: "$items"
      },
      {
        $lookup: {
          from: "products",
          localField: "items.product",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $unwind: "$product",
      },
      {
        $lookup: {
          from: "categories",
          localField: "product.Categories",
          foreignField: "_id",
          as: "Categories",
        },
      },
      {
        $unwind: "$Categories",
      },
      {
        $group: {
          _id: "$Categories.name",
          totalSales: {
            $sum: {
              $multiply: [
                "$Items.price",
                "$Items.quantity",
              ],
            },
          },
          totalItemsSold: {
            $sum: "$Items.quantity",
          },
        },
      },
      {
        $sort: {
          totalSales: -1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      count: CategoriesSales.length,
      data: CategoriesSales,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getRecentOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .limit(10)
      .select(
        "_id user totalPrice paymentMethod paymentStatus orderStatus createdAt"
      );

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getLowStockProducts = async (req, res) => {
  try {
    const threshold = Number(req.query.threshold) || 10;

    const products = await Product.find({
      stock: { $lte: threshold },
    })
      .populate("Categories", "name")
      .select("name image stock price Categories")
      .sort({ stock: 1 });

    res.status(200).json({
      success: true,
      threshold,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};