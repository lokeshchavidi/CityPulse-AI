import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ThemeToggle from "@/components/common/ThemeToggle";
import ProfileForm from "@/components/shared/ProfileForm";

const Profile = () => {
  return (
    <div className="mx-auto max-w-5xl space-y-6 md:space-y-8">
      <DashboardHeader
        title="My profile"
        subtitle="Update your personal details and keep your account secure."
        action={<ThemeToggle variant="segmented" />}
      />

      <ProfileForm />
    </div>
  );
};

export default Profile;
