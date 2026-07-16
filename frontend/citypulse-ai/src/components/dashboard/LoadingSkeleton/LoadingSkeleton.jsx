const LoadingSkeleton = ({ cards = 6 }) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: cards }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          {/* Icon */}
          <div className="h-12 w-12 rounded-xl bg-slate-200" />

          {/* Value */}
          <div className="mt-6 h-8 w-20 rounded-lg bg-slate-200" />

          {/* Title */}
          <div className="mt-3 h-4 w-36 rounded bg-slate-200" />

          {/* Description */}
          <div className="mt-6 space-y-2">
            <div className="h-3 w-full rounded bg-slate-200" />
            <div className="h-3 w-5/6 rounded bg-slate-200" />
            <div className="h-3 w-2/3 rounded bg-slate-200" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
