import { Eye, MapPin } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import SectionCard from "@/components/dashboard/SectionCard";
import StatusBadge from "@/components/dashboard/StatusBadge";
import EmptyState from "@/components/dashboard/EmptyState";
import Button from "@/components/common/Button/Button";
import dateUtils from "@/utils/dateUtils";

const RecentComplaints = ({ complaints = [], loading = false }) => {
  const navigate = useNavigate();
  const recent = complaints.slice(0, 5);

  const handleView = (complaintId) => {
    navigate(`/citizen/complaints/${complaintId}`);
  };

  return (
    <SectionCard
      title="Recent complaints"
      subtitle="Your latest submissions and their current status."
      action={
        <Link to="/citizen/complaints">
          <Button size="sm" variant="outline">
            View all
          </Button>
        </Link>
      }
    >
      {loading ? (
        <div className="animate-pulse space-y-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-14 rounded-lg bg-slate-100" />
          ))}
        </div>
      ) : recent.length === 0 ? (
        <EmptyState
          title="No complaints yet"
          description="Submit your first civic issue to start tracking progress here."
          action={
            <Link to="/citizen/complaints/new">
              <Button size="sm">Create Complaint</Button>
            </Link>
          }
        />
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="border-b border-slate-200 text-left">
                  <th className="pb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Complaint
                  </th>
                  <th className="pb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Location
                  </th>
                  <th className="pb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Filed
                  </th>
                  <th className="pb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Status
                  </th>
                  <th className="pb-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {recent.map((complaint) => (
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
                    </td>

                    <td className="py-4 pr-4">
                      <div className="flex max-w-[220px] items-center gap-2 text-sm text-slate-600">
                        <MapPin
                          size={15}
                          className="shrink-0 text-slate-400"
                          aria-hidden="true"
                        />
                        <span className="truncate" title={complaint.address}>
                          {complaint.address}
                        </span>
                      </div>
                    </td>

                    <td className="py-4 pr-4 whitespace-nowrap text-sm text-slate-500">
                      {dateUtils.formatDate(complaint.createdAt)}
                    </td>

                    <td className="py-4 pr-4">
                      <StatusBadge status={complaint.status} />
                    </td>

                    <td className="py-4 text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        leftIcon={<Eye size={15} aria-hidden="true" />}
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
            {recent.map((complaint) => (
              <button
                key={complaint.complaintId}
                type="button"
                onClick={() => handleView(complaint.complaintId)}
                className="w-full rounded-lg border border-slate-200 bg-canvas p-4 text-left transition hover:border-brand-200 hover:bg-surface"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-900">
                      {complaint.title}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-500">
                      {complaint.complaintId}
                    </p>
                  </div>
                  <StatusBadge status={complaint.status} />
                </div>

                <div className="mt-3 flex items-center gap-2 text-sm text-slate-600">
                  <MapPin size={14} className="shrink-0 text-slate-400" />
                  <span className="truncate">{complaint.address}</span>
                </div>

                <p className="mt-2 text-xs text-slate-500">
                  Filed {dateUtils.formatDate(complaint.createdAt)}
                </p>
              </button>
            ))}
          </div>
        </>
      )}
    </SectionCard>
  );
};

export default RecentComplaints;
