import { useEffect, useMemo, useState } from "react";
import { Building2, Plus, Users as UsersIcon, X } from "lucide-react";
import toast from "react-hot-toast";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import SectionCard from "@/components/dashboard/SectionCard";
import LoadingSkeleton from "@/components/dashboard/LoadingSkeleton";
import EmptyState from "@/components/dashboard/EmptyState";
import Button from "@/components/common/Button/Button";
import Input from "@/components/forms/Input";
import Textarea from "@/components/forms/Textarea";

import adminService from "@/services/adminService";
import departmentService from "@/services/departmentService";

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ departmentName: "", description: "" });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);

      const [departmentsResponse, usersResponse] = await Promise.all([
        departmentService.getAllDepartments(),
        adminService.getAllUsers(),
      ]);

      setDepartments(departmentsResponse ?? []);
      setUsers(usersResponse ?? []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Staff counts per department, derived from the Users list so each
  // department card shows how many people currently work there.
  const staffCounts = useMemo(() => {
    const counts = new Map();

    users
      .filter((user) => user.department)
      .forEach((user) => {
        const existing = counts.get(user.department) ?? {
          officers: 0,
          managers: 0,
        };

        if (user.role === "OFFICER") existing.officers += 1;
        if (user.role === "DEPARTMENT_MANAGER") existing.managers += 1;

        counts.set(user.department, existing);
      });

    return counts;
  }, [users]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    if (!form.departmentName.trim() || !form.description.trim()) {
      toast.error("Please fill in both fields.");
      return;
    }

    try {
      setCreating(true);

      await departmentService.createDepartment(
        form.departmentName.trim(),
        form.description.trim(),
      );

      toast.success("Department created successfully.");
      setForm({ departmentName: "", description: "" });
      setShowForm(false);

      await loadData();
    } catch (error) {
      toast.error(
        error?.response?.data?.message ?? "Couldn't create department.",
      );
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="space-y-8">
      <DashboardHeader
        title="Departments"
        subtitle="Municipal departments citizens' complaints are routed to."
        action={
          <Button
            leftIcon={showForm ? <X size={18} /> : <Plus size={18} />}
            variant={showForm ? "outline" : "primary"}
            onClick={() => setShowForm((prev) => !prev)}
          >
            {showForm ? "Cancel" : "Add Department"}
          </Button>
        }
      />

      {showForm && (
        <SectionCard title="New Department">
          <form onSubmit={handleCreate} className="max-w-xl space-y-5">
            <Input
              label="Department Name"
              name="departmentName"
              value={form.departmentName}
              onChange={handleFormChange}
              placeholder="e.g. Street Lighting"
              required
            />

            <Textarea
              label="Description"
              name="description"
              value={form.description}
              onChange={handleFormChange}
              placeholder="What kinds of complaints does this department handle?"
              required
            />

            <Button type="submit" loading={creating} leftIcon={<Plus size={18} />}>
              Create Department
            </Button>
          </form>
        </SectionCard>
      )}

      <SectionCard>
        {loading ? (
          <LoadingSkeleton cards={4} />
        ) : departments.length === 0 ? (
          <EmptyState
            title="No departments found"
            description="Add your first department to start routing complaints."
          />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {departments.map((department) => {
              const counts = staffCounts.get(department.departmentName) ?? {
                officers: 0,
                managers: 0,
              };

              return (
                <div
                  key={department.departmentId}
                  className="rounded-2xl border border-slate-200 p-5"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100">
                    <Building2 size={20} className="text-blue-700" />
                  </div>

                  <h3 className="mt-4 font-semibold text-slate-900">
                    {department.departmentName}
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    {department.description}
                  </p>

                  <div className="mt-3 flex items-center gap-2 text-sm text-slate-600">
                    <UsersIcon size={14} />
                    {counts.managers} manager{counts.managers === 1 ? "" : "s"} ·{" "}
                    {counts.officers} officer{counts.officers === 1 ? "" : "s"}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </SectionCard>
    </div>
  );
};

export default Departments;
