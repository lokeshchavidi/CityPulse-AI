import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import useAuth from "@/hooks/useAuth";
import { ROLE_DASHBOARD_PATH } from "@/constants/roles";

const PUBLIC_PATHS = new Set(["/", "/login", "/register", "/officer/login"]);

/**
 * Keeps authenticated users inside the app when the browser Back button
 * would otherwise land on a public page (or leave an empty history entry).
 */
const useAuthBackGuard = () => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      return undefined;
    }

    const dashboardPath =
      ROLE_DASHBOARD_PATH[user?.role] ?? "/citizen/dashboard";

    const onPopState = () => {
      const path = window.location.pathname;

      if (PUBLIC_PATHS.has(path)) {
        navigate(dashboardPath, { replace: true });
      }
    };

    window.addEventListener("popstate", onPopState);

    return () => {
      window.removeEventListener("popstate", onPopState);
    };
  }, [isAuthenticated, user?.role, navigate, location.pathname]);
};

export default useAuthBackGuard;
