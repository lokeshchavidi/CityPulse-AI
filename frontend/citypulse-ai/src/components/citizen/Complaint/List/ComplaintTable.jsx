import { Eye, MapPin } from "lucide-react";

import Button from "@/components/common/Button/Button";
import EmptyState from "@/components/dashboard/EmptyState";
import LoadingSkeleton from "@/components/dashboard/LoadingSkeleton";
import StatusBadge from "@/components/dashboard/StatusBadge";

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
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-[760px] w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Complaint
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Address
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Status
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Created
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {complaints.map((complaint) => (
              <tr
                key={complaint.complaintId}
                onClick={() => onViewComplaint(complaint.complaintId)}
                className="group cursor-pointer border-t border-slate-100 transition-colors duration-200 hover:bg-slate-50"
              >
                <td className="px-6 py-5">
                  <div>
                    <h3 className="font-semibold text-slate-900 transition-colors group-hover:text-blue-700">
                      {complaint.title}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {complaint.complaintId}
                    </p>
                  </div>
                </td>

                <td className="px-6 py-5">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <MapPin size={16} className="shrink-0" />

                    <span className="line-clamp-2">{complaint.address}</span>
                  </div>
                </td>

                <td className="px-6 py-5">
                  <StatusBadge status={complaint.status} />
                </td>

                <td className="px-6 py-5 text-sm text-slate-600">
                  {new Date(complaint.createdAt).toLocaleDateString()}
                </td>

                <td className="px-6 py-5 text-center">
                  <Button
                    size="sm"
                    variant="outline"
                    leftIcon={<Eye size={16} />}
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
    </div>
  );
};

export default ComplaintTable;
