import { ArrowRight, Clock3 } from "lucide-react";

import dateUtils from "@/utils/dateUtils";

const ComplaintTimeline = ({ history = [] }) => {
  return (
    <section className="rounded-xl border border-slate-200 bg-surface shadow-soft-sm">
      <div className="border-b border-slate-200 px-5 py-4 md:px-6">
        <h2 className="text-base font-semibold text-slate-900">Activity timeline</h2>
        <p className="mt-0.5 text-xs text-slate-500">
          Full audit trail of actions taken on this complaint
        </p>
      </div>

      <div className="p-5 md:p-6">
        {history.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-300 bg-canvas px-4 py-10 text-center">
            <p className="text-sm font-medium text-slate-700">No activity yet</p>
            <p className="mt-1 text-xs text-slate-500">
              Updates will appear as the complaint moves through the workflow.
            </p>
          </div>
        ) : (
          <ol className="relative space-y-0 border-l border-slate-200 pl-6">
            {history.map((item, index) => (
              <li key={item.historyId ?? index} className="relative pb-8 last:pb-0">
                <span className="absolute -left-[1.95rem] flex h-7 w-7 items-center justify-center rounded-full border border-brand-200 bg-brand-50 text-brand-800">
                  <Clock3 size={13} aria-hidden="true" />
                </span>

                <div className="rounded-lg border border-slate-200 bg-canvas p-4 transition hover:border-brand-200 hover:bg-surface">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                    <h3 className="text-sm font-semibold text-slate-900">
                      {item.action?.replaceAll("_", " ") || "Update"}
                    </h3>
                    <time className="shrink-0 text-xs text-slate-500">
                      {dateUtils.formatDateTime(item.createdAt)}
                    </time>
                  </div>

                  <p className="mt-1 text-xs text-slate-500">
                    By{" "}
                    <span className="font-medium text-slate-700">
                      {item.performedBy || "System"}
                    </span>
                  </p>

                  {item.remarks && (
                    <p className="mt-3 text-sm leading-relaxed text-slate-700">
                      {item.remarks}
                    </p>
                  )}

                  {(item.oldValue || item.newValue) && (
                    <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                      <span className="rounded-md bg-surface px-2 py-1 font-medium text-slate-600 ring-1 ring-slate-200">
                        {item.oldValue || "—"}
                      </span>
                      <ArrowRight size={12} className="text-slate-400" aria-hidden="true" />
                      <span className="rounded-md bg-brand-50 px-2 py-1 font-semibold text-brand-800 ring-1 ring-brand-200">
                        {item.newValue || "—"}
                      </span>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
};

export default ComplaintTimeline;
