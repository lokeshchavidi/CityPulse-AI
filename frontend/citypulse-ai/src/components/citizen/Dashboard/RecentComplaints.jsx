import { Eye, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

import SectionCard from "@/components/dashboard/SectionCard";
import StatusBadge from "@/components/dashboard/StatusBadge";
import Button from "@/components/common/Button/Button";

const RecentComplaints = ({ complaints = [] }) => {
  const navigate = useNavigate();

  const recent = complaints.slice(0, 5);

  const handleView = (complaintId) => {
    navigate(`/citizen/complaints/${complaintId}`);
  };

  return (
    <SectionCard
      title="Recent Complaints"
      subtitle="Track your latest submitted complaints."
    >
      {recent.length === 0 ? (
        <div className="py-10 text-center text-slate-500">
          No complaints available.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-[640px] w-full">
            <thead>
              <tr className="border-b border-slate-200 text-left">
                <th className="py-3 text-sm font-semibold text-slate-600">
                  Complaint
                </th>

                <th className="py-3 text-sm font-semibold text-slate-600">
                  Location
                </th>

                <th className="py-3 text-sm font-semibold text-slate-600">
                  Status
                </th>

                <th className="py-3 text-sm font-semibold text-slate-600">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {recent.map((complaint) => (
                <tr
                  key={complaint.complaintId}
                  onClick={() => handleView(complaint.complaintId)}
                  className="group cursor-pointer border-b border-slate-100 transition-colors duration-200 hover:bg-slate-50"
                >
                  <td className="py-4">
                    <div>
                      <p className="font-semibold text-slate-900 transition-colors group-hover:text-blue-700">
                        {complaint.title}
                      </p>

                      <p className="text-sm text-slate-500">
                        {complaint.complaintId}
                      </p>
                    </div>
                  </td>

                  <td className="py-4">
                    <div className="flex max-w-xs items-center gap-2 truncate text-slate-600">
                      <MapPin size={16} className="shrink-0" />

                      <span className="truncate">{complaint.address}</span>
                    </div>
                  </td>

                  <td className="py-4">
                    <StatusBadge status={complaint.status} />
                  </td>

                  <td className="py-4">
                    <Button
                      size="sm"
                      variant="outline"
                      leftIcon={<Eye size={16} />}
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
      )}
    </SectionCard>
  );
};

export default RecentComplaints;
