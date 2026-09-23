import { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, CheckCheck, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

import Button from "@/components/common/Button/Button";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import { NotificationList } from "@/components/citizen/Notification";

import notificationService from "@/services/notificationService";
import NotificationContext from "@/context/NotificationContext";
import useAuth from "@/hooks/useAuth";
import { ROLES } from "@/constants/roles";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "unread", label: "Unread" },
  { id: "read", label: "Read" },
];

const complaintPathForRole = (role, complaintId) => {
  if (!complaintId) return null;

  switch (role) {
    case ROLES.CITIZEN:
      return `/citizen/complaints/${complaintId}`;
    case ROLES.OFFICER:
      return `/officer/complaints/${complaintId}`;
    case ROLES.DEPARTMENT_MANAGER:
      return `/department-manager/complaints/${complaintId}`;
    default:
      return null;
  }
};

const Notifications = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { notifications = [], refreshNotifications, unreadCount = 0 } =
    useContext(NotificationContext) ?? {};

  const [filter, setFilter] = useState("all");
  const [markingAll, setMarkingAll] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [clearingAll, setClearingAll] = useState(false);
  const [confirmClearAll, setConfirmClearAll] = useState(false);

  const filtered = useMemo(() => {
    if (filter === "unread") {
      return notifications.filter((item) => !item.read);
    }
    if (filter === "read") {
      return notifications.filter((item) => item.read);
    }
    return notifications;
  }, [notifications, filter]);

  const handleNotificationClick = async (notification) => {
    try {
      if (!notification.read) {
        await notificationService.markAsRead(notification.notificationId);
        await refreshNotifications();
      }
    } catch (error) {
      console.error(error);
    }

    const path = complaintPathForRole(user?.role, notification.complaintId);
    if (path) {
      navigate(path);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      setMarkingAll(true);
      await notificationService.markAllAsRead();
      await refreshNotifications();
      toast.success("All notifications marked as read.");
    } catch (error) {
      toast.error("Couldn't mark notifications as read.");
      console.error(error);
    } finally {
      setMarkingAll(false);
    }
  };

  const handleDelete = async (notification) => {
    try {
      setDeletingId(notification.notificationId);
      await notificationService.deleteNotification(notification.notificationId);
      await refreshNotifications();
      toast.success("Notification deleted.");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ?? "Couldn't delete notification.",
      );
      console.error(error);
    } finally {
      setDeletingId(null);
    }
  };

  const handleClearAll = async () => {
    try {
      setClearingAll(true);
      await notificationService.deleteAllNotifications();
      await refreshNotifications();
      toast.success("All notifications cleared.");
      setConfirmClearAll(false);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ?? "Couldn't clear notifications.",
      );
      console.error(error);
    } finally {
      setClearingAll(false);
    }
  };

  const hasUnread = unreadCount > 0 || notifications.some((item) => !item.read);
  const hasNotifications = notifications.length > 0;

  const emptyCopy =
    filter === "unread"
      ? {
          title: "No unread notifications",
          description: "You're caught up. Switch to All to see earlier updates.",
        }
      : filter === "read"
        ? {
            title: "No read notifications",
            description: "Read items will appear here after you open them.",
          }
        : {
            title: "No notifications yet",
            description:
              "Updates about complaints and workflow changes will show up here.",
          };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-800">
              <Bell size={18} aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                Notifications
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                {hasUnread
                  ? `${unreadCount} unread update${unreadCount === 1 ? "" : "s"}`
                  : "Stay informed about complaint workflow updates"}
              </p>
            </div>
          </div>
        </div>

        {hasNotifications && (
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
            {hasUnread && (
              <Button
                variant="outline"
                leftIcon={<CheckCheck size={18} aria-hidden="true" />}
                onClick={handleMarkAllRead}
                loading={markingAll}
                className="w-full sm:w-auto"
              >
                Mark all as read
              </Button>
            )}

            <Button
              variant="danger"
              leftIcon={<Trash2 size={18} aria-hidden="true" />}
              onClick={() => setConfirmClearAll(true)}
              className="w-full sm:w-auto"
            >
              Clear all
            </Button>
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {FILTERS.map((item) => {
          const active = filter === item.id;
          const count =
            item.id === "all"
              ? notifications.length
              : item.id === "unread"
                ? notifications.filter((n) => !n.read).length
                : notifications.filter((n) => n.read).length;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setFilter(item.id)}
              className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-semibold transition ${
                active
                  ? "bg-brand-700 text-white shadow-soft-sm"
                  : "bg-surface text-slate-600 ring-1 ring-slate-200 hover:bg-canvas"
              }`}
            >
              {item.label}
              <span
                className={`rounded-md px-1.5 py-0.5 text-[11px] ${
                  active ? "bg-surface/20 text-white" : "bg-slate-100 text-slate-500"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <NotificationList
        notifications={filtered}
        onNotificationClick={handleNotificationClick}
        onDelete={handleDelete}
        deletingId={deletingId}
        emptyTitle={emptyCopy.title}
        emptyDescription={emptyCopy.description}
      />

      <ConfirmDialog
        open={confirmClearAll}
        title="Clear all notifications?"
        description="This permanently deletes every notification in your inbox. This cannot be undone."
        confirmLabel="Clear all"
        variant="danger"
        loading={clearingAll}
        onConfirm={handleClearAll}
        onCancel={() => setConfirmClearAll(false)}
      />
    </div>
  );
};

export default Notifications;
