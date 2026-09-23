import { useEffect, useMemo, useState } from "react";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import SectionCard from "@/components/dashboard/SectionCard";
import LoadingSkeleton from "@/components/dashboard/LoadingSkeleton";
import ComplaintQueueTable from "@/components/shared/ComplaintQueueTable";

import { COMPLAINT_STATUS } from "@/constants/complaintStatus";
import complaintService from "@/services/complaintService";

const FILTERS = [
  { label: "All", value: "ALL" },
  { label: "Needs assignment", value: "NEEDS_ASSIGNMENT" },
  { label: "Open", value: COMPLAINT_STATUS.OPEN },
  { label: "Under Review", value: COMPLAINT_STATUS.UNDER_REVIEW },
  { label: "Assigned", value: COMPLAINT_STATUS.ASSIGNED },
  { label: "In Progress", value: COMPLAINT_STATUS.IN_PROGRESS },
  { label: "Resolved", value: COMPLAINT_STATUS.RESOLVED },
];

const AllComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("ALL");

  useEffect(() => {
    loadComplaints();
  }, []);

  const loadComplaints = async () => {
    try {
      setLoading(true);
      const response = await complaintService.getAllComplaints();
      setComplaints(response ?? []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredComplaints = useMemo(() => {
    if (activeFilter === "ALL") return complaints;
    if (activeFilter === "NEEDS_ASSIGNMENT") {
      return complaints.filter((complaint) => complaint.needsManualAssignment);
    }
    return complaints.filter((complaint) => complaint.status === activeFilter);
  }, [complaints, activeFilter]);

  return (
    <div className="space-y-6 md:space-y-8">
      <DashboardHeader
        title="All complaints"
        subtitle="Platform-wide complaint registry across every department and status."
      />

      <div className="flex flex-wrap items-center gap-2">
        {FILTERS.map((filter) => {
          const active = activeFilter === filter.value;
          const count =
            filter.value === "ALL"
              ? complaints.length
              : filter.value === "NEEDS_ASSIGNMENT"
                ? complaints.filter((item) => item.needsManualAssignment).length
                : complaints.filter((item) => item.status === filter.value)
                    .length;

          return (
            <button
              key={filter.value}
              type="button"
              onClick={() => setActiveFilter(filter.value)}
              className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-semibold transition ${
                active
                  ? "bg-brand-700 text-white shadow-soft-sm"
                  : "bg-surface text-slate-600 ring-1 ring-slate-200 hover:bg-canvas"
              }`}
            >
              {filter.label}
              <span
                className={`rounded-md px-1.5 py-0.5 text-[11px] ${
                  active
                    ? "bg-surface/20 text-white"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <SectionCard>
        {loading ? (
          <LoadingSkeleton rows={6} />
        ) : (
          <ComplaintQueueTable
            complaints={filteredComplaints}
            detailBasePath="/admin/complaints"
            emptyTitle="No complaints found"
            emptyDescription="Complaints filed across the platform will appear here."
          />
        )}
      </SectionCard>
    </div>
  );
};

export default AllComplaints;
