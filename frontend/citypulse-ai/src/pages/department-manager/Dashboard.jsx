import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  Bell,
  CheckCircle2,
  ClipboardCheck,
  ClipboardList,
  Hourglass,
  Loader2,
  Users,
  BarChart3,
} from "lucide-react";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatsCard from "@/components/dashboard/StatsCard";
import SectionCard from "@/components/dashboard/SectionCard";
import LoadingSkeleton from "@/components/dashboard/LoadingSkeleton";
import Button from "@/components/common/Button/Button";
import ComplaintQueueTable from "@/components/shared/ComplaintQueueTable";
import DashboardQuickActions from "@/components/shared/DashboardQuickActions";
import { StatisticsCharts, emptyStatistics } from "@/components/dashboard/Charts";

import departmentManagerService from "@/services/departmentManagerService";
import useAuth from "@/hooks/useAuth";

const QUICK_ACTIONS = [
  {
    title: "Complaint queue",
    description: "Review AI recommendations",
    icon: ClipboardList,
    path: "/department-manager/complaints",
  },
  {
    title: "Statistics",
    description: "Department charts and trends",
    icon: BarChart3,
    path: "/department-manager/statistics",
  },
  {
    title: "Active complaints",
    description: "Monitor assigned work",
    icon: ClipboardCheck,
    path: "/department-manager/complaints/active",
  },
  {
    title: "Resolved complaints",
    description: "Browse closed cases",
    icon: CheckCircle2,
    path: "/department-manager/complaints/resolved",
  },
  {
    title: "Officers",
    description: "Manage department staff",
    icon: Users,
    path: "/department-manager/officers",
  },
  {
    title: "Notifications",
    description: "Workflow alerts",
    icon: Bell,
    path: "/notifications",
  },
];

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
  const [statistics, setStatistics] = useState(emptyStatistics);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const [dashboardResponse, queueResponse, statisticsResponse] =
        await Promise.all([
          departmentManagerService.getDashboard(),
          departmentManagerService.getComplaintQueue(),
          departmentManagerService.getStatistics(),
        ]);

      setDashboard(dashboardResponse);
      setQueue(queueResponse ?? []);
      setStatistics(statisticsResponse ?? emptyStatistics);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const pending = dashboard.pendingReviewComplaints ?? 0;

  return (
    <div className="space-y-6 md:space-y-8">
      <DashboardHeader
        title={`Welcome back${user?.firstName ? `, ${user.firstName}` : ""}`}
        subtitle="Review AI recommendations, assign officers, and keep the department queue moving."
        action={
          <Link to="/department-manager/complaints">
            <Button
              leftIcon={<ClipboardList size={18} aria-hidden="true" />}
              className="w-full sm:w-auto"
            >
              Open queue
            </Button>
          </Link>
        }
      />

      {loading ? (
        <LoadingSkeleton cards={5} />
      ) : (
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          <StatsCard
            title="Pending Review"
            value={dashboard.pendingReviewComplaints}
            icon={Hourglass}
            color="orange"
            subtitle="Needs your decision"
          />
          <StatsCard
            title="Assigned"
            value={dashboard.assignedComplaints}
            icon={ClipboardList}
            color="blue"
            subtitle="With officers"
          />
          <StatsCard
            title="In Progress"
            value={dashboard.inProgressComplaints}
            icon={Loader2}
            color="teal"
            subtitle="Field work active"
          />
          <StatsCard
            title="Resolved"
            value={dashboard.resolvedComplaints}
            icon={CheckCircle2}
            color="green"
            subtitle="Closed cases"
          />
          <StatsCard
            title="Critical"
            value={dashboard.criticalComplaints}
            icon={AlertTriangle}
            color="red"
            subtitle="High priority"
          />
        </section>
      )}

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <SectionCard
            title="Complaint queue"
            subtitle={
              loading
                ? "Loading queue…"
                : pending > 0
                  ? `${pending} complaint${pending === 1 ? "" : "s"} awaiting review`
                  : "Latest complaints awaiting department action"
            }
            action={
              <Link to="/department-manager/complaints">
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
                complaints={queue.slice(0, 6)}
                detailBasePath="/department-manager/complaints"
                emptyTitle="Queue is clear"
                emptyDescription="New complaints routed to your department will show up here."
              />
            )}
          </SectionCard>

          <StatisticsCharts
            statistics={statistics}
            loading={loading}
            statisticsPath="/department-manager/statistics"
          />
        </div>

        <div className="space-y-6">
          <SectionCard
            title="Quick actions"
            subtitle="Common manager tasks"
          >
            <DashboardQuickActions actions={QUICK_ACTIONS} />
          </SectionCard>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
