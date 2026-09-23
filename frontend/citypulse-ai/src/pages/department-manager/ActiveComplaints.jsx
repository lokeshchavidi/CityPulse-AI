import { useEffect, useState } from "react";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import SectionCard from "@/components/dashboard/SectionCard";
import LoadingSkeleton from "@/components/dashboard/LoadingSkeleton";
import ComplaintQueueTable from "@/components/shared/ComplaintQueueTable";

import departmentManagerService from "@/services/departmentManagerService";

const ActiveComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadComplaints();
  }, []);

  const loadComplaints = async () => {
    try {
      setLoading(true);

      const response = await departmentManagerService.getActiveComplaints();

      setComplaints(response ?? []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 md:space-y-8">
      <DashboardHeader
        title="Active complaints"
        subtitle="Monitor complaints currently assigned to officers."
      />

      <SectionCard
        title="In progress work"
        subtitle={
          loading
            ? "Loading active cases…"
            : `${complaints.length} active complaint${complaints.length === 1 ? "" : "s"}`
        }
      >
        {loading ? (
          <LoadingSkeleton rows={5} />
        ) : (
          <ComplaintQueueTable
            complaints={complaints}
            detailBasePath="/department-manager/complaints"
            emptyTitle="No active complaints"
            emptyDescription="Assigned and in-progress cases will show up here."
          />
        )}
      </SectionCard>
    </div>
  );
};

export default ActiveComplaints;
