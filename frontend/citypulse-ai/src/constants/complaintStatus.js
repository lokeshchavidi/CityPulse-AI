/**
 * Mirrors the backend's ComplaintHistoryAction-driven lifecycle. These are
 * the values the ComplaintStatus enum can hold and that StatusBadge knows
 * how to color (see components/dashboard/StatusBadge).
 */
export const COMPLAINT_STATUS = {
  OPEN: "OPEN",
  UNDER_REVIEW: "UNDER_REVIEW",
  ASSIGNED: "ASSIGNED",
  IN_PROGRESS: "IN_PROGRESS",
  RESOLVED: "RESOLVED",
  REJECTED: "REJECTED",
  CLOSED: "CLOSED",
};

export const COMPLAINT_STATUS_OPTIONS = Object.values(COMPLAINT_STATUS).map(
  (status) => ({
    value: status,
    label: status.replaceAll("_", " "),
  }),
);

export default COMPLAINT_STATUS;
