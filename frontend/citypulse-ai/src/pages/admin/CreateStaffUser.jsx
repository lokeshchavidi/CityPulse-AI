import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Shield, UserPlus } from "lucide-react";
import toast from "react-hot-toast";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import SectionCard from "@/components/dashboard/SectionCard";
import Input from "@/components/forms/Input";
import PasswordInput from "@/components/forms/PasswordInput";
import Select from "@/components/forms/Select";
import Button from "@/components/common/Button/Button";
import PasswordChecklist from "@/components/common/Password/PasswordChecklist";
import PasswordStrength from "@/components/common/Password/PasswordStrength";

import adminService from "@/services/adminService";
import departmentService from "@/services/departmentService";
import { ROLES } from "@/constants/roles";
import {
  getPasswordStrength,
  getPasswordRequirements,
} from "@/utils/passwordUtils";

const STAFF_ROLE_OPTIONS = [
  { value: ROLES.OFFICER, label: "Officer" },
  { value: ROLES.DEPARTMENT_MANAGER, label: "Department Manager" },
  { value: ROLES.ADMIN, label: "Admin" },
];

const PHONE_REGEX = /^[6-9]\d{9}$/;

const initialFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  password: "",
  role: "",
  departmentId: "",
};

const CreateStaffUser = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialFormData);
  const [departments, setDepartments] = useState([]);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const requiresDepartment =
    formData.role === ROLES.OFFICER ||
    formData.role === ROLES.DEPARTMENT_MANAGER;

  const strength = getPasswordStrength(formData.password);
  const requirements = getPasswordRequirements(formData.password);

  useEffect(() => {
    loadDepartments();
  }, []);

  const loadDepartments = async () => {
    try {
      const response = await departmentService.getAllDepartments();
      setDepartments(response ?? []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const validationErrors = {};

    if (!PHONE_REGEX.test(formData.phoneNumber)) {
      validationErrors.phoneNumber =
        "Enter a valid 10-digit Indian mobile number.";
    }

    if (!formData.role) {
      validationErrors.role = "Please select a role.";
    }

    if (requiresDepartment && !formData.departmentId) {
      validationErrors.departmentId = "Department is required for this role.";
    }

    if (!Object.values(requirements).every(Boolean)) {
      validationErrors.password = "Password doesn't meet all requirements.";
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Please fix the highlighted fields.");
      return;
    }

    try {
      setSubmitting(true);

      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
        role: formData.role,
        departmentId: requiresDepartment ? Number(formData.departmentId) : null,
      };

      await adminService.createStaffUser(payload);

      toast.success("Staff account created successfully.");
      navigate("/admin/users");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ?? "Failed to create staff account.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const departmentOptions = departments.map((department) => ({
    value: department.departmentId,
    label: department.departmentName,
  }));

  return (
    <div className="mx-auto max-w-2xl space-y-6 md:space-y-8">
      <div className="space-y-4">
        <Link
          to="/admin/users"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 transition hover:text-brand-800"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Back to users
        </Link>

        <DashboardHeader
          title="Add staff account"
          subtitle="Create an Officer, Department Manager, or Admin. Citizens self-register and cannot be created here."
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <SectionCard
          title="Personal details"
          subtitle="Basic identity information for the new staff member."
        >
          <div className="space-y-5">
            <Input
              label="First name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />

            <Input
              label="Last name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />

            <Input
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <Input
              label="Phone number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="10-digit mobile number"
              error={errors.phoneNumber}
              required
            />
          </div>
        </SectionCard>

        <SectionCard
          title="Role & access"
          subtitle="Assign the portal they can use and department when required."
        >
          <div className="space-y-5">
            <Select
              label="Role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              options={STAFF_ROLE_OPTIONS}
              placeholder="Select a role"
              error={errors.role}
              required
            />

            {requiresDepartment && (
              <Select
                label="Department"
                name="departmentId"
                value={formData.departmentId}
                onChange={handleChange}
                options={departmentOptions}
                placeholder="Select a department"
                error={errors.departmentId}
                required
              />
            )}

            {!requiresDepartment && formData.role === ROLES.ADMIN && (
              <div className="flex items-start gap-3 rounded-lg border border-brand-100 bg-brand-50/60 px-4 py-3 text-sm text-brand-900">
                <Shield size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
                Admin accounts have platform-wide access and are not tied to a
                single department.
              </div>
            )}
          </div>
        </SectionCard>

        <SectionCard
          title="Temporary password"
          subtitle="They can change this later from their profile."
        >
          <div className="space-y-5">
            <PasswordInput
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
              error={errors.password}
              required
            />

            {formData.password ? (
              <div className="space-y-3">
                <PasswordStrength strength={strength} />
                <PasswordChecklist requirements={requirements} />
              </div>
            ) : (
              <p className="text-xs leading-relaxed text-slate-500">
                Use at least 8 characters with upper/lowercase, a number, and a
                special character.
              </p>
            )}
          </div>
        </SectionCard>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/admin/users")}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            loading={submitting}
            leftIcon={<UserPlus size={18} aria-hidden="true" />}
            className="w-full sm:w-auto"
          >
            Create account
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateStaffUser;
