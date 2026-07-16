import { useEffect, useState } from "react";
import { KeyRound, Save } from "lucide-react";
import toast from "react-hot-toast";
 
import Input from "@/components/forms/Input";
import PasswordInput from "@/components/forms/PasswordInput";
import Button from "@/components/common/Button/Button";
import SectionCard from "@/components/dashboard/SectionCard";
 
import useAuth from "@/hooks/useAuth";
import userService from "@/services/userService";
 
const initialPasswordForm = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};
 
const ProfileForm = () => {
  const { user, logout, refreshUser } = useAuth();
 
  const [profileForm, setProfileForm] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });
 
  const [passwordForm, setPasswordForm] = useState(initialPasswordForm);
 
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
 
  useEffect(() => {
    if (!user) return;
 
    setProfileForm({
      firstName: user.firstName ?? "",
      lastName: user.lastName ?? "",
      phoneNumber: user.phoneNumber ?? "",
    });
  }, [user]);
 
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
 
    setProfileForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
 
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
 
    setPasswordForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
 
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
 
    try {
      setSavingProfile(true);
 
      await userService.updateProfile(profileForm);
 
      // Refresh authenticated user so the entire UI updates instantly
      await refreshUser();
 
      toast.success("Profile updated successfully.");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ?? "Failed to update profile.",
      );
    } finally {
      setSavingProfile(false);
    }
  };
 
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
 
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }
 
    try {
      setSavingPassword(true);
 
      await userService.changePassword(passwordForm);
 
      toast.success("Password changed. Please sign in again.");
 
      setPasswordForm(initialPasswordForm);
 
      logout();
    } catch (error) {
      toast.error(
        error?.response?.data?.message ?? "Failed to change password.",
      );
    } finally {
      setSavingPassword(false);
    }
  };
 
  return (
<div className="space-y-6">
<SectionCard
        title="Personal Information"
        subtitle="Update your basic profile information."
>
<form onSubmit={handleProfileSubmit} className="space-y-6">
<div className="grid gap-5 md:grid-cols-2">
<Input
              label="First Name"
              name="firstName"
              value={profileForm.firstName}
              onChange={handleProfileChange}
              required
            />
 
            <Input
              label="Last Name"
              name="lastName"
              value={profileForm.lastName}
              onChange={handleProfileChange}
              required
            />
</div>
 
          <Input
            label="Email Address"
            name="email"
            value={user?.email ?? ""}
            disabled
          />
 
          <Input
            label="Phone Number"
            name="phoneNumber"
            value={profileForm.phoneNumber}
            onChange={handleProfileChange}
            placeholder="10-digit mobile number"
            required
          />
 
          <div className="flex justify-end">
<Button
              type="submit"
              loading={savingProfile}
              leftIcon={<Save size={18} />}
>
              Save Changes
</Button>
</div>
</form>
</SectionCard>
 
      <SectionCard
        title="Change Password"
        subtitle="Choose a strong password to keep your account secure."
>
<form onSubmit={handlePasswordSubmit} className="space-y-6">
<PasswordInput
            label="Current Password"
            name="currentPassword"
            value={passwordForm.currentPassword}
            onChange={handlePasswordChange}
            autoComplete="current-password"
            required
          />
 
          <div className="grid gap-5 md:grid-cols-2">
<PasswordInput
              label="New Password"
              name="newPassword"
              value={passwordForm.newPassword}
              onChange={handlePasswordChange}
              autoComplete="new-password"
              required
            />
 
            <PasswordInput
              label="Confirm New Password"
              name="confirmPassword"
              value={passwordForm.confirmPassword}
              onChange={handlePasswordChange}
              autoComplete="new-password"
              required
            />
</div>
 
          <div className="flex justify-end">
<Button
              type="submit"
              loading={savingPassword}
              leftIcon={<KeyRound size={18} />}
>
              Update Password
</Button>
</div>
</form>
</SectionCard>
</div>
  );
};
 
export default ProfileForm;