import PublicLayout from "@/layouts/PublicLayout";
import RegisterForm from "@/components/auth/Register";

const Register = () => {
  return (
    <PublicLayout>
      <section className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-slate-50 px-4 py-12">
        <RegisterForm />
      </section>
    </PublicLayout>
  );
};

export default Register;
