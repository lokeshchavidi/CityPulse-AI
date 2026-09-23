import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Mail, Phone, CalendarDays, Save, Ban, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import SectionCard from "@/components/dashboard/SectionCard";
import LoadingSkeleton from "@/components/dashboard/LoadingSkeleton";
import EmptyState from "@/components/dashboard/EmptyState";
import Select from "@/components/forms/Select";
import Button from "@/components/common/Button/Button";
import ConfirmDialog from "@/components/common/ConfirmDialog";

import adminService from "@/services/adminService";
import departmentService from "@/services/departmentService";
import dateUtils from "@/utils/dateUtils";
import useAuth from "@/hooks/useAuth";

const UserDetails = () => {
  const { id } = useParams();
  const { user: currentUser } = useAuth();

  const [user, setUser] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [departmentId, setDepartmentId] = useState("");
  const [saving, setSaving] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);
  // Replaces window.confirm() with a dialog matching the rest of the app.
  const [confirmingStatusChange, setConfirmingStatusChange] = useState(false);

  useEffect(() => {
    loadUser();
    loadDepartments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const loadUser = async () => {
    try {
      setLoading(true);

      const response = await adminService.getUserByUserId(id);

      setUser(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const loadDepartments = async () => {
    try {
      const response = await departmentService.getAllDepartments();
      setDepartments(response ?? []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateDepartment = async (e) => {
    e.preventDefault();

    if (!departmentId) {
      toast.error("Please select a department.");
      return;
    }

    try {
      setSaving(true);

      const updatedUser = await adminService.updateUserDepartment(
        id,
        Number(departmentId),
      );

      setUser(updatedUser);
      setDepartmentId("");

      toast.success("Department updated successfully.");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ?? "Couldn't update department.",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleToggleStatus = () => {
    setConfirmingStatusChange(true);
  };

  const confirmToggleStatus = async () => {
    const action = user.enabled ? "disable" : "enable";

    try {
      setStatusLoading(true);

      const updatedUser = user.enabled
        ? await adminService.disableUser(id)
        : await adminService.enableUser(id);

      setUser(updatedUser);

      toast.success(`Account ${action}d successfully.`);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ?? `Couldn't ${action} this account.`,
      );
    } finally {
      setStatusLoading(false);
      setConfirmingStatusChange(false);
    }
  };

  if (loading) return <LoadingSkeleton variant="detail" />;

  if (!user) {
    return (
      <EmptyState title="User not found" description="This user could not be found." />
    );
  }

  const isSelf = user.userId === currentUser?.userId;

  const departmentOptions = departments.map((department) => ({
    value: department.departmentId,
    label: department.departmentName,
  }));

  return (
    <div className="space-y-6 md:space-y-8">
      <DashboardHeader
        title={`${user.firstName} ${user.lastName}`}
        subtitle={user.userId}
        action={
          !isSelf && (
            <Button
              variant={user.enabled ? "danger" : "outline"}
              leftIcon={user.enabled ? <Ban size={18} /> : <CheckCircle2 size={18} />}
              loading={statusLoading}
              onClick={handleToggleStatus}
              className="w-full sm:w-auto"
            >
              {user.enabled ? "Disable account" : "Enable account"}
            </Button>
          )
        }
      />

      <SectionCard title="User information">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-slate-400">
              <Mail size={13} aria-hidden="true" /> Email
            </p>
            <p className="mt-1 text-sm font-medium text-slate-900">{user.email}</p>
          </div>

          <div>
            <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-slate-400">
              <Phone size={13} aria-hidden="true" /> Phone
            </p>
            <p className="mt-1 text-sm font-medium text-slate-900">
              {user.phoneNumber}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Role
            </p>
            <p className="mt-1">
              <span className="inline-block rounded-lg bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-800">
                {user.role?.replaceAll("_", " ")}
              </span>
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Department
            </p>
            <p className="mt-1 text-sm font-medium text-slate-900">
              {user.department || "—"}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Status
            </p>
            <p className="mt-1">
              <span
                className={`inline-block whitespace-nowrap rounded-lg px-2.5 py-1 text-xs font-semibold ${
                  user.enabled
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {user.enabled ? "Active" : "Disabled"}
              </span>
            </p>
          </div>

          <div>
            <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-slate-400">
              <CalendarDays size={13} aria-hidden="true" /> Joined
            </p>
            <p className="mt-1 text-sm font-medium text-slate-900">
              {dateUtils.formatDate(user.createdAt)}
            </p>
          </div>
        </div>
      </SectionCard>

      {(user.role === "OFFICER" || user.role === "DEPARTMENT_MANAGER") && (
        <SectionCard
          title="Update Department"
          subtitle="Reassign this user to a different department."
        >
          <form
            onSubmit={handleUpdateDepartment}
            className="flex flex-col gap-4 sm:flex-row sm:items-end"
          >
            <div className="flex-1">
              <Select
                label="Department"
                value={departmentId}
                onChange={(e) => setDepartmentId(e.target.value)}
                options={departmentOptions}
                placeholder="Select a department"
              />
            </div>

            <Button type="submit" loading={saving} leftIcon={<Save size={18} />}>
              Update
            </Button>
          </form>
        </SectionCard>
      )}

      <ConfirmDialog
        open={confirmingStatusChange}
        title={user.enabled ? "Disable this account?" : "Enable this account?"}
        description={
          user.enabled
            ? `${user.firstName} ${user.lastName} will immediately lose access to their account.`
            : `${user.firstName} ${user.lastName} will regain access to their account.`
        }
        confirmLabel={user.enabled ? "Disable" : "Enable"}
        variant={user.enabled ? "danger" : "primary"}
        loading={statusLoading}
        onConfirm={confirmToggleStatus}
        onCancel={() => setConfirmingStatusChange(false)}
      />
    </div>
  );
};

export default UserDetails;
