import { Link } from "react-router-dom";
import { Bell } from "lucide-react";

import SectionCard from "@/components/dashboard/SectionCard";
import Button from "@/components/common/Button/Button";
import useNotifications from "@/hooks/useNotifications";
import dateUtils from "@/utils/dateUtils";

const DashboardNotifications = () => {
  const { notifications = [], unreadCount = 0 } = useNotifications() ?? {};
  const recent = notifications.slice(0, 4);

  return (
    <SectionCard
      title="Notifications"
      subtitle={
        unreadCount > 0
          ? `${unreadCount} unread update${unreadCount === 1 ? "" : "s"}`
          : "Latest updates on your complaints"
      }
      action={
        <Link to="/notifications">
          <Button size="sm" variant="outline">
            Open inbox
          </Button>
        </Link>
      }
    >
      {recent.length === 0 ? (
        <div className="flex flex-col items-center py-8 text-center">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
            <Bell size={18} aria-hidden="true" />
          </div>
          <p className="mt-3 text-sm font-medium text-slate-700">
            No notifications yet
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Updates will appear as your complaints move forward.
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-slate-100">
          {recent.map((notification) => (
            <li key={notification.notificationId}>
              <Link
                to="/notifications"
                className="flex gap-3 py-3 transition hover:bg-slate-50/80"
              >
                <span
                  className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                    notification.read ? "bg-slate-300" : "bg-brand-600"
                  }`}
                  aria-hidden="true"
                />
                <div className="min-w-0">
                  <p
                    className={`truncate text-sm ${
                      notification.read
                        ? "font-medium text-slate-700"
                        : "font-semibold text-slate-900"
                    }`}
                  >
                    {notification.title}
                  </p>
                  <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-slate-500">
                    {notification.message}
                  </p>
                  <p className="mt-1 text-[11px] text-slate-400">
                    {dateUtils.timeAgo(notification.createdAt)}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </SectionCard>
  );
};

export default DashboardNotifications;
