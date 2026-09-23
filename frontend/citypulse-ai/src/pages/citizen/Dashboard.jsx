import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PlusCircle } from "lucide-react";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import SectionCard from "@/components/dashboard/SectionCard";
import Button from "@/components/common/Button/Button";
import { StatisticsCharts, emptyStatistics } from "@/components/dashboard/Charts";
import {
  DashboardStats,
  RecentComplaints,
  QuickActions,
  DashboardNotifications,
} from "@/components/citizen/Dashboard";

import userService from "@/services/userService";
import complaintService from "@/services/complaintService";
import useAuth from "@/hooks/useAuth";

const Dashboard = () => {
  const { user } = useAuth();

  const [dashboard, setDashboard] = useState({
    totalComplaints: 0,
    openComplaints: 0,
    underReviewComplaints: 0,
    assignedComplaints: 0,
    inProgressComplaints: 0,
    resolvedComplaints: 0,
  });

  const [complaints, setComplaints] = useState([]);
  const [statistics, setStatistics] = useState(emptyStatistics);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const [dashboardResponse, complaintsResponse, statisticsResponse] =
        await Promise.all([
          userService.getDashboard(),
          complaintService.getMyComplaints(),
          userService.getStatistics(),
        ]);

      setDashboard(dashboardResponse);
      setComplaints(complaintsResponse ?? []);
      setStatistics(statisticsResponse ?? emptyStatistics);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 md:space-y-8">
      <DashboardHeader
        title={`Welcome back${user?.firstName ? `, ${user.firstName}` : ""}`}
        subtitle="Track complaints, follow progress, and stay updated through every stage of resolution."
        action={
          <Link to="/citizen/complaints/new">
            <Button
              leftIcon={<PlusCircle size={18} aria-hidden="true" />}
              className="w-full sm:w-auto"
            >
              New Complaint
            </Button>
          </Link>
        }
      />

      <DashboardStats dashboard={dashboard} loading={loading} />

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <RecentComplaints complaints={complaints} loading={loading} />
          <StatisticsCharts
            statistics={statistics}
            loading={loading}
            statisticsPath="/citizen/statistics"
          />
        </div>

        <div className="space-y-6">
          <SectionCard
            title="Quick actions"
            subtitle="Common citizen tasks"
          >
            <QuickActions />
          </SectionCard>

          <DashboardNotifications />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
