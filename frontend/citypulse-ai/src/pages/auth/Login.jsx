import AuthLayout from "@/layouts/AuthLayout";
import LoginForm from "@/components/forms/LoginForm";

const Login = () => {
  return (
    <AuthLayout portal="citizen">
      <LoginForm
        title="Citizen sign in"
        subtitle="Access your account to report and track civic complaints."
        showRegisterLink
        portal="citizen"
      />
    </AuthLayout>
  );
};

export default Login;
