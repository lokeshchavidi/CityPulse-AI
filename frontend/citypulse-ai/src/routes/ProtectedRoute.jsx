import { Navigate, useLocation } from "react-router-dom";

import useAuth from "@/hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Wait until authentication initialization completes
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-700 border-t-transparent" />
          <p className="text-sm text-slate-600">Authenticating...</p>
        </div>
      </div>
    );
  }

  // User is not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // User is authenticated
  return children;
};

export default ProtectedRoute;
