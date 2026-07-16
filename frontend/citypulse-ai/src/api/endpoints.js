// This file is the central place for all backend endpoints.
// If an endpoint changes in the backend, we update one file instead of
// searching the entire project. Paths mirror the Spring Boot controllers
// exactly (base path is prefixed automatically by axiosClient's baseURL,
// which already includes /api/v1).

const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    STAFF_LOGIN: "/auth/staff/login",
  },

  USER: {
    REGISTER: "/users/register",
    DASHBOARD: "/users/dashboard",
    PROFILE: "/users/profile",
    CHANGE_PASSWORD: "/users/change-password",
  },

  COMPLAINT: {
    CREATE: "/complaints",
    MY_COMPLAINTS: "/complaints/my",
    ALL: "/complaints",
    DETAILS: (complaintId) => `/complaints/${complaintId}`,
    HISTORY: (complaintId) => `/complaints/${complaintId}/history`,
    ASSIGN_DEPARTMENT: (complaintId) => `/complaints/${complaintId}/department`,
    ASSIGN_OFFICER: (complaintId) => `/complaints/${complaintId}/officer`,
    UPDATE_STATUS: (complaintId) => `/complaints/${complaintId}/status`,
    UPDATE_PRIORITY: (complaintId) => `/complaints/${complaintId}/priority`,
  },

  AI: {
    ANALYZE: (complaintId) => `/ai/complaints/${complaintId}/analyze`,
    DETAILS: (complaintId) => `/ai/complaints/${complaintId}`,
  },

  NOTIFICATION: {
    ALL: "/notifications",
    UNREAD: "/notifications/unread",
    UNREAD_COUNT: "/notifications/unread/count",
    MARK_READ: (notificationId) => `/notifications/${notificationId}/read`,
    MARK_ALL_READ: "/notifications/read-all",
  },

  OFFICER: {
    COMPLAINTS: "/officer/complaints",
    COMPLAINT_DETAILS: (complaintId) => `/officer/complaints/${complaintId}`,
    START_WORK: (complaintId) => `/officer/complaints/${complaintId}/start`,
    RESOLVE: (complaintId) => `/officer/complaints/${complaintId}/resolve`,
    DASHBOARD: "/officer/dashboard",
  },

  DEPARTMENT_MANAGER: {
    ACTIVE_COMPLAINTS: "/department-manager/complaints/active",

    RESOLVED_COMPLAINTS: "/department-manager/complaints/resolved",
    COMPLAINT_QUEUE: "/department-manager/complaints",
    COMPLAINT_DETAILS: (complaintId) =>
      `/department-manager/complaints/${complaintId}`,
    ACCEPT_AI: (complaintId) =>
      `/department-manager/complaints/${complaintId}/accept-ai`,
    OFFICERS: "/department-manager/officers",
    ASSIGN_OFFICER: (complaintId) =>
      `/department-manager/complaints/${complaintId}/assign-officer`,
    DASHBOARD: "/department-manager/dashboard",
    // NOTE: matches backend exactly — this one endpoint intentionally does
    // NOT have a "/complaints" segment, unlike its siblings above.
    OVERRIDE_AI: (complaintId) => `/department-manager/${complaintId}/override`,
  },

  ADMIN: {
    DASHBOARD: "/admin/dashboard",
    USERS: "/admin/users",
    CREATE_STAFF_USER: "/admin/users",
    USER_DETAILS: (userId) => `/admin/users/${userId}`,
    UPDATE_USER_DEPARTMENT: (userId) => `/admin/users/${userId}/department`,
    ENABLE_USER: (userId) => `/admin/users/${userId}/enable`,
    DISABLE_USER: (userId) => `/admin/users/${userId}/disable`,
  },

  DEPARTMENT: {
    ALL: "/departments",
    CREATE: "/departments",
  },
};

export default API_ENDPOINTS;
