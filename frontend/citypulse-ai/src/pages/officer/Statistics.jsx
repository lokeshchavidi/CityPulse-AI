import StatisticsPage from "@/components/dashboard/StatisticsPage";
import officerService from "@/services/officerService";

const OfficerStatistics = () => (
  <StatisticsPage
    title="Workload statistics"
    subtitle="Assignment, progress, and resolution trends for your cases."
    fetchStatistics={officerService.getStatistics}
  />
);

export default OfficerStatistics;
