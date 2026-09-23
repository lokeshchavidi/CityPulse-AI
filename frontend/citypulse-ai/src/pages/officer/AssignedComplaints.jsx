import { useEffect, useMemo, useState } from "react";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import SectionCard from "@/components/dashboard/SectionCard";
import LoadingSkeleton from "@/components/dashboard/LoadingSkeleton";
import ComplaintQueueTable from "@/components/shared/ComplaintQueueTable";

import { COMPLAINT_STATUS } from "@/constants/complaintStatus";
import officerService from "@/services/officerService";

const FILTERS = [
  { label: "All", value: "ALL" },
  { label: "Assigned", value: COMPLAINT_STATUS.ASSIGNED },
  { label: "In Progress", value: COMPLAINT_STATUS.IN_PROGRESS },
  { label: "Resolved", value: COMPLAINT_STATUS.RESOLVED },
];

const AssignedComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("ALL");

  useEffect(() => {
    loadComplaints();
  }, []);

  const loadComplaints = async () => {
    try {
      setLoading(true);

      const response = await officerService.getMyAssignedComplaints();

      setComplaints(response ?? []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredComplaints = useMemo(() => {
    if (activeFilter === "ALL") return complaints;

    return complaints.filter((complaint) => complaint.status === activeFilter);
  }, [complaints, activeFilter]);

  return (
    <div className="space-y-6 md:space-y-8">
      <DashboardHeader
        title="Assigned complaints"
        subtitle="Complaints assigned to you across every status."
      />

      <div className="flex flex-wrap items-center gap-2">
        {FILTERS.map((filter) => {
          const active = activeFilter === filter.value;
          const count =
            filter.value === "ALL"
              ? complaints.length
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
          <LoadingSkeleton rows={5} />
        ) : (
          <ComplaintQueueTable
            complaints={filteredComplaints}
            detailBasePath="/officer/complaints"
            emptyTitle="No complaints in this filter"
            emptyDescription="Try another status or check back when new work is assigned."
          />
        )}
      </SectionCard>
    </div>
  );
};

export default AssignedComplaints;
