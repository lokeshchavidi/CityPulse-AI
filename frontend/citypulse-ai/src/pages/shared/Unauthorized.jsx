import { Link } from "react-router-dom";
import { LogIn, ShieldQuestion } from "lucide-react";

import Button from "@/components/common/Button/Button";

const Unauthorized = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-amber-100">
        <ShieldQuestion size={36} className="text-amber-700" />
      </div>

      <h1 className="mt-8 text-6xl font-extrabold text-slate-900">401</h1>

      <h2 className="mt-3 text-2xl font-semibold text-slate-800">
        Sign In Required
      </h2>

      <p className="mt-3 max-w-md text-slate-600">
        Your session has expired or you need to sign in to view this page.
      </p>

      <Link to="/login" className="mt-8">
        <Button leftIcon={<LogIn size={18} />}>Go to Login</Button>
      </Link>
    </div>
  );
};

export default Unauthorized;
