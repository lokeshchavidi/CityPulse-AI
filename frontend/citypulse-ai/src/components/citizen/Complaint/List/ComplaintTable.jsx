import { Eye, MapPin } from "lucide-react";

import Button from "@/components/common/Button/Button";
import EmptyState from "@/components/dashboard/EmptyState";
import LoadingSkeleton from "@/components/dashboard/LoadingSkeleton";
import StatusBadge from "@/components/dashboard/StatusBadge";
import dateUtils from "@/utils/dateUtils";

const ComplaintTable = ({
  complaints = [],
  loading = false,
  onViewComplaint,
}) => {
  if (loading) {
    return <LoadingSkeleton rows={6} />;
  }

  if (!complaints.length) {
    return (
      <EmptyState
        title="No complaints found"
        description="You haven't submitted any complaints yet."
      />
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[760px]">
        <thead>
          <tr className="border-b border-slate-200 text-left">
            <th className="pb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Complaint
            </th>
            <th className="pb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Address
            </th>
            <th className="pb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Status
            </th>
            <th className="pb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Created
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
              onClick={() => onViewComplaint(complaint.complaintId)}
              className="group cursor-pointer border-b border-slate-100 last:border-0 transition-colors hover:bg-slate-50"
            >
              <td className="py-4 pr-4">
                <p className="font-semibold text-slate-900 transition-colors group-hover:text-brand-800">
                  {complaint.title}
                </p>
                <p className="mt-0.5 text-xs text-slate-500">
                  {complaint.complaintId}
                </p>
              </td>

              <td className="py-4 pr-4">
                <div className="flex max-w-[260px] items-center gap-2 text-sm text-slate-600">
                  <MapPin
                    size={15}
                    className="shrink-0 text-slate-400"
                    aria-hidden="true"
                  />
                  <span className="line-clamp-2">{complaint.address}</span>
                </div>
              </td>

              <td className="py-4 pr-4">
                <StatusBadge status={complaint.status} />
              </td>

              <td className="py-4 pr-4 text-sm text-slate-500">
                {dateUtils.formatDate(complaint.createdAt)}
              </td>

              <td className="py-4 text-right">
                <Button
                  size="sm"
                  variant="outline"
                  leftIcon={<Eye size={16} aria-hidden="true" />}
                  onClick={(e) => {
                    e.stopPropagation();
                    onViewComplaint(complaint.complaintId);
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
  );
};

export default ComplaintTable;
