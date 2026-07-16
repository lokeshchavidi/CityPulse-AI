import { useEffect, useState } from "react";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import SectionCard from "@/components/dashboard/SectionCard";
import {
  DashboardStats,
  RecentComplaints,
  QuickActions,
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const [dashboardResponse, complaintsResponse] = await Promise.all([
        userService.getDashboard(),
        complaintService.getMyComplaints(),
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
    <div className="space-y-8">
      <DashboardHeader
        title={`Welcome back${user?.firstName ? `, ${user.firstName}` : ""}`}
        subtitle="Track your complaints, monitor AI analysis, and stay updated with every stage of resolution."
      />

      <DashboardStats dashboard={dashboard} loading={loading} />

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentComplaints complaints={complaints} loading={loading} />
        </div>

        <SectionCard title="Quick Actions" subtitle="Frequently used actions">
          <QuickActions />
        </SectionCard>
      </div>
    </div>
  );
};

export default Dashboard;
