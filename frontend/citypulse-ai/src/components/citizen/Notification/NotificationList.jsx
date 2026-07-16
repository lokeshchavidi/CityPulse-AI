import EmptyState from "@/components/dashboard/EmptyState";
import LoadingSkeleton from "@/components/dashboard/LoadingSkeleton";

import NotificationCard from "./NotificationCard";

const NotificationList = ({
  notifications = [],
  loading = false,
  onNotificationClick,
}) => {
  if (loading) {
    return <LoadingSkeleton />;
  }

  if (notifications.length === 0) {
    return (
      <EmptyState
        title="No notifications"
        description="You're all caught up."
      />
    );
  }

  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <NotificationCard
          key={notification.notificationId}
          notification={notification}
          onClick={onNotificationClick}
        />
      ))}
    </div>
  );
};

export default NotificationList;
