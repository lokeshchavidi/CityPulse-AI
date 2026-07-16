import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Search, UserPlus, Ban, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import SectionCard from "@/components/dashboard/SectionCard";
import LoadingSkeleton from "@/components/dashboard/LoadingSkeleton";
import EmptyState from "@/components/dashboard/EmptyState";
import Button from "@/components/common/Button/Button";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import Select from "@/components/forms/Select";

import adminService from "@/services/adminService";
import { ROLES } from "@/constants/roles";
import useAuth from "@/hooks/useAuth";

const ROLE_FILTER_OPTIONS = [
  { value: ROLES.CITIZEN, label: "Citizen" },
  { value: ROLES.OFFICER, label: "Officer" },
  { value: ROLES.DEPARTMENT_MANAGER, label: "Department Manager" },
  { value: ROLES.ADMIN, label: "Admin" },
];

const Users = () => {
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [actioningUserId, setActioningUserId] = useState(null);
  // Holds the user pending a disable/enable confirmation. Replaces
  // window.confirm() (an unstyled native browser popup) with a dialog
  // that matches the rest of the app.
  const [pendingToggleUser, setPendingToggleUser] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);

      const response = await adminService.getAllUsers();

      setUsers(response ?? []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = (targetUser) => {
    setPendingToggleUser(targetUser);
  };

  const confirmToggleStatus = async () => {
    const targetUser = pendingToggleUser;
    if (!targetUser) return;

    const action = targetUser.enabled ? "disable" : "enable";

    try {
      setActioningUserId(targetUser.userId);

      const updatedUser = targetUser.enabled
        ? await adminService.disableUser(targetUser.userId)
        : await adminService.enableUser(targetUser.userId);

      setUsers((prev) =>
        prev.map((u) => (u.userId === updatedUser.userId ? updatedUser : u)),
      );

      toast.success(`Account ${action}d successfully.`);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ?? `Couldn't ${action} this account.`,
      );
    } finally {
      setActioningUserId(null);
      setPendingToggleUser(null);
    }
  };

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesRole = !roleFilter || user.role === roleFilter;

      const matchesSearch =
        !search.trim() ||
        `${user.firstName} ${user.lastName} ${user.email}`
          .toLowerCase()
          .includes(search.trim().toLowerCase());

      return matchesRole && matchesSearch;
    });
  }, [users, search, roleFilter]);

  return (
    <div className="space-y-8">
      <DashboardHeader
        title="Users"
        subtitle="All registered citizens, officers, department managers and admins."
        action={
          <Button
            leftIcon={<UserPlus size={18} />}
            onClick={() => navigate("/admin/users/new")}
          >
            Add Staff Account
          </Button>
        }
      />

      <SectionCard>
        <div className="mb-6 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or email..."
              className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 text-sm outline-none transition-all focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            />
          </div>

          <div className="sm:w-64">
            <Select
              name="roleFilter"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              options={ROLE_FILTER_OPTIONS}
              placeholder="All Roles"
            />
          </div>
        </div>

        {loading ? (
          <LoadingSkeleton cards={4} />
        ) : filteredUsers.length === 0 ? (
          <EmptyState
            title="No users found"
            description="Try adjusting your search or filter."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-[880px] w-full">
              <thead>
                <tr className="border-b border-slate-200 text-left">
                  <th className="py-3 pr-4 text-sm font-semibold text-slate-600">
                    Name
                  </th>
                  <th className="py-3 pr-4 text-sm font-semibold text-slate-600">
                    Email
                  </th>
                  <th className="py-3 pr-4 text-sm font-semibold text-slate-600">
                    Role
                  </th>
                  <th className="py-3 pr-4 text-sm font-semibold text-slate-600">
                    Department
                  </th>
                  <th className="py-3 pr-4 text-sm font-semibold text-slate-600">
                    Status
                  </th>
                  <th className="py-3 text-sm font-semibold text-slate-600">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((user) => {
                  const isSelf = user.userId === currentUser?.userId;

                  return (
                    <tr
                      key={user.userId}
                      onClick={() => navigate(`/admin/users/${user.userId}`)}
                      className="group cursor-pointer border-b border-slate-100 transition-colors duration-200 hover:bg-slate-50"
                    >
                      <td className="py-4 pr-4">
                        <span className="font-semibold text-slate-900 transition-colors group-hover:text-blue-700">
                          {user.firstName} {user.lastName}
                        </span>
                      </td>

                      <td className="py-4 pr-4 text-slate-600">{user.email}</td>

                      <td className="py-4 pr-4">
                        <span className="inline-block whitespace-nowrap rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                          {user.role?.replaceAll("_", " ")}
                        </span>
                      </td>

                      <td className="py-4 pr-4 text-slate-600">
                        {user.department || "—"}
                      </td>

                      <td className="py-4 pr-4">
                        <span
                          className={`inline-block whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${
                            user.enabled
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {user.enabled ? "Active" : "Disabled"}
                        </span>
                      </td>

                      <td className="py-4">
                        <div className="flex flex-nowrap items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            leftIcon={<Eye size={16} />}
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/admin/users/${user.userId}`);
                            }}
                          >
                            View
                          </Button>

                          {!isSelf && (
                            <Button
                              size="sm"
                              variant={user.enabled ? "danger" : "primary"}
                              leftIcon={
                                user.enabled ? (
                                  <Ban size={16} />
                                ) : (
                                  <CheckCircle2 size={16} />
                                )
                              }
                              loading={actioningUserId === user.userId}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleToggleStatus(user);
                              }}
                            >
                              {user.enabled ? "Disable" : "Enable"}
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </SectionCard>

      <ConfirmDialog
        open={!!pendingToggleUser}
        title={
          pendingToggleUser?.enabled
            ? "Disable this account?"
            : "Enable this account?"
        }
        description={
          pendingToggleUser
            ? pendingToggleUser.enabled
              ? `${pendingToggleUser.firstName} ${pendingToggleUser.lastName} will immediately lose access to their account.`
              : `${pendingToggleUser.firstName} ${pendingToggleUser.lastName} will regain access to their account.`
            : ""
        }
        confirmLabel={pendingToggleUser?.enabled ? "Disable" : "Enable"}
        variant={pendingToggleUser?.enabled ? "danger" : "primary"}
        loading={actioningUserId === pendingToggleUser?.userId}
        onConfirm={confirmToggleStatus}
        onCancel={() => setPendingToggleUser(null)}
      />
    </div>
  );
};

export default Users;
