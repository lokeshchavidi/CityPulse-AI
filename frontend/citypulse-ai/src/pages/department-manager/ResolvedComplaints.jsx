import { useEffect, useState } from "react";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import SectionCard from "@/components/dashboard/SectionCard";
import LoadingSkeleton from "@/components/dashboard/LoadingSkeleton";
import ComplaintQueueTable from "@/components/shared/ComplaintQueueTable";

import departmentManagerService from "@/services/departmentManagerService";

const ResolvedComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadComplaints();
  }, []);

  const loadComplaints = async () => {
    try {
      setLoading(true);

      const response = await departmentManagerService.getResolvedComplaints();

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
        title="Resolved Complaints"
        subtitle="View complaints successfully resolved by your department."
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

export default ResolvedComplaints;
