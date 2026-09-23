import { Link } from "react-router-dom";
import { LogIn, ShieldQuestion } from "lucide-react";

import Button from "@/components/common/Button/Button";

const Unauthorized = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-canvas px-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
        <ShieldQuestion size={28} aria-hidden="true" />
      </div>

      <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-amber-700">
        Error 401
      </p>

      <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
        Sign in required
      </h1>

      <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-500 md:text-base">
        Your session has expired or you need to sign in to view this page.
      </p>

      <Link to="/login" className="mt-8">
        <Button leftIcon={<LogIn size={18} aria-hidden="true" />}>
          Go to login
        </Button>
      </Link>
    </div>
  );
};

export default Unauthorized;
