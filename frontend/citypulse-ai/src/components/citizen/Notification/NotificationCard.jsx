import {
  Bell,
  CheckCircle2,
  ClipboardList,
  AlertTriangle,
  Info,
  Trash2,
} from "lucide-react";

import dateUtils from "@/utils/dateUtils";

const typeMeta = (type) => {
  const normalized = String(type || "").toUpperCase();

  if (normalized.includes("RESOLV") || normalized.includes("COMPLETE")) {
    return {
      icon: CheckCircle2,
      tone: "bg-green-50 text-green-700 ring-green-200",
    };
  }

  if (normalized.includes("ASSIGN") || normalized.includes("PROGRESS")) {
    return {
      icon: ClipboardList,
      tone: "bg-brand-50 text-brand-800 ring-brand-200",
    };
  }

  if (
    normalized.includes("REJECT") ||
    normalized.includes("CRITICAL") ||
    normalized.includes("ALERT")
  ) {
    return {
      icon: AlertTriangle,
      tone: "bg-amber-50 text-amber-800 ring-amber-200",
    };
  }

  if (normalized.includes("INFO") || normalized.includes("UPDATE")) {
    return {
      icon: Info,
      tone: "bg-sky-50 text-sky-800 ring-sky-200",
    };
  }

  return {
    icon: Bell,
    tone: "bg-slate-100 text-slate-600 ring-slate-200",
  };
};

const NotificationCard = ({ notification, onClick, onDelete, deleting }) => {
  const { icon: Icon, tone } = typeMeta(notification.type);
  const unread = !notification.read;

  return (
    <div
      className={`group flex w-full items-start gap-3 rounded-xl border px-4 py-4 transition duration-200 md:gap-4 md:px-5 ${
        unread
          ? "border-brand-200 bg-brand-50/40 hover:border-brand-300 hover:bg-brand-50"
          : "border-slate-200 bg-surface hover:border-slate-300 hover:bg-canvas"
      }`}
    >
      <button
        type="button"
        onClick={() => onClick?.(notification)}
        className="flex min-w-0 flex-1 items-start gap-3 text-left md:gap-4"
      >
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ring-1 ring-inset ${tone}`}
        >
          <Icon size={18} aria-hidden="true" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <h3
              className={`text-sm md:text-base ${
                unread
                  ? "font-semibold text-slate-900"
                  : "font-medium text-slate-800"
              }`}
            >
              {notification.title}
            </h3>

            <div className="flex shrink-0 items-center gap-2">
              {unread && (
                <span
                  className="h-2 w-2 rounded-full bg-brand-600"
                  aria-label="Unread"
                />
              )}
              <time className="text-xs text-slate-500">
                {dateUtils.timeAgo(notification.createdAt)}
              </time>
            </div>
          </div>

          <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
            {notification.message}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            {notification.complaintId && (
              <span className="rounded-md bg-surface px-2 py-1 text-[11px] font-semibold text-slate-600 ring-1 ring-slate-200">
                {notification.complaintId}
              </span>
            )}
            {notification.type && (
              <span className="rounded-md bg-surface px-2 py-1 text-[11px] font-medium uppercase tracking-wide text-slate-500 ring-1 ring-slate-200">
                {String(notification.type).replaceAll("_", " ")}
              </span>
            )}
            <span className="text-[11px] text-slate-400">
              {dateUtils.formatDateTime(notification.createdAt)}
            </span>
          </div>
        </div>
      </button>

      {onDelete && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(notification);
          }}
          disabled={deleting}
          aria-label="Delete notification"
          className="shrink-0 rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
        >
          <Trash2 size={16} aria-hidden="true" />
        </button>
      )}
    </div>
  );
};

export default NotificationCard;
