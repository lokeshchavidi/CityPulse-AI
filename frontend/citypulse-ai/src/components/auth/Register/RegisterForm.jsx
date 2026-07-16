import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus, Check, X } from "lucide-react";

import Button from "@/components/common/Button/Button";
import Input from "@/components/forms/Input";
import PasswordInput from "@/components/forms/PasswordInput";
import useAuth from "@/hooks/useAuth";
import {
  getPasswordStrength,
  getPasswordRequirements,
} from "@/utils/passwordUtils";

const initialFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  password: "",
  confirmPassword: "",
};

const PHONE_REGEX = /^[6-9]\d{9}$/;

const requirementLabels = [
  { key: "minLength", label: "At least 8 characters" },
  { key: "uppercase", label: "One uppercase letter" },
  { key: "lowercase", label: "One lowercase letter" },
  { key: "number", label: "One number" },
  { key: "specialCharacter", label: "One special character" },
];

const RegisterForm = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState(initialFormData);
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const strength = getPasswordStrength(formData.password);
  const requirements = getPasswordRequirements(formData.password);

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (fieldErrors[name]) {
      setFieldErrors((previous) => ({ ...previous, [name]: "" }));
    }

    if (error) {
      setError("");
    }
  };

  const validate = () => {
    const errors = {};

    if (!PHONE_REGEX.test(formData.phoneNumber)) {
      errors.phoneNumber = "Enter a valid 10-digit Indian mobile number.";
    }

    if (!Object.values(requirements).every(Boolean)) {
      errors.password = "Password doesn't meet all requirements.";
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    setFieldErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      const { confirmPassword, ...registerRequest } = formData;
      void confirmPassword;

      await register(registerRequest);

      navigate("/login", {
        replace: true,
        state: {
          registrationSuccess: true,
        },
      });
    } catch (err) {
      setError(
        err?.response?.data?.message ??
          "Registration failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-800 text-white">
          <UserPlus size={30} />
        </div>

        <h1 className="text-3xl font-bold text-slate-900">
          Citizen Registration
        </h1>

        <p className="mt-2 text-slate-600">
          Create your account to report and track civic complaints.
        </p>

        <p className="mt-1 text-xs text-slate-400">
          Officer, department manager, and admin accounts are created by
          your municipal administrator — not through self-registration.
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
          error={fieldErrors.phoneNumber}
          required
        />

        <div>
          <PasswordInput
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="new-password"
            error={fieldErrors.password}
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
                    {requirements[key] ? (
                      <Check size={13} />
                    ) : (
                      <X size={13} />
                    )}
                    {label}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <PasswordInput
          label="Confirm Password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          autoComplete="new-password"
          error={fieldErrors.confirmPassword}
          required
        />

        <Button type="submit" className="w-full" loading={loading}>
          Create Account
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-slate-600">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold text-blue-800 hover:underline"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
