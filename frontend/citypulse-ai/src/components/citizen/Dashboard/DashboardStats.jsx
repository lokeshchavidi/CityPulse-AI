import {
  AlertTriangle,
  CheckCircle2,
  ClipboardList,
  Clock3,
  LoaderCircle,
  UserCheck,
} from "lucide-react";

import StatsCard from "@/components/dashboard/StatsCard";
import LoadingSkeleton from "@/components/dashboard/LoadingSkeleton";

const DashboardStats = ({ dashboard, loading = false }) => {
  if (loading) {
    return <LoadingSkeleton cards={6} />;
  }

  const stats = [
    {
      title: "Total Complaints",
      value: dashboard?.totalComplaints ?? 0,
      icon: ClipboardList,
      color: "blue",
      subtitle: "All submissions",
    },
    {
      title: "Open",
      value: dashboard?.openComplaints ?? 0,
      icon: AlertTriangle,
      color: "orange",
      subtitle: "Awaiting intake",
    },
    {
      title: "Under Review",
      value: dashboard?.underReviewComplaints ?? 0,
      icon: Clock3,
      color: "purple",
      subtitle: "Being assessed",
    },
    {
      title: "Assigned",
      value: dashboard?.assignedComplaints ?? 0,
      icon: UserCheck,
      color: "teal",
      subtitle: "With an officer",
    },
    {
      title: "In Progress",
      value: dashboard?.inProgressComplaints ?? 0,
      icon: LoaderCircle,
      color: "blue",
      subtitle: "Work underway",
    },
    {
      title: "Resolved",
      value: dashboard?.resolvedComplaints ?? 0,
      icon: CheckCircle2,
      color: "green",
      subtitle: "Successfully closed",
    },
  ];

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {stats.map((item) => (
        <StatsCard key={item.title} {...item} />
      ))}
    </section>
  );
};

export default DashboardStats;
