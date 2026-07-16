import { Bell, CheckCircle2 } from "lucide-react";

const NotificationCard = ({ notification, onClick }) => {
  return (
    <button
      type="button"
      onClick={() => onClick?.(notification)}
      className={`w-full rounded-2xl border p-5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
        notification.read
          ? "border-slate-200 bg-white"
          : "border-blue-200 bg-blue-50/40"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-4">
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${
              notification.read
                ? "border-slate-200 bg-slate-50"
                : "border-blue-100 bg-white"
            }`}
          >
            <Bell
              size={20}
              strokeWidth={2.2}
              className={notification.read ? "text-slate-500" : "text-blue-600"}
            />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-semibold text-slate-900">
              {notification.title}
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              {notification.message}
            </p>

            <p className="mt-3 text-xs text-slate-400">
              {new Date(notification.createdAt).toLocaleString()}
            </p>
          </div>
        </div>

        {!notification.read && (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm">
            <CheckCircle2
              size={20}
              strokeWidth={2.2}
              className="text-blue-600"
            />
          </div>
        )}
      </div>
    </button>
  );
};

export default NotificationCard;
