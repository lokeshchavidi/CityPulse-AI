import PublicLayout from "@/layouts/PublicLayout";
import LoginForm from "@/components/forms/LoginForm";

const Login = () => {
  return (
    <PublicLayout>
      <section className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-slate-50 px-4 py-12">
        <LoginForm />
      </section>
    </PublicLayout>
  );
};

export default Login;
