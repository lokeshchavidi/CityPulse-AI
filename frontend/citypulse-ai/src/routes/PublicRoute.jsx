import { Navigate } from "react-router-dom";

import useAuth from "@/hooks/useAuth";
import { ROLE_DASHBOARD_PATH } from "@/constants/roles";

/**
 * Wraps routes that should only be visible to signed-out visitors (Login,
 * Register, the landing page). Already-authenticated users are bounced
 * straight to their role's dashboard instead of seeing the public page
 * again.
 */
const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-700 border-t-transparent" />
      </div>
    );
  }

  if (isAuthenticated) {
    const redirectTo = ROLE_DASHBOARD_PATH[user?.role] ?? "/citizen/dashboard";

    return <Navigate to={redirectTo} replace />;
  }

  return children;
};

export default PublicRoute;
