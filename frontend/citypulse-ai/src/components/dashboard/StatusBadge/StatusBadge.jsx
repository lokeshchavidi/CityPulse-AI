const variants = {
  OPEN: "bg-brand-50 text-brand-800 ring-brand-200",

  UNDER_REVIEW:
    "bg-[var(--color-warning-bg)] text-[var(--color-warning-fg)] ring-[var(--color-warning-ring)]",

  ASSIGNED:
    "bg-[var(--color-sky-bg)] text-[var(--color-sky-fg)] ring-[var(--color-sky-ring)]",

  IN_PROGRESS:
    "bg-[var(--color-cyan-bg)] text-[var(--color-cyan-fg)] ring-[var(--color-cyan-ring)]",

  RESOLVED:
    "bg-[var(--color-success-bg)] text-[var(--color-success-fg)] ring-[var(--color-success-ring)]",

  REJECTED:
    "bg-[var(--color-danger-bg)] text-[var(--color-danger-fg)] ring-[var(--color-danger-ring)]",

  CLOSED: "bg-slate-100 text-slate-700 ring-slate-200",

  CRITICAL:
    "bg-[var(--color-danger-bg)] text-[var(--color-danger-fg)] ring-[var(--color-danger-ring)]",

  HIGH: "bg-[var(--color-orange-bg)] text-[var(--color-orange-fg)] ring-[var(--color-orange-ring)]",

  MEDIUM:
    "bg-[var(--color-warning-bg)] text-[var(--color-warning-fg)] ring-[var(--color-warning-ring)]",

  LOW: "bg-[var(--color-success-bg)] text-[var(--color-success-fg)] ring-[var(--color-success-ring)]",
};

const StatusBadge = ({ status, className = "" }) => {
  const label = status?.replaceAll("_", " ") ?? "Unknown";

  return (
    <span
      className={`inline-flex items-center justify-center rounded-md px-2.5 py-1 text-xs font-semibold tracking-wide whitespace-nowrap ring-1 ring-inset ${
        variants[status] ?? "bg-slate-100 text-slate-700 ring-slate-200"
      } ${className}`}
      title={label}
    >
      {label}
    </span>
  );
};

export default StatusBadge;
