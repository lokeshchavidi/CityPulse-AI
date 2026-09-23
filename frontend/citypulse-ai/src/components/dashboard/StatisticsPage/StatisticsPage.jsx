import { useEffect, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  ClipboardList,
  FolderOpen,
  Percent,
} from "lucide-react";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatsCard from "@/components/dashboard/StatsCard";
import SectionCard from "@/components/dashboard/SectionCard";
import LoadingSkeleton from "@/components/dashboard/LoadingSkeleton";
import {
  StatusPieChart,
  MonthlyTrendChart,
  PriorityBarChart,
  emptyStatistics,
} from "@/components/dashboard/Charts";

/**
 * Shared statistics page used by all roles. Pass a fetchStatistics function
 * that calls the role-scoped API, and optionally show department breakdown.
 */
const StatisticsPage = ({
  title = "Statistics",
  subtitle = "Live complaint analytics for your workspace.",
  fetchStatistics,
  showDepartments = false,
}) => {
  const [statistics, setStatistics] = useState(emptyStatistics);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStatistics();
  }, []);

  const loadStatistics = async () => {
    try {
      setLoading(true);
      const response = await fetchStatistics();
      setStatistics(response ?? emptyStatistics);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 md:space-y-8">
      <DashboardHeader title={title} subtitle={subtitle} />

      {loading ? (
        <LoadingSkeleton cards={5} />
      ) : (
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <StatsCard
            title="Total"
            value={statistics.totalComplaints}
            icon={ClipboardList}
            color="blue"
            subtitle="In scope"
          />
          <StatsCard
            title="Open / Active"
            value={statistics.openComplaints}
            icon={FolderOpen}
            color="orange"
            subtitle="Needs attention"
          />
          <StatsCard
            title="Resolved"
            value={statistics.resolvedComplaints}
            icon={CheckCircle2}
            color="green"
            subtitle="Closed successfully"
          />
          <StatsCard
            title="Critical"
            value={statistics.criticalComplaints}
            icon={AlertTriangle}
            color="red"
            subtitle="Highest priority"
          />
          <StatsCard
            title="Resolution rate"
            value={`${statistics.resolutionRate ?? 0}%`}
            icon={Percent}
            color="teal"
            subtitle="Of total caseload"
          />
        </section>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard
          title="Status distribution"
          subtitle="Share of complaints by lifecycle stage."
        >
          {loading ? (
            <LoadingSkeleton rows={4} />
          ) : (
            <StatusPieChart data={statistics.statusBreakdown} />
          )}
        </SectionCard>

        <SectionCard
          title="Priority mix"
          subtitle="How cases are prioritized across the queue."
        >
          {loading ? (
            <LoadingSkeleton rows={4} />
          ) : (
            <PriorityBarChart data={statistics.priorityBreakdown} />
          )}
        </SectionCard>
      </div>

      <SectionCard
        title="Monthly activity"
        subtitle="Filed vs resolved volume over the last 6 months."
      >
        {loading ? (
          <LoadingSkeleton rows={4} />
        ) : (
          <MonthlyTrendChart data={statistics.monthlyTrend} />
        )}
      </SectionCard>

      {showDepartments && (
        <SectionCard
          title="By department"
          subtitle="Platform-wide complaint volume across departments."
        >
          {loading ? (
            <LoadingSkeleton rows={4} />
          ) : (
            <PriorityBarChart data={statistics.departmentBreakdown} />
          )}
        </SectionCard>
      )}
    </div>
  );
};

export default StatisticsPage;
