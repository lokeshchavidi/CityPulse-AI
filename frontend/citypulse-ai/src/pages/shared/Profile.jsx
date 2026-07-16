import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ProfileForm from "@/components/shared/ProfileForm";

const Profile = () => {
  return (
    <div className="space-y-8">
      <DashboardHeader
        title="My Profile"
        subtitle="Manage your personal information and account security."
      />

      <ProfileForm />
    </div>
  );
};

export default Profile;
