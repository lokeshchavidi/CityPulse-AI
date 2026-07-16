import { useContext, useState } from "react";
import { CheckCheck } from "lucide-react";
import toast from "react-hot-toast";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import Button from "@/components/common/Button/Button";
import { NotificationList } from "@/components/citizen/Notification";

import notificationService from "@/services/notificationService";
import NotificationContext from "@/context/NotificationContext";

const Notifications = () => {
  const { notifications, refreshNotifications } =
    useContext(NotificationContext);

  const [loading, setLoading] = useState(false);

  const handleNotificationClick = async (notification) => {
    if (notification.read) return;

    try {
      await notificationService.markAsRead(notification.notificationId);

      await refreshNotifications();
    } catch (error) {
      console.error(error);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await notificationService.markAllAsRead();

      await refreshNotifications();

      toast.success("All notifications marked as read.");
    } catch (error) {
      toast.error("Couldn't mark notifications as read.");
      console.error(error);
    }
  };

  const hasUnread = notifications.some((item) => !item.read);

  return (
    <div className="space-y-8">
      <DashboardHeader
        title="Notifications"
        subtitle="Stay updated on every stage of your complaints."
        action={
          hasUnread && (
            <Button
              variant="outline"
              leftIcon={<CheckCheck size={18} />}
              onClick={handleMarkAllRead}
            >
              Mark All as Read
            </Button>
          )
        }
      />

      <NotificationList
        notifications={notifications}
        loading={loading}
        onNotificationClick={handleNotificationClick}
      />
    </div>
  );
};

export default Notifications;
