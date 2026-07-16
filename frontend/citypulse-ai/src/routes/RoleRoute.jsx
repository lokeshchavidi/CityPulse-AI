import { Navigate } from "react-router-dom";

import useAuth from "@/hooks/useAuth";

/**
 * Wraps routes that require one of a specific set of roles. Must be used
 * inside a ProtectedRoute (or after auth has already been confirmed), since
 * it assumes `user` is populated.
 *
 * Usage: <RoleRoute allowedRoles={["ADMIN"]}><AdminDashboard /></RoleRoute>
 */
const RoleRoute = ({ allowedRoles = [], children }) => {
  const { user } = useAuth();

  const isAllowed = !allowedRoles.length || allowedRoles.includes(user?.role);

  if (!isAllowed) {
    return <Navigate to="/access-denied" replace />;
  }

  return children;
};

export default RoleRoute;
