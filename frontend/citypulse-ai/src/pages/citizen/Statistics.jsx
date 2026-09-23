import StatisticsPage from "@/components/dashboard/StatisticsPage";
import userService from "@/services/userService";

const CitizenStatistics = () => (
  <StatisticsPage
    title="My statistics"
    subtitle="How your complaints are progressing over time."
    fetchStatistics={userService.getStatistics}
  />
);

export default CitizenStatistics;
