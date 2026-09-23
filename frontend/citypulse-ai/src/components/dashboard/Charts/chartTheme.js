export const CHART_COLORS = [
  "#2563eb",
  "#0d9488",
  "#f59e0b",
  "#8b5cf6",
  "#16a34a",
  "#ef4444",
  "#64748b",
];

export const STATUS_COLORS = {
  Open: "#f59e0b",
  "Under Review": "#0ea5e9",
  Assigned: "#0d9488",
  "In Progress": "#2563eb",
  Resolved: "#16a34a",
  Rejected: "#ef4444",
};

export const PRIORITY_COLORS = {
  Low: "#64748b",
  Medium: "#2563eb",
  High: "#f59e0b",
  Critical: "#ef4444",
};

export const emptyStatistics = {
  totalComplaints: 0,
  openComplaints: 0,
  resolvedComplaints: 0,
  criticalComplaints: 0,
  resolutionRate: 0,
  statusBreakdown: [],
  priorityBreakdown: [],
  departmentBreakdown: [],
  monthlyTrend: [],
};
