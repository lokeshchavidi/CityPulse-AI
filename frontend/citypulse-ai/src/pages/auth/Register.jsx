import AuthLayout from "@/layouts/AuthLayout";
import RegisterForm from "@/components/auth/Register";

const Register = () => {
  return (
    <AuthLayout portal="register">
      <RegisterForm />
    </AuthLayout>
  );
};

export default Register;
