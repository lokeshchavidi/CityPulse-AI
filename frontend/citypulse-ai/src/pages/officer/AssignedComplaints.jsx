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
    <div className="space-y-8">
      <DashboardHeader
        title="Assigned Complaints"
        subtitle="Complaints assigned to you across every status."
      />

      <SectionCard>
        <div className="mb-6 flex flex-wrap gap-2">
          {FILTERS.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeFilter === filter.value
                  ? "bg-blue-800 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {loading ? (
          <LoadingSkeleton cards={4} />
        ) : (
          <ComplaintQueueTable
            complaints={filteredComplaints}
            detailBasePath="/officer/complaints"
          />
        )}
      </SectionCard>
    </div>
  );
};

export default AssignedComplaints;
