import StatisticsPage from "@/components/dashboard/StatisticsPage";
import departmentManagerService from "@/services/departmentManagerService";

const DepartmentManagerStatistics = () => (
  <StatisticsPage
    title="Department statistics"
    subtitle="Department-wide complaint volume, priority, and resolution trends."
    fetchStatistics={departmentManagerService.getStatistics}
  />
);

export default DepartmentManagerStatistics;
