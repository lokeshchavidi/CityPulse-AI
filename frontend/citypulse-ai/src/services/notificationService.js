import { notificationApi } from "@/api/notificationApi";

const getNotifications = async () => {
  return await notificationApi.getNotifications();
};

const getUnreadNotifications = async () => {
  return await notificationApi.getUnreadNotifications();
};

const getUnreadCount = async () => {
  return await notificationApi.getUnreadCount();
};

const markAsRead = async (notificationId) => {
  return await notificationApi.markAsRead(notificationId);
};

const markAllAsRead = async () => {
  return await notificationApi.markAllAsRead();
};

const notificationService = {
  getNotifications,
  getUnreadNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
};

export default notificationService;
