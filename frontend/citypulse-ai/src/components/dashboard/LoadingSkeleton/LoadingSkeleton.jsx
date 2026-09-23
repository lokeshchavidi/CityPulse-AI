/**
 * Loading placeholder.
 * - default / cards: stats-card grid
 * - variant="list": stacked rows for tables/queues
 * - variant="detail": taller blocks for detail pages
 * Legacy `rows` prop maps to list variant for older call sites.
 */
const LoadingSkeleton = ({ cards = 6, rows, variant }) => {
  const resolvedVariant =
    variant ?? (typeof rows === "number" ? "list" : "cards");
  const count = rows ?? cards;

  if (resolvedVariant === "list") {
    return (
      <div className="animate-pulse space-y-3">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className="h-14 rounded-lg border border-slate-200 bg-slate-100"
          />
        ))}
      </div>
    );
  }

  if (resolvedVariant === "detail") {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-20 rounded-xl border border-slate-200 bg-slate-100" />
        <div className="grid gap-6 xl:grid-cols-5">
          <div className="space-y-4 xl:col-span-3">
            <div className="h-64 rounded-xl border border-slate-200 bg-slate-100" />
            <div className="h-40 rounded-xl border border-slate-200 bg-slate-100" />
          </div>
          <div className="h-80 rounded-xl border border-slate-200 bg-slate-100 xl:col-span-2" />
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-xl border border-slate-200 bg-surface p-5 shadow-soft-sm"
        >
          <div className="h-11 w-11 rounded-lg bg-slate-200" />
          <div className="mt-5 h-8 w-16 rounded-md bg-slate-200" />
          <div className="mt-3 h-4 w-28 rounded bg-slate-200" />
          <div className="mt-2 h-3 w-full rounded bg-slate-100" />
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
