import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  Building2,
  CheckCircle2,
  ClipboardList,
  FolderOpen,
  Hourglass,
  Loader2,
  PlusCircle,
  ShieldCheck,
  UserCheck,
  Users,
  BarChart3,
} from "lucide-react";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatsCard from "@/components/dashboard/StatsCard";
import SectionCard from "@/components/dashboard/SectionCard";
import LoadingSkeleton from "@/components/dashboard/LoadingSkeleton";
import Button from "@/components/common/Button/Button";
import DashboardQuickActions from "@/components/shared/DashboardQuickActions";
import ComplaintQueueTable from "@/components/shared/ComplaintQueueTable";
import { StatisticsCharts, emptyStatistics } from "@/components/dashboard/Charts";

import adminService from "@/services/adminService";
import complaintService from "@/services/complaintService";
import useAuth from "@/hooks/useAuth";

const QUICK_ACTIONS = [
  {
    title: "All complaints",
    description: "Browse the full registry",
    icon: ClipboardList,
    path: "/admin/complaints",
  },
  {
    title: "Statistics",
    description: "Platform charts and trends",
    icon: BarChart3,
    path: "/admin/statistics",
  },
  {
    title: "Manage users",
    description: "Citizens and staff accounts",
    icon: Users,
    path: "/admin/users",
  },
  {
    title: "Create staff user",
    description: "Add officers or managers",
    icon: PlusCircle,
    path: "/admin/users/new",
  },
  {
    title: "Departments",
    description: "Configure city departments",
    icon: Building2,
    path: "/admin/departments",
  },
];

const Dashboard = () => {
  const { user } = useAuth();

  const [dashboard, setDashboard] = useState({
    totalComplaints: 0,
    openComplaints: 0,
    underReviewComplaints: 0,
    assignedComplaints: 0,
    inProgressComplaints: 0,
    resolvedComplaints: 0,
    criticalComplaints: 0,
    totalCitizens: 0,
    totalOfficers: 0,
    totalDepartmentManagers: 0,
    totalDepartments: 0,
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
          adminService.getDashboard(),
          complaintService.getAllComplaints(),
          adminService.getStatistics(),
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

  const complaintCards = [
    {
      title: "Total Complaints",
      value: dashboard.totalComplaints,
      icon: ClipboardList,
      color: "blue",
      subtitle: "Platform-wide",
    },
    {
      title: "Open",
      value: dashboard.openComplaints,
      icon: FolderOpen,
      color: "purple",
      subtitle: "Awaiting intake",
    },
    {
      title: "Under Review",
      value: dashboard.underReviewComplaints,
      icon: Hourglass,
      color: "orange",
      subtitle: "In assessment",
    },
    {
      title: "Assigned",
      value: dashboard.assignedComplaints,
      icon: UserCheck,
      color: "teal",
      subtitle: "With officers",
    },
    {
      title: "In Progress",
      value: dashboard.inProgressComplaints,
      icon: Loader2,
      color: "blue",
      subtitle: "Active field work",
    },
    {
      title: "Resolved",
      value: dashboard.resolvedComplaints,
      icon: CheckCircle2,
      color: "green",
      subtitle: "Successfully closed",
    },
    {
      title: "Critical",
      value: dashboard.criticalComplaints,
      icon: AlertTriangle,
      color: "red",
      subtitle: "Needs attention",
    },
    {
      title: "Needs assignment",
      value: complaints.filter((item) => item.needsManualAssignment).length,
      icon: AlertTriangle,
      color: "orange",
      subtitle: "AI analysis failed",
    },
  ];

  const platformCards = [
    {
      title: "Citizens",
      value: dashboard.totalCitizens,
      icon: Users,
      color: "blue",
      subtitle: "Registered accounts",
    },
    {
      title: "Officers",
      value: dashboard.totalOfficers,
      icon: ShieldCheck,
      color: "teal",
      subtitle: "Field staff",
    },
    {
      title: "Dept. Managers",
      value: dashboard.totalDepartmentManagers,
      icon: UserCheck,
      color: "purple",
      subtitle: "Department leads",
    },
    {
      title: "Departments",
      value: dashboard.totalDepartments,
      icon: Building2,
      color: "orange",
      subtitle: "Active units",
    },
  ];

  return (
    <div className="space-y-6 md:space-y-8">
      <DashboardHeader
        title={`Welcome back${user?.firstName ? `, ${user.firstName}` : ""}`}
        subtitle="Platform-wide overview of complaints, staff, and departments."
        action={
          <Link to="/admin/users/new">
            <Button
              leftIcon={<PlusCircle size={18} aria-hidden="true" />}
              className="w-full sm:w-auto"
            >
              Create staff user
            </Button>
          </Link>
        }
      />

      {loading ? (
        <LoadingSkeleton cards={7} />
      ) : (
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {complaintCards.map((card) => (
            <StatsCard key={card.title} {...card} />
          ))}
        </section>
      )}

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <SectionCard
            title="All complaints"
            subtitle="Latest platform complaints across every department."
            action={
              <Link to="/admin/complaints">
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
                complaints={[...complaints]
                  .sort(
                    (a, b) =>
                      Number(Boolean(b.needsManualAssignment)) -
                      Number(Boolean(a.needsManualAssignment)),
                  )
                  .slice(0, 6)}
                detailBasePath="/admin/complaints"
                emptyTitle="No complaints yet"
                emptyDescription="Citizen filings will appear here as they come in."
              />
            )}
          </SectionCard>

          <StatisticsCharts
            statistics={statistics}
            loading={loading}
            statisticsPath="/admin/statistics"
          />

          <SectionCard
            title="Platform overview"
            subtitle="Registered users and departments across CityPulse AI."
            action={
              <Link to="/admin/users">
                <Button size="sm" variant="outline">
                  Manage users
                </Button>
              </Link>
            }
          >
            {loading ? (
              <LoadingSkeleton cards={4} />
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {platformCards.map((card) => (
                  <StatsCard key={card.title} {...card} />
                ))}
              </div>
            )}
          </SectionCard>
        </div>

        <div className="space-y-6">
          <SectionCard
            title="Quick actions"
            subtitle="Common admin tasks"
          >
            <DashboardQuickActions actions={QUICK_ACTIONS} />
          </SectionCard>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
