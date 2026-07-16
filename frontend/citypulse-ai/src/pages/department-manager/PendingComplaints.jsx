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
    <div className="space-y-8">
      <DashboardHeader
        title="Complaint Queue"
        subtitle="Every complaint routed to your department, across all stages."
      />

      <SectionCard>
        {loading ? (
          <LoadingSkeleton cards={4} />
        ) : (
          <ComplaintQueueTable
            complaints={queue}
            detailBasePath="/department-manager/complaints"
          />
        )}
      </SectionCard>
    </div>
  );
};

export default PendingComplaints;
