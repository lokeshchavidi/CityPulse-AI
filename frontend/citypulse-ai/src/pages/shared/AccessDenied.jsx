import { Link } from "react-router-dom";
import { Home, ShieldAlert } from "lucide-react";

import Button from "@/components/common/Button/Button";
import useAuth from "@/hooks/useAuth";
import { ROLE_DASHBOARD_PATH } from "@/constants/roles";

const AccessDenied = () => {
  const { user } = useAuth();

  const homePath = ROLE_DASHBOARD_PATH[user?.role] ?? "/";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-canvas px-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-red-50 text-red-700">
        <ShieldAlert size={28} aria-hidden="true" />
      </div>

      <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-red-700">
        Error 403
      </p>

      <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
        Access denied
      </h1>

      <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-500 md:text-base">
        Your account role doesn't have permission to view this page.
      </p>

      <Link to={homePath} className="mt-8">
        <Button leftIcon={<Home size={18} aria-hidden="true" />}>
          Back to my dashboard
        </Button>
      </Link>
    </div>
  );
};

export default AccessDenied;
