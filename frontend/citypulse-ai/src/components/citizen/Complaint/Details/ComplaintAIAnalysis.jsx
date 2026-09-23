import {
  AlertTriangle,
  BrainCircuit,
  CheckCircle2,
  ShieldAlert,
  Sparkles,
} from "lucide-react";

import StatusBadge from "@/components/dashboard/StatusBadge";

const Signal = ({ ok, label, yes = "Yes", no = "No", warn = false }) => (
  <div
    className={`rounded-lg border px-3 py-3 ${
      ok
        ? "border-green-200 bg-green-50"
        : warn
          ? "border-amber-200 bg-amber-50"
          : "border-slate-200 bg-canvas"
    }`}
  >
    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
      {label}
    </p>
    <p
      className={`mt-1 text-sm font-semibold ${
        ok ? "text-green-800" : warn ? "text-amber-800" : "text-slate-700"
      }`}
    >
      {ok ? yes : no}
    </p>
  </div>
);

const ComplaintAIAnalysis = ({
  analysis,
  emptyTitle = "AI analysis pending",
  emptyDescription = "Analysis will appear once the system has classified this complaint.",
}) => {
  if (!analysis) {
    return (
      <section className="flex h-full min-h-[240px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-canvas px-6 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-50 text-brand-800">
          <BrainCircuit size={22} aria-hidden="true" />
        </div>
        <p className="mt-3 text-sm font-semibold text-slate-800">{emptyTitle}</p>
        <p className="mt-1 max-w-xs text-xs leading-relaxed text-slate-500">
          {emptyDescription}
        </p>
      </section>
    );
  }

  return (
    <section className="flex h-full flex-col rounded-xl border border-slate-200 bg-surface shadow-soft-sm">
      <div className="flex items-start gap-3 border-b border-slate-200 px-5 py-4 md:px-6">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-800">
          <Sparkles size={18} aria-hidden="true" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-slate-900">AI analysis</h2>
          <p className="mt-0.5 text-xs text-slate-500">
            Automated classification with human oversight
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-5 p-5 md:p-6">
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-slate-200 bg-canvas p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Category
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-900">
              {analysis.category?.replaceAll("_", " ") || "—"}
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-canvas p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Confidence
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-900">
              {analysis.confidenceScore != null
                ? `${analysis.confidenceScore}%`
                : "—"}
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-canvas p-3">
            <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Severity
            </p>
            {analysis.severity ? (
              <StatusBadge status={analysis.severity} />
            ) : (
              <span className="text-sm text-slate-500">—</span>
            )}
          </div>

          <div className="rounded-lg border border-slate-200 bg-canvas p-3">
            <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Priority
            </p>
            {analysis.priority ? (
              <StatusBadge status={analysis.priority} />
            ) : (
              <span className="text-sm text-slate-500">—</span>
            )}
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-canvas px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Suggested department
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-900">
            {analysis.suggestedDepartment || "—"}
          </p>
        </div>

        {analysis.summary && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Summary
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              {analysis.summary}
            </p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <Signal ok={!!analysis.imageVerified} label="Image verified" />
          <Signal
            ok={!!analysis.textImageConsistent}
            label="Text & image"
            yes="Consistent"
            no="Mismatch"
            warn={!analysis.textImageConsistent}
          />
          <Signal
            ok={!analysis.emergencyDetected}
            label="Emergency"
            yes="No"
            no="Detected"
            warn={!!analysis.emergencyDetected}
          />
          <Signal
            ok={!analysis.duplicateComplaint}
            label="Duplicate"
            yes="No"
            no="Possible"
            warn={!!analysis.duplicateComplaint}
          />
        </div>

        {analysis.duplicateComplaint && analysis.duplicateReason && (
          <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-amber-900">
              <AlertTriangle size={16} aria-hidden="true" />
              Duplicate reason
            </div>
            <p className="mt-1.5 text-sm text-amber-800">
              {analysis.duplicateReason}
            </p>
          </div>
        )}

        {analysis.remarks && (
          <div className="rounded-lg border border-brand-200 bg-brand-50 px-4 py-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-brand-900">
              <ShieldAlert size={16} aria-hidden="true" />
              AI remarks
            </div>
            <p className="mt-1.5 text-sm leading-relaxed text-brand-900/90">
              {analysis.remarks}
            </p>
          </div>
        )}
      </div>

      <div className="mt-auto flex items-center gap-2 border-t border-slate-200 px-5 py-3 text-xs text-slate-500 md:px-6">
        <CheckCircle2 size={14} className="text-brand-700" aria-hidden="true" />
        Recommendations require department manager confirmation
      </div>
    </section>
  );
};

export default ComplaintAIAnalysis;
