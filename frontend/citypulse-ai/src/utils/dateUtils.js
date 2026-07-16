/**
 * Formats an ISO / LocalDateTime string into a readable date, e.g.
 * "10 Jul 2026".
 */
const formatDate = (value) => {
  if (!value) return "—";

  return new Date(value).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

/**
 * Formats an ISO / LocalDateTime string into a readable date + time, e.g.
 * "10 Jul 2026, 4:45 PM".
 */
const formatDateTime = (value) => {
  if (!value) return "—";

  return new Date(value).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

/**
 * Converts a timestamp into a relative "time ago" string, e.g.
 * "3 hours ago", "Just now".
 */
const timeAgo = (value) => {
  if (!value) return "—";

  const seconds = Math.floor((Date.now() - new Date(value).getTime()) / 1000);

  if (seconds < 60) return "Just now";

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);

    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
    }
  }

  return "Just now";
};

const dateUtils = {
  formatDate,
  formatDateTime,
  timeAgo,
};

export default dateUtils;
