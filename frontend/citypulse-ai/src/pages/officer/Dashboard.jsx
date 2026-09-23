import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Bell,
  CheckCircle2,
  ClipboardList,
  Hourglass,
  User,
} from "lucide-react";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatsCard from "@/components/dashboard/StatsCard";
import SectionCard from "@/components/dashboard/SectionCard";
import LoadingSkeleton from "@/components/dashboard/LoadingSkeleton";
import Button from "@/components/common/Button/Button";
import ComplaintQueueTable from "@/components/shared/ComplaintQueueTable";
import DashboardQuickActions from "@/components/shared/DashboardQuickActions";
import { StatisticsCharts, emptyStatistics } from "@/components/dashboard/Charts";

import officerService from "@/services/officerService";
import useAuth from "@/hooks/useAuth";

const QUICK_ACTIONS = [
  {
    title: "Assigned complaints",
    description: "Open your full work queue",
    icon: ClipboardList,
    path: "/officer/complaints",
  },
  {
    title: "Statistics",
    description: "Workload charts and trends",
    icon: Hourglass,
    path: "/officer/statistics",
  },
  {
    title: "Notifications",
    description: "Assignment and status updates",
    icon: Bell,
    path: "/notifications",
  },
  {
    title: "Profile",
    description: "Manage your account",
    icon: User,
    path: "/profile",
  },
];

const Dashboard = () => {
  const { user } = useAuth();

  const [dashboard, setDashboard] = useState({
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
          officerService.getDashboard(),
          officerService.getMyAssignedComplaints(),
          officerService.getStatistics(),
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

  const activeCount =
    (dashboard.assignedComplaints ?? 0) + (dashboard.inProgressComplaints ?? 0);

  return (
    <div className="space-y-6 md:space-y-8">
      <DashboardHeader
        title={`Welcome back${user?.firstName ? `, ${user.firstName}` : ""}`}
        subtitle="Track assignments, update field progress, and close resolved cases."
        action={
          <Link to="/officer/complaints">
            <Button
              leftIcon={<ClipboardList size={18} aria-hidden="true" />}
              className="w-full sm:w-auto"
            >
              View assignments
            </Button>
          </Link>
        }
      />

      {loading ? (
        <LoadingSkeleton cards={3} />
      ) : (
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <StatsCard
            title="Assigned"
            value={dashboard.assignedComplaints}
            icon={ClipboardList}
            color="blue"
            subtitle="Ready for action"
          />
          <StatsCard
            title="In Progress"
            value={dashboard.inProgressComplaints}
            icon={Hourglass}
            color="orange"
            subtitle="Work underway"
          />
          <StatsCard
            title="Resolved"
            value={dashboard.resolvedComplaints}
            icon={CheckCircle2}
            color="green"
            subtitle="Closed by you"
          />
        </section>
      )}

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <SectionCard
            title="Assigned complaints"
            subtitle={
              loading
                ? "Loading your queue…"
                : activeCount > 0
                  ? `${activeCount} active case${activeCount === 1 ? "" : "s"} in your workload`
                  : "Complaints currently assigned to you"
            }
            action={
              <Link to="/officer/complaints">
                <Button size="sm" variant="outline">
                  View all
                </Button>
              </Link>
            }
          >
            {loading ? (
              <LoadingSkeleton rows={4} />
            ) : (
              <ComplaintQueueTable
                complaints={complaints.slice(0, 6)}
                detailBasePath="/officer/complaints"
                emptyTitle="No assigned complaints"
                emptyDescription="New assignments will appear here when a manager routes work to you."
              />
            )}
          </SectionCard>

          <StatisticsCharts
            statistics={statistics}
            loading={loading}
            statisticsPath="/officer/statistics"
          />
        </div>

        <div className="space-y-6">
          <SectionCard
            title="Quick actions"
            subtitle="Common officer tasks"
          >
            <DashboardQuickActions actions={QUICK_ACTIONS} />
          </SectionCard>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
