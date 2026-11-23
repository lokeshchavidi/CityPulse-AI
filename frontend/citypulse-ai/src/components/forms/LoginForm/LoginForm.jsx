import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogIn } from "lucide-react";
import toast from "react-hot-toast";

import Button from "@/components/common/Button/Button";
import Input from "@/components/forms/Input";
import PasswordInput from "@/components/forms/PasswordInput";
import useAuth from "@/hooks/useAuth";
import { ROLE_DASHBOARD_PATH } from "@/constants/roles";

const initialFormData = {
  email: "",
  password: "",
};

/**
 * Shared login form used by both the citizen-facing /login page and the
 * officer-facing /officer/login page. The two only differ in copy and
 * whether the "Create Account" link is shown — officers, department
 * managers, and admins cannot self-register.
 */
const LoginForm = ({
  title = "Welcome back",
  subtitle = "Sign in to report and track civic complaints.",
  showRegisterLink = true,
  portal = "citizen",
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loginAsStaff } = useAuth();

  const authenticate = portal === "staff" ? loginAsStaff : login;

  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const registrationSuccess = Boolean(location.state?.registrationSuccess);

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  const resolveErrorMessage = (err) => {
    if (err?.code === "ECONNABORTED") {
      return "Server is waking up (this can take 1–3 minutes on free hosting). Open the backend health link, wait until it shows UP, then try login again.";
    }

    if (!err?.response) {
      return "Unable to reach the server. Please check your connection and try again.";
    }

    const { status, data } = err.response;

    if (status === 401 || status === 400 || status === 403 || status === 404) {
      return data?.message || "Invalid credentials. Please try again.";
    }

    return data?.message || "Something went wrong. Please try again.";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    try {
      setLoading(true);

      const user = await authenticate(formData);

      if (!user?.role) {
        setError("Something went wrong signing you in. Please try again.");
        return;
      }

      const redirectTo =
        location.state?.from?.pathname ??
        ROLE_DASHBOARD_PATH[user.role] ??
        "/citizen/dashboard";

      toast.success(`Welcome back, ${user.firstName}!`);

      navigate(redirectTo, { replace: true });
    } catch (err) {
      console.error("Login failed:", err);
      setError(resolveErrorMessage(err));
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
          <LogIn size={22} aria-hidden="true" />
        </div>

        <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          {title}
        </h2>

        <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
          {subtitle}
        </p>
      </div>

      {registrationSuccess && (
        <div
          role="status"
          className="mb-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-800"
        >
          Account created successfully. Please sign in.
        </div>
      )}

      {error && (
        <div
          role="alert"
          className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={handleChange}
          autoComplete="email"
          required
        />

        <PasswordInput
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          autoComplete="current-password"
          required
        />

        <Button type="submit" className="w-full" loading={loading}>
          Sign In
        </Button>
      </form>

      <div className="mt-8 space-y-3 border-t border-slate-200 pt-6 text-center text-sm text-slate-600">
        {showRegisterLink && (
          <p>
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-brand-800 hover:underline"
            >
              Create Account
            </Link>
          </p>
        )}

        {portal === "citizen" ? (
          <p>
            Municipal staff?{" "}
            <Link
              to="/officer/login"
              className="font-semibold text-brand-800 hover:underline"
            >
              Open Staff Portal
            </Link>
          </p>
        ) : (
          <p>
            Citizen access?{" "}
            <Link
              to="/login"
              className="font-semibold text-brand-800 hover:underline"
            >
              Citizen Login
            </Link>
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default LoginForm;
