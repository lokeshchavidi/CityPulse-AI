const variants = {
  OPEN: "bg-blue-50 text-blue-700 ring-1 ring-blue-200",

  UNDER_REVIEW: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",

  ASSIGNED: "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200",

  IN_PROGRESS: "bg-cyan-50 text-cyan-700 ring-1 ring-cyan-200",

  RESOLVED: "bg-green-50 text-green-700 ring-1 ring-green-200",

  REJECTED: "bg-red-50 text-red-700 ring-1 ring-red-200",

  CLOSED: "bg-slate-100 text-slate-700 ring-1 ring-slate-200",

  CRITICAL: "bg-red-100 text-red-800 ring-1 ring-red-300",

  HIGH: "bg-orange-100 text-orange-800 ring-1 ring-orange-300",

  MEDIUM: "bg-yellow-100 text-yellow-800 ring-1 ring-yellow-300",

  LOW: "bg-green-100 text-green-800 ring-1 ring-green-300",
};

const StatusBadge = ({ status }) => {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide whitespace-nowrap ring-inset ${
        variants[status] ?? "bg-slate-100 text-slate-700 ring-1 ring-slate-200"
      }`}
    >
      {status?.replaceAll("_", " ")}
    </span>
  );
};

export default StatusBadge;
