import { useEffect, useState } from "react";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import SectionCard from "@/components/dashboard/SectionCard";
import LoadingSkeleton from "@/components/dashboard/LoadingSkeleton";
import ComplaintQueueTable from "@/components/shared/ComplaintQueueTable";

import departmentManagerService from "@/services/departmentManagerService";

const PendingComplaints = () => {
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadQueue();
  }, []);

  const loadQueue = async () => {
    try {
      setLoading(true);

      const response = await departmentManagerService.getComplaintQueue();

      setQueue(response ?? []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 md:space-y-8">
      <DashboardHeader
        title="Complaint queue"
        subtitle="Every complaint routed to your department, across all stages."
      />

      <SectionCard
        title="Department queue"
        subtitle={
          loading
            ? "Loading complaints…"
            : `${queue.length} complaint${queue.length === 1 ? "" : "s"} in queue`
        }
      >
        {loading ? (
          <LoadingSkeleton rows={5} />
        ) : (
          <ComplaintQueueTable
            complaints={queue}
            detailBasePath="/department-manager/complaints"
            emptyTitle="Queue is clear"
            emptyDescription="New complaints routed to your department will appear here."
          />
        )}
      </SectionCard>
    </div>
  );
};

export default PendingComplaints;
