import Notification from "../models/Notification.js";

/**
 * Helper Function
 * Is function ko Order, Payment, Delivery, Coupon modules se call karenge.
 */
export const createNotification = async ({
  recipientType,
  user = null,
  deliveryBoy = null,
  title,
  message,
  type = "SYSTEM",
  referenceId = null,
}) => {
  return await Notification.create({
    recipientType,
    user,
    deliveryBoy,
    title,
    message,
    type,
    referenceId,
  });
};

// Get Logged-in User Notifications
export const getMyNotifications = async (req, res) => {
  try {
    let filter = {};

    if (req.user.role === "admin") {
      filter = { recipientType: "Admin" };
    } else {
      filter = {
        user: req.user._id,
      };
    }

    const notifications = await Notification.find(filter).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      total: notifications.length,
      notifications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Mark Single Notification as Read
export const markNotificationAsRead = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    notification.isRead = true;

    await notification.save();

    res.status(200).json({
      success: true,
      message: "Notification marked as read",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Mark All Notifications as Read
export const markAllNotificationsAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { user: req.user._id, isRead: false },
      {
        isRead: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "All notifications marked as read",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Notification
export const deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    await notification.deleteOne();

    res.status(200).json({
      success: true,
      message: "Notification deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



export const getUnreadNotificationCount = async (req, res) => {
  try {
    const count = await Notification.countDocuments({
      $or: [
        { user: req.user._id },
        { deliveryBoy: req.user._id },
      ],
      isRead: false,
    });

    res.status(200).json({
      success: true,
      unreadCount: count,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// export const deleteNotification = async (req, res) => {
//   try {
//     const notification = await Notification.findOneAndDelete({
//       _id: req.params.id,
//       $or: [
//         { user: req.user._id },
//         { deliveryBoy: req.user._id },
//       ],
//     });

//     if (!notification) {
//       return res.status(404).json({
//         success: false,
//         message: "Notification not found.",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Notification deleted successfully.",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };