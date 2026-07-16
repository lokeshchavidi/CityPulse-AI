import {
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  Sparkles,
} from "lucide-react";

import SectionCard from "@/components/dashboard/SectionCard";

const InfoRow = ({ label, value }) => (
  <div className="flex items-center justify-between border-b border-slate-100 py-3 last:border-none">
    <span className="text-sm font-medium text-slate-500">{label}</span>

    <span className="text-right font-semibold text-slate-900">{value}</span>
  </div>
);

const ComplaintAIAnalysis = ({ analysis }) => {
  if (!analysis) return null;

  return (
    <SectionCard
      title="AI Analysis"
      subtitle="Generated automatically using Gemini AI."
    >
      <div className="space-y-1">
        <InfoRow label="Category" value={analysis.category} />

        <InfoRow label="Severity" value={analysis.severity} />

        <InfoRow label="Priority" value={analysis.priority} />

        <InfoRow
          label="Suggested Department"
          value={analysis.suggestedDepartment}
        />

        <InfoRow
          label="Confidence Score"
          value={`${analysis.confidenceScore}%`}
        />
      </div>

      <div className="mt-8 rounded-xl bg-slate-50 p-5">
        <div className="mb-2 flex items-center gap-2">
          <Sparkles size={18} className="text-blue-600" />

          <h3 className="font-semibold text-slate-900">AI Summary</h3>
        </div>

        <p className="leading-7 text-slate-700">{analysis.summary}</p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-slate-200 p-4">
          <div className="mb-2 flex items-center gap-2">
            <CheckCircle2 size={18} className="text-green-600" />

            <span className="font-medium">Image Verified</span>
          </div>

          <p className="text-slate-600">
            {analysis.imageVerified ? "Yes" : "No"}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 p-4">
          <div className="mb-2 flex items-center gap-2">
            <CheckCircle2 size={18} className="text-green-600" />

            <span className="font-medium">Text & Image Match</span>
          </div>

          <p className="text-slate-600">
            {analysis.textImageConsistent ? "Consistent" : "Mismatch"}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 p-4">
          <div className="mb-2 flex items-center gap-2">
            <AlertTriangle size={18} className="text-orange-500" />

            <span className="font-medium">Emergency</span>
          </div>

          <p className="text-slate-600">
            {analysis.emergencyDetected ? "Yes" : "No"}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 p-4">
          <div className="mb-2 flex items-center gap-2">
            <ShieldAlert size={18} className="text-red-500" />

            <span className="font-medium">Duplicate Complaint</span>
          </div>

          <p className="text-slate-600">
            {analysis.duplicateComplaint ? "Yes" : "No"}
          </p>
        </div>
      </div>

      {analysis.duplicateComplaint && analysis.duplicateReason && (
        <div className="mt-6 rounded-xl border border-yellow-300 bg-yellow-50 p-5">
          <h3 className="font-semibold text-yellow-800">Duplicate Reason</h3>

          <p className="mt-2 text-yellow-700">{analysis.duplicateReason}</p>
        </div>
      )}

      {analysis.remarks && (
        <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-5">
          <h3 className="font-semibold text-blue-900">AI Remarks</h3>

          <p className="mt-2 leading-7 text-blue-800">{analysis.remarks}</p>
        </div>
      )}
    </SectionCard>
  );
};

export default ComplaintAIAnalysis;
