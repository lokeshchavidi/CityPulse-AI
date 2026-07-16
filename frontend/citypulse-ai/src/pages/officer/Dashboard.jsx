import { useEffect, useState } from "react";
import { ClipboardList, Hourglass, CheckCircle2 } from "lucide-react";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatsCard from "@/components/dashboard/StatsCard";
import SectionCard from "@/components/dashboard/SectionCard";
import LoadingSkeleton from "@/components/dashboard/LoadingSkeleton";

import ComplaintQueueTable from "@/components/shared/ComplaintQueueTable";

import officerService from "@/services/officerService";
import useAuth from "@/hooks/useAuth";

const Dashboard = () => {
  const { user } = useAuth();

  const [dashboard, setDashboard] = useState({
    assignedComplaints: 0,
    inProgressComplaints: 0,
    resolvedComplaints: 0,
  });

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const [dashboardResponse, complaintsResponse] = await Promise.all([
        officerService.getDashboard(),
        officerService.getMyAssignedComplaints(),
      ]);

      setDashboard(dashboardResponse);
      setComplaints(complaintsResponse ?? []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <DashboardHeader
        title={`Welcome back${user?.firstName ? `, ${user.firstName}` : ""}`}
        subtitle="Here's an overview of complaints assigned to you."
      />

      {loading ? (
        <LoadingSkeleton cards={3} />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          <StatsCard
            title="Assigned"
            value={dashboard.assignedComplaints}
            icon={ClipboardList}
            color="blue"
          />
          <StatsCard
            title="In Progress"
            value={dashboard.inProgressComplaints}
            icon={Hourglass}
            color="orange"
          />
          <StatsCard
            title="Resolved"
            value={dashboard.resolvedComplaints}
            icon={CheckCircle2}
            color="green"
          />
        </div>
      )}

      <SectionCard
        title="Assigned Complaints"
        subtitle="Complaints currently assigned to you."
      >
        {loading ? (
          <LoadingSkeleton cards={3} />
        ) : (
          <ComplaintQueueTable
            complaints={complaints.slice(0, 6)}
            detailBasePath="/officer/complaints"
          />
        )}
      </SectionCard>
    </div>
  );
};

export default Dashboard;
