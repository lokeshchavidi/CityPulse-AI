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
      console.log("Active API Response:", response);

      setComplaints(response ?? []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <DashboardHeader
        title="Active Complaints"
        subtitle="Monitor complaints currently assigned to officers."
      />

      <SectionCard>
        {loading ? (
          <LoadingSkeleton cards={4} />
        ) : (
          <ComplaintQueueTable
            complaints={complaints}
            detailBasePath="/department-manager/complaints"
            readOnly
          />
        )}
      </SectionCard>
    </div>
  );
};

export default ActiveComplaints;
