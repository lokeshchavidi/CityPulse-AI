import {
  AlertTriangle,
  CheckCircle2,
  ClipboardList,
  Clock3,
  LoaderCircle,
  UserCheck,
} from "lucide-react";

import StatsCard from "@/components/dashboard/StatsCard";

const DashboardStats = ({ dashboard }) => {
  const stats = [
    {
      title: "Total Complaints",
      value: dashboard?.totalComplaints ?? 0,
      icon: ClipboardList,
      color: "blue",
      subtitle: "All submitted complaints",
    },
    {
      title: "Open",
      value: dashboard?.openComplaints ?? 0,
      icon: AlertTriangle,
      color: "orange",
      subtitle: "Waiting for review",
    },
    {
      title: "Under Review",
      value: dashboard?.underReviewComplaints ?? 0,
      icon: Clock3,
      color: "purple",
      subtitle: "Being analyzed",
    },
    {
      title: "Assigned",
      value: dashboard?.assignedComplaints ?? 0,
      icon: UserCheck,
      color: "teal",
      subtitle: "Assigned to officers",
    },
    {
      title: "In Progress",
      value: dashboard?.inProgressComplaints ?? 0,
      icon: LoaderCircle,
      color: "blue",
      subtitle: "Currently being resolved",
    },
    {
      title: "Resolved",
      value: dashboard?.resolvedComplaints ?? 0,
      icon: CheckCircle2,
      color: "green",
      subtitle: "Successfully completed",
    },
  ];

  return (
    <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((item) => (
        <StatsCard key={item.title} {...item} />
      ))}
    </section>
  );
};

export default DashboardStats;
