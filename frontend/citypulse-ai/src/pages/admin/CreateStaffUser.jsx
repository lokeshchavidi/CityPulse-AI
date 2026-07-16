import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserPlus, Check, X } from "lucide-react";
import toast from "react-hot-toast";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import SectionCard from "@/components/dashboard/SectionCard";
import Input from "@/components/forms/Input";
import PasswordInput from "@/components/forms/PasswordInput";
import Select from "@/components/forms/Select";
import Button from "@/components/common/Button/Button";

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

const requirementLabels = [
  { key: "minLength", label: "At least 8 characters" },
  { key: "uppercase", label: "One uppercase letter" },
  { key: "lowercase", label: "One lowercase letter" },
  { key: "number", label: "One number" },
  { key: "specialCharacter", label: "One special character" },
];

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
    formData.role === ROLES.OFFICER || formData.role === ROLES.DEPARTMENT_MANAGER;

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
      validationErrors.phoneNumber = "Enter a valid 10-digit Indian mobile number.";
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
    <div className="space-y-8">
      <DashboardHeader
        title="Add Staff Account"
        subtitle="Create an Officer, Department Manager, or Admin account. Citizens cannot be created here — they self-register."
      />

      <SectionCard>
        <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <Input
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />

            <Input
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <Input
            label="Phone Number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="10-digit mobile number"
            error={errors.phoneNumber}
            required
          />

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

          <div>
            <PasswordInput
              label="Temporary Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
              error={errors.password}
              required
            />

            {formData.password && (
              <div className="mt-3 space-y-3">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${strength.color}`}
                    style={{ width: `${strength.percentage}%` }}
                  />
                </div>

                <p className="text-xs font-semibold text-slate-500">
                  Strength: {strength.label}
                </p>

                <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                  {requirementLabels.map(({ key, label }) => (
                    <li
                      key={key}
                      className={`flex items-center gap-1.5 text-xs ${
                        requirements[key] ? "text-green-700" : "text-slate-400"
                      }`}
                    >
                      {requirements[key] ? <Check size={13} /> : <X size={13} />}
                      {label}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/admin/users")}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              loading={submitting}
              leftIcon={<UserPlus size={18} />}
            >
              Create Account
            </Button>
          </div>
        </form>
      </SectionCard>
    </div>
  );
};

export default CreateStaffUser;
