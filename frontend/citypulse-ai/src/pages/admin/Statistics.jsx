import StatisticsPage from "@/components/dashboard/StatisticsPage";
import adminService from "@/services/adminService";

const AdminStatistics = () => (
  <StatisticsPage
    title="Platform statistics"
    subtitle="City-wide complaint analytics across status, priority, and departments."
    fetchStatistics={adminService.getStatistics}
    showDepartments
  />
);

export default AdminStatistics;
