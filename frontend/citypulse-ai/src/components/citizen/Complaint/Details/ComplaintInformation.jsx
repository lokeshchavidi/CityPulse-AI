import {
  Building2,
  CalendarDays,
  MapPin,
  User,
  FileText,
} from "lucide-react";

import StatusBadge from "@/components/dashboard/StatusBadge";
import dateUtils from "@/utils/dateUtils";

const MetaItem = ({ icon: Icon, label, children }) => (
  <div className="rounded-lg border border-slate-200 bg-canvas px-4 py-3">
    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
      {Icon && <Icon size={14} aria-hidden="true" />}
      {label}
    </div>
    <div className="mt-1.5 text-sm font-medium text-slate-900">{children}</div>
  </div>
);

const ComplaintInformation = ({ complaint }) => {
  if (!complaint) return null;

  return (
    <section className="rounded-xl border border-slate-200 bg-surface shadow-soft-sm">
      <div className="border-b border-slate-200 px-5 py-4 md:px-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
              Complaint details
            </p>
            <h2 className="mt-1 text-xl font-bold tracking-tight text-slate-900">
              {complaint.title}
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={complaint.status} />
            {complaint.priority && <StatusBadge status={complaint.priority} />}
          </div>
        </div>
      </div>

      <div className="space-y-5 p-5 md:p-6">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
            <FileText size={14} aria-hidden="true" />
            Description
          </div>
          <p className="whitespace-pre-line text-sm leading-relaxed text-slate-700">
            {complaint.description}
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <MetaItem icon={MapPin} label="Location">
            {complaint.address || "—"}
          </MetaItem>

          <MetaItem icon={CalendarDays} label="Submitted">
            {dateUtils.formatDateTime(complaint.createdAt)}
          </MetaItem>

          <MetaItem icon={Building2} label="Department">
            {complaint.departmentName || "Pending assignment"}
          </MetaItem>

          <MetaItem icon={User} label="Assigned officer">
            {complaint.assignedOfficerName || "Not assigned"}
          </MetaItem>
        </div>

        {(complaint.latitude != null || complaint.longitude != null) && (
          <p className="text-xs text-slate-500">
            Coordinates:{" "}
            <span className="font-medium text-slate-700">
              {complaint.latitude}, {complaint.longitude}
            </span>
          </p>
        )}
      </div>
    </section>
  );
};

export default ComplaintInformation;
