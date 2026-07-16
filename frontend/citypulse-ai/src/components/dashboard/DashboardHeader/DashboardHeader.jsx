import PageHeader from "../PageHeader";

const DashboardHeader = ({ title, subtitle, action }) => {
  return <PageHeader title={title} subtitle={subtitle} action={action} />;
};

export default DashboardHeader;
