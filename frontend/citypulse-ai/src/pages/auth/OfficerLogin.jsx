import AuthLayout from "@/layouts/AuthLayout";
import LoginForm from "@/components/forms/LoginForm";

/**
 * Distinct sign-in page for Officers, Department Managers, and Admins.
 * Hits the staff-only /auth/staff/login endpoint, which rejects citizen
 * accounts with a clear "wrong portal" error — and has no "Create
 * Account" link, since staff accounts are provisioned by an
 * administrator, not self-registered.
 */
const OfficerLogin = () => {
  return (
    <AuthLayout portal="staff">
      <LoginForm
        title="Staff sign in"
        subtitle="Sign in with your municipal staff account to manage complaints."
        showRegisterLink={false}
        portal="staff"
      />
    </AuthLayout>
  );
};

export default OfficerLogin;
