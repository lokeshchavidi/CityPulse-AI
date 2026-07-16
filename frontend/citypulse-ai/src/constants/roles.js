export const ROLES = {
  CITIZEN: "CITIZEN",
  OFFICER: "OFFICER",
  DEPARTMENT_MANAGER: "DEPARTMENT_MANAGER",
  ADMIN: "ADMIN",
};

/**
 * Maps a user's role to their default post-login dashboard route.
 */
export const ROLE_DASHBOARD_PATH = {
  [ROLES.CITIZEN]: "/citizen/dashboard",
  [ROLES.OFFICER]: "/officer/dashboard",
  [ROLES.DEPARTMENT_MANAGER]: "/department-manager/dashboard",
  [ROLES.ADMIN]: "/admin/dashboard",
};

export default ROLES;
