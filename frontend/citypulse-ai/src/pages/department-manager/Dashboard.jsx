import { useEffect, useState } from "react";
import {
  Hourglass,
  ClipboardList,
  Loader2,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatsCard from "@/components/dashboard/StatsCard";
import SectionCard from "@/components/dashboard/SectionCard";
import LoadingSkeleton from "@/components/dashboard/LoadingSkeleton";
import ComplaintQueueTable from "@/components/shared/ComplaintQueueTable";

import departmentManagerService from "@/services/departmentManagerService";
import useAuth from "@/hooks/useAuth";

const Dashboard = () => {
  const { user } = useAuth();

  const [dashboard, setDashboard] = useState({
    pendingReviewComplaints: 0,
    assignedComplaints: 0,
    inProgressComplaints: 0,
    resolvedComplaints: 0,
    criticalComplaints: 0,
  });

  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const [dashboardResponse, queueResponse] = await Promise.all([
        departmentManagerService.getDashboard(),
        departmentManagerService.getComplaintQueue(),
      ]);

      setDashboard(dashboardResponse);
      setQueue(queueResponse ?? []);
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
        subtitle="Review AI recommendations and manage your department's complaint queue."
      />

      {loading ? (
        <LoadingSkeleton cards={5} />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
          <StatsCard
            title="Pending Review"
            value={dashboard.pendingReviewComplaints}
            icon={Hourglass}
            color="orange"
          />
          <StatsCard
            title="Assigned"
            value={dashboard.assignedComplaints}
            icon={ClipboardList}
            color="blue"
          />
          <StatsCard
            title="In Progress"
            value={dashboard.inProgressComplaints}
            icon={Loader2}
            color="teal"
          />
          <StatsCard
            title="Resolved"
            value={dashboard.resolvedComplaints}
            icon={CheckCircle2}
            color="green"
          />
          <StatsCard
            title="Critical"
            value={dashboard.criticalComplaints}
            icon={AlertTriangle}
            color="red"
          />
        </div>
      )}

      <SectionCard
        title="Complaint Queue"
        subtitle="Latest complaints awaiting department action."
      >
        {loading ? (
          <LoadingSkeleton cards={3} />
        ) : (
          <ComplaintQueueTable
            complaints={queue.slice(0, 6)}
            detailBasePath="/department-manager/complaints"
          />
        )}
      </SectionCard>
    </div>
  );
};

export default Dashboard;
