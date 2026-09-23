import { Check } from "lucide-react";

import StatusBadge from "@/components/dashboard/StatusBadge";
import { COMPLAINT_STATUS } from "@/constants/complaintStatus";

const STAGES = [
  {
    key: COMPLAINT_STATUS.OPEN,
    label: "Submitted",
    description: "Complaint received",
  },
  {
    key: COMPLAINT_STATUS.UNDER_REVIEW,
    label: "Under review",
    description: "Department assessment",
  },
  {
    key: COMPLAINT_STATUS.ASSIGNED,
    label: "Assigned",
    description: "Officer allocated",
  },
  {
    key: COMPLAINT_STATUS.IN_PROGRESS,
    label: "In progress",
    description: "Work underway",
  },
  {
    key: COMPLAINT_STATUS.RESOLVED,
    label: "Resolved",
    description: "Issue closed",
  },
];

const stageIndex = (status) => {
  if (status === COMPLAINT_STATUS.CLOSED) return STAGES.length - 1;
  if (status === COMPLAINT_STATUS.REJECTED) return -1;
  const idx = STAGES.findIndex((s) => s.key === status);
  return idx >= 0 ? idx : 0;
};

const ComplaintStatusTracker = ({ status }) => {
  const current = stageIndex(status);
  const rejected = status === COMPLAINT_STATUS.REJECTED;
  const completedFlow =
    status === COMPLAINT_STATUS.RESOLVED ||
    status === COMPLAINT_STATUS.CLOSED;

  const lastCompleted = rejected
    ? -1
    : completedFlow
      ? STAGES.length - 1
      : Math.max(current - 1, -1);

  // Track spans circle-centers: 10% → 90% for 5 equal columns.
  const trackStart = 10;
  const trackSpan = 80;
  const progressPercent = rejected
    ? 0
    : completedFlow
      ? 100
      : STAGES.length <= 1
        ? 0
        : (current / (STAGES.length - 1)) * 100;

  const summary = rejected
    ? "This complaint was rejected and is no longer in the resolution workflow."
    : completedFlow
      ? "All workflow stages are complete."
      : `Step ${current + 1} of ${STAGES.length} · ${STAGES[current]?.label}`;

  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-surface shadow-soft-sm">
      <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between md:px-6">
        <div>
          <h2 className="text-base font-semibold tracking-tight text-slate-900">
            Resolution progress
          </h2>
          <p className="mt-1 text-sm text-slate-500">{summary}</p>
        </div>
        <StatusBadge status={status} />
      </div>

      <div className="px-5 py-6 md:px-8 md:py-7">
        {/* Desktop: equal-width columns, every step centered */}
        <div className="relative hidden sm:block">
          <div
            className="absolute top-4 h-0.5 rounded-full bg-slate-200"
            style={{ left: `${trackStart}%`, width: `${trackSpan}%` }}
            aria-hidden="true"
          />
          <div
            className={`absolute top-4 h-0.5 rounded-full transition-all duration-500 ${
              rejected ? "bg-red-400" : "bg-brand-600"
            }`}
            style={{
              left: `${trackStart}%`,
              width: `${(trackSpan * progressPercent) / 100}%`,
            }}
            aria-hidden="true"
          />

          <ol className="relative z-10 grid grid-cols-5 gap-0">
            {STAGES.map((stage, index) => {
              const done =
                !rejected &&
                (index < current || (completedFlow && index <= current));
              const active = !rejected && index === current && !completedFlow;

              return (
                <li
                  key={stage.key}
                  className="flex flex-col items-center px-1 text-center"
                >
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                      done
                        ? "bg-brand-700 text-white shadow-soft-sm"
                        : active
                          ? "bg-surface text-brand-800 ring-[3px] ring-brand-600"
                          : "bg-surface text-slate-400 ring-2 ring-slate-200"
                    }`}
                    aria-current={active ? "step" : undefined}
                  >
                    {done ? (
                      <Check size={15} strokeWidth={2.5} aria-hidden="true" />
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>

                  <p
                    className={`mt-3 text-sm font-semibold ${
                      done || active ? "text-slate-900" : "text-slate-400"
                    }`}
                  >
                    {stage.label}
                  </p>
                  <p
                    className={`mt-0.5 text-xs leading-snug ${
                      done || active ? "text-slate-500" : "text-slate-400"
                    }`}
                  >
                    {stage.description}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Mobile vertical stepper */}
        <ol className="space-y-0 sm:hidden">
          {STAGES.map((stage, index) => {
            const done =
              !rejected &&
              (index < current || (completedFlow && index <= current));
            const active = !rejected && index === current && !completedFlow;
            const isLast = index === STAGES.length - 1;
            const lineFilled = !rejected && index <= lastCompleted;

            return (
              <li key={stage.key} className="relative flex gap-3 pb-6 last:pb-0">
                {!isLast && (
                  <span
                    className={`absolute left-[0.95rem] top-8 h-[calc(100%-0.5rem)] w-0.5 ${
                      lineFilled ? "bg-brand-600" : "bg-slate-200"
                    }`}
                    aria-hidden="true"
                  />
                )}

                <div
                  className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    done
                      ? "bg-brand-700 text-white"
                      : active
                        ? "bg-surface text-brand-800 ring-[3px] ring-brand-600"
                        : "bg-surface text-slate-400 ring-2 ring-slate-200"
                  }`}
                  aria-current={active ? "step" : undefined}
                >
                  {done ? (
                    <Check size={15} strokeWidth={2.5} aria-hidden="true" />
                  ) : (
                    index + 1
                  )}
                </div>

                <div className="min-w-0 pt-0.5">
                  <p
                    className={`text-sm font-semibold ${
                      done || active ? "text-slate-900" : "text-slate-400"
                    }`}
                  >
                    {stage.label}
                  </p>
                  <p
                    className={`mt-0.5 text-xs ${
                      done || active ? "text-slate-500" : "text-slate-400"
                    }`}
                  >
                    {stage.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>

        {rejected && (
          <p className="mt-5 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-700">
            This complaint was rejected and will not proceed through the
            remaining stages.
          </p>
        )}
      </div>
    </section>
  );
};

export default ComplaintStatusTracker;
