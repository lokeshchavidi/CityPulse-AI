import PublicLayout from "@/layouts/PublicLayout";
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
    <PublicLayout>
      <section className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-slate-50 px-4 py-12">
        <LoginForm
          title="Officer Portal"
          subtitle="Sign in with your staff account to manage assigned complaints."
          showRegisterLink={false}
          portal="staff"
        />
      </section>
    </PublicLayout>
  );
};

export default OfficerLogin;
