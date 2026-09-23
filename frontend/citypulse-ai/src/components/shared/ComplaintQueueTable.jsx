import { Eye, MapPin, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

import StatusBadge from "@/components/dashboard/StatusBadge";
import EmptyState from "@/components/dashboard/EmptyState";
import Button from "@/components/common/Button/Button";
import dateUtils from "@/utils/dateUtils";

const ComplaintQueueTable = ({
  complaints = [],
  detailBasePath,
  emptyTitle = "No complaints here",
  emptyDescription = "There's nothing in this list right now.",
}) => {
  const navigate = useNavigate();

  const handleView = (complaintId) => {
    navigate(`${detailBasePath}/${complaintId}`);
  };

  if (!complaints.length) {
    return (
      <EmptyState title={emptyTitle} description={emptyDescription} />
    );
  }

  return (
    <>
      {/* Desktop table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[900px]">
          <thead>
            <tr className="border-b border-slate-200 text-left">
              <th className="pb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Complaint
              </th>
              <th className="pb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Citizen
              </th>
              <th className="pb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Location
              </th>
              <th className="pb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Priority
              </th>
              <th className="pb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Status
              </th>
              <th className="pb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Filed
              </th>
              <th className="pb-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {complaints.map((complaint) => (
              <tr
                key={complaint.complaintId}
                onClick={() => handleView(complaint.complaintId)}
                className="group cursor-pointer border-b border-slate-100 last:border-0 transition-colors hover:bg-slate-50"
              >
                <td className="py-4 pr-4">
                  <p className="font-semibold text-slate-900 transition-colors group-hover:text-brand-800">
                    {complaint.title}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {complaint.complaintId}
                  </p>
                  {complaint.needsManualAssignment && (
                    <p className="mt-1 text-xs font-semibold text-amber-700">
                      Needs assignment
                    </p>
                  )}
                </td>

                <td className="py-4 pr-4">
                  <div className="flex items-center gap-2 whitespace-nowrap text-sm text-slate-700">
                    <User size={15} className="text-slate-400" aria-hidden="true" />
                    {complaint.citizenName}
                  </div>
                </td>

                <td className="py-4 pr-4">
                  <div className="flex max-w-[220px] items-center gap-2">
                    <MapPin
                      size={15}
                      className="shrink-0 text-slate-400"
                      aria-hidden="true"
                    />
                    <span
                      className="truncate text-sm text-slate-600"
                      title={complaint.address}
                    >
                      {complaint.address}
                    </span>
                  </div>
                </td>

                <td className="py-4 pr-4 whitespace-nowrap">
                  <StatusBadge status={complaint.priority} />
                </td>

                <td className="py-4 pr-4 whitespace-nowrap">
                  <StatusBadge status={complaint.status} />
                </td>

                <td className="py-4 pr-4 whitespace-nowrap text-sm text-slate-500">
                  {dateUtils.formatDate(complaint.createdAt)}
                </td>

                <td className="py-4 text-right">
                  <Button
                    size="sm"
                    variant="outline"
                    leftIcon={<Eye size={16} aria-hidden="true" />}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleView(complaint.complaintId);
                    }}
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="space-y-3 md:hidden">
        {complaints.map((complaint) => (
          <button
            key={complaint.complaintId}
            type="button"
            onClick={() => handleView(complaint.complaintId)}
            className="w-full rounded-lg border border-slate-200 bg-canvas px-4 py-3 text-left transition hover:border-brand-200 hover:bg-surface"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate font-semibold text-slate-900">
                  {complaint.title}
                </p>
                <p className="mt-0.5 text-xs text-slate-500">
                  {complaint.complaintId}
                </p>
                {complaint.needsManualAssignment && (
                  <p className="mt-1 text-xs font-semibold text-amber-700">
                    Needs assignment
                  </p>
                )}
              </div>
              <StatusBadge status={complaint.status} />
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
              <span className="inline-flex items-center gap-1">
                <User size={13} aria-hidden="true" />
                {complaint.citizenName}
              </span>
              <span className="inline-flex min-w-0 items-center gap-1">
                <MapPin size={13} className="shrink-0" aria-hidden="true" />
                <span className="truncate">{complaint.address}</span>
              </span>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <StatusBadge status={complaint.priority} />
              <span className="text-xs text-slate-500">
                {dateUtils.formatDate(complaint.createdAt)}
              </span>
            </div>
          </button>
        ))}
      </div>
    </>
  );
};

export default ComplaintQueueTable;
