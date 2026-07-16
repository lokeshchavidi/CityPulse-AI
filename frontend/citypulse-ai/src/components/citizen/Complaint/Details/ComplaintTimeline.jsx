import { Clock3, UserCircle2 } from "lucide-react";

import SectionCard from "@/components/dashboard/SectionCard";

const ComplaintTimeline = ({ history = [] }) => {
  if (history.length === 0) {
    return (
      <SectionCard
        title="Complaint Timeline"
        subtitle="Track all activities performed on this complaint."
      >
        <div className="py-10 text-center text-slate-500">
          No timeline available.
        </div>
      </SectionCard>
    );
  }

  return (
    <SectionCard
      title="Complaint Timeline"
      subtitle="Track all activities performed on this complaint."
    >
      <div className="relative ml-3 border-l-2 border-slate-200">
        {history.map((item, index) => (
          <div key={item.historyId ?? index} className="relative mb-8 ml-6">
            <div className="absolute -left-[34px] flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white">
              <Clock3 size={14} />
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <h3 className="text-lg font-semibold text-slate-900">
                  {item.action}
                </h3>

                <span className="text-sm text-slate-500">
                  {new Date(item.createdAt).toLocaleString()}
                </span>
              </div>

              <div className="mt-4 flex items-center gap-2 text-slate-600">
                <UserCircle2 size={18} />

                <span>{item.performedBy}</span>
              </div>

              {item.remarks && (
                <div className="mt-4 rounded-lg bg-slate-50 p-4">
                  <p className="text-sm font-medium text-slate-500">Remarks</p>

                  <p className="mt-2 text-slate-700">{item.remarks}</p>
                </div>
              )}

              {(item.oldValue || item.newValue) && (
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg border border-slate-200 p-4">
                    <p className="text-sm font-medium text-slate-500">
                      Previous Value
                    </p>

                    <p className="mt-2 text-slate-700">
                      {item.oldValue || "-"}
                    </p>
                  </div>

                  <div className="rounded-lg border border-slate-200 p-4">
                    <p className="text-sm font-medium text-slate-500">
                      Updated Value
                    </p>

                    <p className="mt-2 text-slate-700">
                      {item.newValue || "-"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
};

export default ComplaintTimeline;
