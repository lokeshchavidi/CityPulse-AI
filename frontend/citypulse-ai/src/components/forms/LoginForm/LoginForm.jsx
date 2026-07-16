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
  title = "Welcome Back",
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
    // No response at all means the request never reached the server
    // (backend down, wrong VITE_API_BASE_URL, CORS, offline, etc).
    if (!err?.response) {
      return "Unable to reach the server. Please check your connection and try again.";
    }

    const { status, data } = err.response;

    // 401/400: wrong password or unknown email — both now show the same
    // generic "Invalid credentials" message (no distinction, so an
    // attacker can't tell which emails are registered). 403: disabled
    // account or wrong portal, which still gets its own specific message.
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl"
    >
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-800 text-white">
          <LogIn size={28} />
        </div>

        <h1 className="text-3xl font-bold text-slate-900">{title}</h1>

        <p className="mt-2 text-slate-600">{subtitle}</p>
      </div>

      {registrationSuccess && (
        <div className="mb-6 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
          Account created successfully. Please sign in.
        </div>
      )}

      {error && (
        <div
          role="alert"
          className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700"
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

      {showRegisterLink && (
        <p className="mt-8 text-center text-sm text-slate-600">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-blue-800 hover:underline"
          >
            Create Account
          </Link>
        </p>
      )}
    </motion.div>
  );
};

export default LoginForm;
