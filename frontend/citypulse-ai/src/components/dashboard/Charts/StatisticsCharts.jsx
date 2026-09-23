import { Link } from "react-router-dom";

import SectionCard from "@/components/dashboard/SectionCard";
import LoadingSkeleton from "@/components/dashboard/LoadingSkeleton";
import Button from "@/components/common/Button/Button";
import StatusPieChart from "./StatusPieChart";
import MonthlyTrendChart from "./MonthlyTrendChart";

/**
 * Two analytics sections shown on role dashboards — status pie + monthly trend.
 */
const StatisticsCharts = ({
  statistics,
  loading = false,
  statisticsPath,
}) => {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <SectionCard
        title="Status distribution"
        subtitle="How complaints are spread across lifecycle stages."
        action={
          statisticsPath ? (
            <Link to={statisticsPath}>
              <Button size="sm" variant="outline">
                View statistics
              </Button>
            </Link>
          ) : null
        }
      >
        {loading ? <LoadingSkeleton rows={4} /> : (
          <StatusPieChart data={statistics?.statusBreakdown} />
        )}
      </SectionCard>

      <SectionCard
        title="Monthly activity"
        subtitle="Filed vs resolved complaints over the last 6 months."
        action={
          statisticsPath ? (
            <Link to={statisticsPath}>
              <Button size="sm" variant="outline">
                View statistics
              </Button>
            </Link>
          ) : null
        }
      >
        {loading ? <LoadingSkeleton rows={4} /> : (
          <MonthlyTrendChart data={statistics?.monthlyTrend} />
        )}
      </SectionCard>
    </div>
  );
};

export default StatisticsCharts;
