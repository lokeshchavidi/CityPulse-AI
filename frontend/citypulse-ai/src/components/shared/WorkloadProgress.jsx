import SectionCard from "@/components/dashboard/SectionCard";

const WorkloadProgress = ({
  title = "Workload progress",
  subtitle = "Distribution across the current workflow.",
  dashboard = {},
  stages = [],
  totalKey = "total",
  resolvedKey = "resolved",
  loading = false,
}) => {
  const total = stages.reduce(
    (sum, stage) => sum + (dashboard?.[stage.key] ?? 0),
    0,
  );
  const explicitTotal = dashboard?.[totalKey];
  const denominator =
    typeof explicitTotal === "number" && explicitTotal > 0
      ? explicitTotal
      : total;
  const resolved = dashboard?.[resolvedKey] ?? 0;
  const resolutionRate =
    denominator > 0 ? Math.round((resolved / denominator) * 100) : 0;

  return (
    <SectionCard title={title} subtitle={subtitle}>
      {loading ? (
        <div className="animate-pulse space-y-4">
          <div className="h-3 w-full rounded-full bg-slate-200" />
          <div className="h-3 w-5/6 rounded-full bg-slate-200" />
          <div className="h-3 w-4/6 rounded-full bg-slate-200" />
        </div>
      ) : (
        <div className="space-y-5">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-3xl font-bold tracking-tight text-slate-900">
                {resolutionRate}%
              </p>
              <p className="mt-1 text-sm text-slate-500">Resolution rate</p>
            </div>
            <p className="text-sm text-slate-500">
              {resolved} of {denominator} resolved
            </p>
          </div>

          <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-green-600 transition-all duration-500"
              style={{ width: `${resolutionRate}%` }}
              role="progressbar"
              aria-valuenow={resolutionRate}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Resolution rate"
            />
          </div>

          <ul className="space-y-3">
            {stages.map((stage) => {
              const value = dashboard?.[stage.key] ?? 0;
              const percent =
                denominator > 0
                  ? Math.round((value / denominator) * 100)
                  : 0;

              return (
                <li key={stage.key}>
                  <div className="mb-1.5 flex items-center justify-between gap-3 text-sm">
                    <span className="font-medium text-slate-700">
                      {stage.label}
                    </span>
                    <span className="tabular-nums text-slate-500">
                      {value} · {percent}%
                    </span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full ${stage.tone} transition-all duration-500`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </SectionCard>
  );
};

export default WorkloadProgress;
