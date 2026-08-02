import Notification from "../models/Notification.js";

export const createNotification = async ({
  recipientType,
  user = null,
  deliveryBoy = null,
  title,
  message,
  type,
  referenceId = null,
}) => {
  try {
    const notification = await Notification.create({
      recipientType,
      user,
      deliveryBoy,
      title,
      message,
      type,
      referenceId,
    });

    return notification;
  } catch (error) {
    console.error("Notification Error:", error.message);
  }
};