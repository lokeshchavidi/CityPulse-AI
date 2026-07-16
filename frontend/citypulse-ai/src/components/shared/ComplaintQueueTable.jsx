import { Eye, MapPin, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

import StatusBadge from "@/components/dashboard/StatusBadge";
import EmptyState from "@/components/dashboard/EmptyState";
import Button from "@/components/common/Button/Button";
import dateUtils from "@/utils/dateUtils";

const ComplaintQueueTable = ({ complaints = [], detailBasePath }) => {
  const navigate = useNavigate();

  if (!complaints.length) {
    return (
      <EmptyState
        title="No complaints here"
        description="There's nothing in this list right now."
      />
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200">
      <table className="min-w-[1050px] w-full border-collapse bg-white">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
              Complaint
            </th>

            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
              Citizen
            </th>

            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
              Location
            </th>

            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
              Priority
            </th>

            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
              Status
            </th>

            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
              Filed
            </th>

            <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {complaints.map((complaint) => (
            <tr
              key={complaint.complaintId}
              onClick={() =>
                navigate(`${detailBasePath}/${complaint.complaintId}`)
              }
              className="cursor-pointer border-b border-slate-100 transition-colors hover:bg-slate-50"
            >
              <td className="px-6 py-5">
                <div className="min-w-[220px]">
                  <p className="font-semibold text-slate-900">
                    {complaint.title}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {complaint.complaintId}
                  </p>
                </div>
              </td>

              <td className="px-6 py-5">
                <div className="flex items-center gap-2 whitespace-nowrap text-sm text-slate-700">
                  <User size={16} className="text-slate-400" />
                  {complaint.citizenName}
                </div>
              </td>

              <td className="px-6 py-5">
                <div className="flex max-w-[260px] items-center gap-2">
                  <MapPin size={16} className="shrink-0 text-slate-400" />

                  <span
                    className="truncate text-sm text-slate-600"
                    title={complaint.address}
                  >
                    {complaint.address}
                  </span>
                </div>
              </td>

              <td className="px-6 py-5 whitespace-nowrap">
                <StatusBadge status={complaint.priority} />
              </td>

              <td className="px-6 py-5 whitespace-nowrap">
                <StatusBadge status={complaint.status} />
              </td>

              <td className="px-6 py-5 whitespace-nowrap text-sm text-slate-500">
                {dateUtils.formatDate(complaint.createdAt)}
              </td>

              <td className="px-6 py-5 text-center">
                <Button
                  size="sm"
                  variant="outline"
                  leftIcon={<Eye size={16} />}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`${detailBasePath}/${complaint.complaintId}`);
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

export default ComplaintQueueTable;
