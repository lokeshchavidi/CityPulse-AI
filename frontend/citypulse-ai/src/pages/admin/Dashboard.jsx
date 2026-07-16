import { useEffect, useState } from "react";
import {
  ClipboardList,
  FolderOpen,
  Hourglass,
  UserCheck,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  Users,
  ShieldCheck,
  Building2,
} from "lucide-react";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatsCard from "@/components/dashboard/StatsCard";
import SectionCard from "@/components/dashboard/SectionCard";
import LoadingSkeleton from "@/components/dashboard/LoadingSkeleton";

import adminService from "@/services/adminService";
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
    criticalComplaints: 0,
    totalCitizens: 0,
    totalOfficers: 0,
    totalDepartmentManagers: 0,
    totalDepartments: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const response = await adminService.getDashboard();

      setDashboard(response);
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
    },
    {
      title: "Open",
      value: dashboard.openComplaints,
      icon: FolderOpen,
      color: "purple",
    },
    {
      title: "Under Review",
      value: dashboard.underReviewComplaints,
      icon: Hourglass,
      color: "orange",
    },
    {
      title: "Assigned",
      value: dashboard.assignedComplaints,
      icon: UserCheck,
      color: "teal",
    },
    {
      title: "In Progress",
      value: dashboard.inProgressComplaints,
      icon: Loader2,
      color: "blue",
    },
    {
      title: "Resolved",
      value: dashboard.resolvedComplaints,
      icon: CheckCircle2,
      color: "green",
    },
    {
      title: "Critical",
      value: dashboard.criticalComplaints,
      icon: AlertTriangle,
      color: "red",
    },
  ];

  const platformCards = [
    {
      title: "Citizens",
      value: dashboard.totalCitizens,
      icon: Users,
      color: "blue",
    },
    {
      title: "Officers",
      value: dashboard.totalOfficers,
      icon: ShieldCheck,
      color: "teal",
    },
    {
      title: "Department Managers",
      value: dashboard.totalDepartmentManagers,
      icon: UserCheck,
      color: "purple",
    },
    {
      title: "Departments",
      value: dashboard.totalDepartments,
      icon: Building2,
      color: "orange",
    },
  ];

  return (
    <div className="space-y-6">
      <DashboardHeader
        title={`Welcome back${user?.firstName ? `, ${user.firstName}` : ""}`}
        subtitle="Platform-wide overview of complaints across every department."
      />

      {loading ? (
        <LoadingSkeleton cards={7} />
      ) : (
        <>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {complaintCards.map((card) => (
              <StatsCard key={card.title} {...card} />
            ))}
          </div>

          <SectionCard
            title="Platform Overview"
            subtitle="Registered users and departments across CityPulse AI."
          >
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {platformCards.map((card) => (
                <StatsCard key={card.title} {...card} />
              ))}
            </div>
          </SectionCard>
        </>
      )}
    </div>
  );
};

export default Dashboard;
