export const COMPLAINT_PRIORITY = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
  CRITICAL: "CRITICAL",
};

export const COMPLAINT_PRIORITY_OPTIONS = Object.values(
  COMPLAINT_PRIORITY,
).map((priority) => ({
  value: priority,
  label: priority.charAt(0) + priority.slice(1).toLowerCase(),
}));

export default COMPLAINT_PRIORITY;
