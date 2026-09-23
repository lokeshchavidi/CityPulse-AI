import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full"
    >
      <div className="mb-8">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-brand-50 text-brand-800 ring-1 ring-brand-100">
          <UserPlus size={22} aria-hidden="true" />
        </div>

        <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Create your account
        </h2>

        <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
          Register as a citizen to report and track civic complaints.
        </p>
      </div>

      {error && (
        <div
          role="alert"
          className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <fieldset className="space-y-4">
          <legend className="mb-1 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
            Personal details
          </legend>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              autoComplete="given-name"
              required
            />

            <Input
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              autoComplete="family-name"
              required
            />
          </div>

          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
            required
          />

          <Input
            label="Phone Number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="10-digit mobile number"
            error={fieldErrors.phoneNumber}
            autoComplete="tel"
            required
          />
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="mb-1 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
            Security
          </legend>

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

            {/* Always mounted to avoid layout/scroll jump on first keystroke */}
            <div className="mt-3 space-y-3 rounded-lg border border-slate-200 bg-canvas p-3">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${strength.color}`}
                  style={{
                    width: formData.password ? `${strength.percentage}%` : "0%",
                  }}
                />
              </div>

              <p className="text-xs font-semibold text-slate-500">
                Strength: {formData.password ? strength.label : "Enter a password"}
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
                      <Check size={13} aria-hidden="true" />
                    ) : (
                      <X size={13} aria-hidden="true" />
                    )}
                    {label}
                  </li>
                ))}
              </ul>
            </div>
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
        </fieldset>

        <p className="rounded-lg border border-slate-200 bg-canvas px-3 py-2.5 text-xs leading-relaxed text-slate-500">
          Officer, department manager, and admin accounts are created by your
          municipal administrator — not through self-registration.
        </p>

        <Button type="submit" className="w-full" loading={loading}>
          Create Account
        </Button>
      </form>

      <p className="mt-8 border-t border-slate-200 pt-6 text-center text-sm text-slate-600">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold text-brand-800 hover:underline"
        >
          Sign In
        </Link>
      </p>
    </motion.div>
  );
};

export default RegisterForm;
