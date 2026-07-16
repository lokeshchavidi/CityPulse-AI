import { Link } from "react-router-dom";
import { ShieldAlert, Home } from "lucide-react";

import Button from "@/components/common/Button/Button";
import useAuth from "@/hooks/useAuth";
import { ROLE_DASHBOARD_PATH } from "@/constants/roles";

const AccessDenied = () => {
  const { user } = useAuth();

  const homePath = ROLE_DASHBOARD_PATH[user?.role] ?? "/";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
        <ShieldAlert size={36} className="text-red-700" />
      </div>

      <h1 className="mt-8 text-6xl font-extrabold text-slate-900">403</h1>

      <h2 className="mt-3 text-2xl font-semibold text-slate-800">
        Access Denied
      </h2>

      <p className="mt-3 max-w-md text-slate-600">
        Your account role doesn't have permission to view this page.
      </p>

      <Link to={homePath} className="mt-8">
        <Button leftIcon={<Home size={18} />}>Back to My Dashboard</Button>
      </Link>
    </div>
  );
};

export default AccessDenied;
