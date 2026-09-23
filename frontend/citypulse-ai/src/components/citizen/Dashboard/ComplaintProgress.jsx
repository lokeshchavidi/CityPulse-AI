import SectionCard from "@/components/dashboard/SectionCard";

const stages = [
  { key: "openComplaints", label: "Open", tone: "bg-amber-500" },
  { key: "underReviewComplaints", label: "Under Review", tone: "bg-sky-500" },
  { key: "assignedComplaints", label: "Assigned", tone: "bg-teal-500" },
  { key: "inProgressComplaints", label: "In Progress", tone: "bg-brand-600" },
  { key: "resolvedComplaints", label: "Resolved", tone: "bg-green-600" },
];

const ComplaintProgress = ({ dashboard, loading = false }) => {
  const total = dashboard?.totalComplaints ?? 0;
  const resolved = dashboard?.resolvedComplaints ?? 0;
  const resolutionRate = total > 0 ? Math.round((resolved / total) * 100) : 0;

  return (
    <SectionCard
      title="Complaint progress"
      subtitle="Distribution of your complaints across the resolution lifecycle."
    >
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
              {resolved} of {total} resolved
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
              const percent = total > 0 ? Math.round((value / total) * 100) : 0;

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

export default ComplaintProgress;
