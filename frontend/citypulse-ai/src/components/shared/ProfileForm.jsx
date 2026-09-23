import { useEffect, useMemo, useState } from "react";
import { KeyRound, Mail, Phone, Save, Shield, UserRound } from "lucide-react";
import toast from "react-hot-toast";

import Input from "@/components/forms/Input";
import PasswordInput from "@/components/forms/PasswordInput";
import Button from "@/components/common/Button/Button";
import SectionCard from "@/components/dashboard/SectionCard";
import PasswordChecklist from "@/components/common/Password/PasswordChecklist";
import PasswordStrength from "@/components/common/Password/PasswordStrength";

import useAuth from "@/hooks/useAuth";
import userService from "@/services/userService";
import {
  getPasswordRequirements,
  getPasswordStrength,
} from "@/utils/passwordUtils";

const initialPasswordForm = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const ROLE_LABELS = {
  CITIZEN: "Citizen",
  OFFICER: "Officer",
  DEPARTMENT_MANAGER: "Department Manager",
  ADMIN: "Administrator",
};

const getInitials = (firstName = "", lastName = "") => {
  const first = firstName.trim().charAt(0);
  const last = lastName.trim().charAt(0);
  const initials = `${first}${last}`.toUpperCase();
  return initials || "U";
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

  const strength = useMemo(
    () => getPasswordStrength(passwordForm.newPassword),
    [passwordForm.newPassword],
  );

  const requirements = useMemo(
    () => getPasswordRequirements(passwordForm.newPassword),
    [passwordForm.newPassword],
  );

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

  const displayName =
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") || "Your account";
  const roleLabel = ROLE_LABELS[user?.role] ?? user?.role ?? "User";

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-surface shadow-soft-sm">
        <div className="border-b border-slate-200 bg-gradient-to-br from-brand-50 via-white to-canvas px-5 py-6 md:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-brand-700 text-lg font-bold tracking-wide text-white shadow-soft-sm"
              aria-hidden="true"
            >
              {getInitials(user?.firstName, user?.lastName)}
            </div>

            <div className="min-w-0">
              <h2 className="truncate text-xl font-bold tracking-tight text-slate-900">
                {displayName}
              </h2>
              <p className="mt-1 truncate text-sm text-slate-500">
                {user?.email ?? "—"}
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-surface px-2.5 py-1 text-xs font-semibold text-brand-800 ring-1 ring-brand-100">
                  <Shield size={13} aria-hidden="true" />
                  {roleLabel}
                </span>
                {user?.phoneNumber && (
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-surface px-2.5 py-1 text-xs font-medium text-slate-600 ring-1 ring-slate-200">
                    <Phone size={13} aria-hidden="true" />
                    {user.phoneNumber}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 px-5 py-4 text-sm text-slate-600 sm:grid-cols-3 md:px-6">
          <div className="flex items-start gap-2">
            <UserRound size={16} className="mt-0.5 text-slate-400" aria-hidden="true" />
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Full name
              </p>
              <p className="mt-0.5 font-medium text-slate-800">{displayName}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Mail size={16} className="mt-0.5 text-slate-400" aria-hidden="true" />
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Email
              </p>
              <p className="mt-0.5 truncate font-medium text-slate-800">
                {user?.email ?? "—"}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Shield size={16} className="mt-0.5 text-slate-400" aria-hidden="true" />
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Role
              </p>
              <p className="mt-0.5 font-medium text-slate-800">{roleLabel}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid items-start gap-6 xl:grid-cols-2">
        <SectionCard
          title="Personal information"
          subtitle="Update the details shown on your account."
        >
          <form onSubmit={handleProfileSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <Input
                label="First name"
                name="firstName"
                value={profileForm.firstName}
                onChange={handleProfileChange}
                required
              />

              <Input
                label="Last name"
                name="lastName"
                value={profileForm.lastName}
                onChange={handleProfileChange}
                required
              />
            </div>

            <Input
              label="Email address"
              name="email"
              value={user?.email ?? ""}
              disabled
            />

            <Input
              label="Phone number"
              name="phoneNumber"
              value={profileForm.phoneNumber}
              onChange={handleProfileChange}
              placeholder="10-digit mobile number"
              required
            />

            <div className="flex justify-end border-t border-slate-100 pt-4">
              <Button
                type="submit"
                loading={savingProfile}
                leftIcon={<Save size={18} aria-hidden="true" />}
                className="w-full sm:w-auto"
              >
                Save changes
              </Button>
            </div>
          </form>
        </SectionCard>

        <SectionCard
          title="Change password"
          subtitle="You'll be signed out after a successful update."
        >
          <form onSubmit={handlePasswordSubmit} className="space-y-5">
            <PasswordInput
              label="Current password"
              name="currentPassword"
              value={passwordForm.currentPassword}
              onChange={handlePasswordChange}
              autoComplete="current-password"
              required
            />

            <PasswordInput
              label="New password"
              name="newPassword"
              value={passwordForm.newPassword}
              onChange={handlePasswordChange}
              autoComplete="new-password"
              required
            />

            {passwordForm.newPassword ? (
              <div className="space-y-3">
                <PasswordStrength strength={strength} />
                <PasswordChecklist requirements={requirements} />
              </div>
            ) : null}

            <PasswordInput
              label="Confirm new password"
              name="confirmPassword"
              value={passwordForm.confirmPassword}
              onChange={handlePasswordChange}
              autoComplete="new-password"
              required
            />

            <div className="flex justify-end border-t border-slate-100 pt-4">
              <Button
                type="submit"
                loading={savingPassword}
                leftIcon={<KeyRound size={18} aria-hidden="true" />}
                className="w-full sm:w-auto"
              >
                Update password
              </Button>
            </div>
          </form>
        </SectionCard>
      </div>
    </div>
  );
};

export default ProfileForm;
