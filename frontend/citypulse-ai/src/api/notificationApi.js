import axiosClient from "@/api/axiosClient";
import API_ENDPOINTS from "@/api/endpoints";

const getNotifications = async () => {
  const response = await axiosClient.get(API_ENDPOINTS.NOTIFICATION.ALL);

  return response.data.data;
};

const getUnreadNotifications = async () => {
  const response = await axiosClient.get(API_ENDPOINTS.NOTIFICATION.UNREAD);

  return response.data.data;
};

const getUnreadCount = async () => {
  const response = await axiosClient.get(
    API_ENDPOINTS.NOTIFICATION.UNREAD_COUNT,
  );

  return response.data.data;
};

const markAsRead = async (notificationId) => {
  const response = await axiosClient.patch(
    API_ENDPOINTS.NOTIFICATION.MARK_READ(notificationId),
  );

  return response.data.data;
};

const markAllAsRead = async () => {
  const response = await axiosClient.patch(
    API_ENDPOINTS.NOTIFICATION.MARK_ALL_READ,
  );

  return response.data.data;
};

const deleteNotification = async (notificationId) => {
  const response = await axiosClient.delete(
    API_ENDPOINTS.NOTIFICATION.DELETE(notificationId),
  );

  return response.data.data;
};

const deleteAllNotifications = async () => {
  const response = await axiosClient.delete(
    API_ENDPOINTS.NOTIFICATION.DELETE_ALL,
  );

  return response.data.data;
};

export const notificationApi = {
  getNotifications,
  getUnreadNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  deleteAllNotifications,
};
