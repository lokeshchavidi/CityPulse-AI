import EmptyState from "@/components/dashboard/EmptyState";
import LoadingSkeleton from "@/components/dashboard/LoadingSkeleton";

import NotificationCard from "./NotificationCard";

const NotificationList = ({
  notifications = [],
  loading = false,
  onNotificationClick,
  onDelete,
  deletingId = null,
  emptyTitle = "No notifications",
  emptyDescription = "You're all caught up. New updates will appear here.",
}) => {
  if (loading) {
    return <LoadingSkeleton rows={4} />;
  }

  if (notifications.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-canvas">
        <EmptyState title={emptyTitle} description={emptyDescription} />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {notifications.map((notification) => (
        <NotificationCard
          key={notification.notificationId}
          notification={notification}
          onClick={onNotificationClick}
          onDelete={onDelete}
          deleting={deletingId === notification.notificationId}
        />
      ))}
    </div>
  );
};

export default NotificationList;
