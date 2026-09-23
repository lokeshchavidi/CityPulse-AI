import { Routes, Route } from "react-router-dom";

import LandingPage from "@/pages/landing/LandingPage";
import LoginPage from "@/pages/auth/Login";
import OfficerLoginPage from "@/pages/auth/OfficerLogin";
import RegisterPage from "@/pages/auth/Register";

import CitizenDashboardPage from "@/pages/citizen/Dashboard";
import CreateComplaintPage from "@/pages/citizen/CreateComplaint";
import MyComplaintsPage from "@/pages/citizen/MyComplaints";
import CitizenComplaintDetailsPage from "@/pages/citizen/ComplaintDetails";
import CitizenStatisticsPage from "@/pages/citizen/Statistics";

import OfficerDashboardPage from "@/pages/officer/Dashboard";
import AssignedComplaintsPage from "@/pages/officer/AssignedComplaints";
import OfficerComplaintDetailsPage from "@/pages/officer/ComplaintDetails";
import OfficerStatisticsPage from "@/pages/officer/Statistics";

import DepartmentManagerDashboardPage from "@/pages/department-manager/Dashboard";
import ComplaintQueuePage from "@/pages/department-manager/PendingComplaints";
import ReviewComplaintPage from "@/pages/department-manager/ReviewComplaint";
import OfficersPage from "@/pages/department-manager/Officers";
import DepartmentManagerStatisticsPage from "@/pages/department-manager/Statistics";

import AdminDashboardPage from "@/pages/admin/Dashboard";
import UsersPage from "@/pages/admin/Users";
import CreateStaffUserPage from "@/pages/admin/CreateStaffUser";
import UserDetailsPage from "@/pages/admin/UserDetails";
import DepartmentsPage from "@/pages/admin/Departments";
import AdminAllComplaintsPage from "@/pages/admin/AllComplaints";
import AdminComplaintDetailsPage from "@/pages/admin/ComplaintDetails";
import AdminStatisticsPage from "@/pages/admin/Statistics";

import ProfilePage from "@/pages/shared/Profile";
import NotificationsPage from "@/pages/shared/Notifications";
import NotFoundPage from "@/pages/shared/NotFound";
import ServerErrorPage from "@/pages/shared/ServerError";
import UnauthorizedPage from "@/pages/shared/Unauthorized";
import AccessDeniedPage from "@/pages/shared/AccessDenied";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import RoleRoute from "./RoleRoute";

import DashboardLayout from "@/layouts/DashboardLayout";
import { ROLES } from "@/constants/roles";

import ActiveComplaintsPage from "@/pages/department-manager/ActiveComplaints";
import ResolvedComplaintsPage from "@/pages/department-manager/ResolvedComplaints";

const AppRoutes = () => {
  return (
    <Routes>
      {/* -------------------- Public -------------------- */}
      <Route
        path="/"
        element={
          <PublicRoute>
            <LandingPage />
          </PublicRoute>
        }
      />

      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />

      <Route
        path="/officer/login"
        element={
          <PublicRoute>
            <OfficerLoginPage />
          </PublicRoute>
        }
      />

      <Route
        path="/register"
        element={
          <PublicRoute>
            <RegisterPage />
          </PublicRoute>
        }
      />

      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      <Route path="/server-error" element={<ServerErrorPage />} />

      {/* -------------------- Authenticated shell -------------------- */}
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        {/* Shared across every role */}
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/access-denied" element={<AccessDeniedPage />} />

        {/* Citizen */}
        <Route
          path="/citizen/dashboard"
          element={
            <RoleRoute allowedRoles={[ROLES.CITIZEN]}>
              <CitizenDashboardPage />
            </RoleRoute>
          }
        />

        <Route
          path="/citizen/complaints/new"
          element={
            <RoleRoute allowedRoles={[ROLES.CITIZEN]}>
              <CreateComplaintPage />
            </RoleRoute>
          }
        />

        <Route
          path="/citizen/complaints"
          element={
            <RoleRoute allowedRoles={[ROLES.CITIZEN]}>
              <MyComplaintsPage />
            </RoleRoute>
          }
        />

        <Route
          path="/citizen/complaints/:id"
          element={
            <RoleRoute allowedRoles={[ROLES.CITIZEN]}>
              <CitizenComplaintDetailsPage />
            </RoleRoute>
          }
        />

        <Route
          path="/citizen/statistics"
          element={
            <RoleRoute allowedRoles={[ROLES.CITIZEN]}>
              <CitizenStatisticsPage />
            </RoleRoute>
          }
        />

        {/* Officer */}
        <Route
          path="/officer/dashboard"
          element={
            <RoleRoute allowedRoles={[ROLES.OFFICER]}>
              <OfficerDashboardPage />
            </RoleRoute>
          }
        />

        <Route
          path="/officer/complaints"
          element={
            <RoleRoute allowedRoles={[ROLES.OFFICER]}>
              <AssignedComplaintsPage />
            </RoleRoute>
          }
        />

        <Route
          path="/officer/complaints/:id"
          element={
            <RoleRoute allowedRoles={[ROLES.OFFICER]}>
              <OfficerComplaintDetailsPage />
            </RoleRoute>
          }
        />

        <Route
          path="/officer/statistics"
          element={
            <RoleRoute allowedRoles={[ROLES.OFFICER]}>
              <OfficerStatisticsPage />
            </RoleRoute>
          }
        />

        {/* Department Manager */}
        <Route
          path="/department-manager/dashboard"
          element={
            <RoleRoute allowedRoles={[ROLES.DEPARTMENT_MANAGER]}>
              <DepartmentManagerDashboardPage />
            </RoleRoute>
          }
        />

        <Route
          path="/department-manager/complaints"
          element={
            <RoleRoute allowedRoles={[ROLES.DEPARTMENT_MANAGER]}>
              <ComplaintQueuePage />
            </RoleRoute>
          }
        />

        <Route
          path="/department-manager/complaints/active"
          element={
            <RoleRoute allowedRoles={[ROLES.DEPARTMENT_MANAGER]}>
              <ActiveComplaintsPage />
            </RoleRoute>
          }
        />

        <Route
          path="/department-manager/complaints/resolved"
          element={
            <RoleRoute allowedRoles={[ROLES.DEPARTMENT_MANAGER]}>
              <ResolvedComplaintsPage />
            </RoleRoute>
          }
        />

        <Route
          path="/department-manager/complaints/:id"
          element={
            <RoleRoute allowedRoles={[ROLES.DEPARTMENT_MANAGER]}>
              <ReviewComplaintPage />
            </RoleRoute>
          }
        />

        <Route
          path="/department-manager/officers"
          element={
            <RoleRoute allowedRoles={[ROLES.DEPARTMENT_MANAGER]}>
              <OfficersPage />
            </RoleRoute>
          }
        />

        <Route
          path="/department-manager/statistics"
          element={
            <RoleRoute allowedRoles={[ROLES.DEPARTMENT_MANAGER]}>
              <DepartmentManagerStatisticsPage />
            </RoleRoute>
          }
        />

        {/* Admin */}
        <Route
          path="/admin/dashboard"
          element={
            <RoleRoute allowedRoles={[ROLES.ADMIN]}>
              <AdminDashboardPage />
            </RoleRoute>
          }
        />

        <Route
          path="/admin/complaints"
          element={
            <RoleRoute allowedRoles={[ROLES.ADMIN]}>
              <AdminAllComplaintsPage />
            </RoleRoute>
          }
        />

        <Route
          path="/admin/complaints/:id"
          element={
            <RoleRoute allowedRoles={[ROLES.ADMIN]}>
              <AdminComplaintDetailsPage />
            </RoleRoute>
          }
        />

        <Route
          path="/admin/statistics"
          element={
            <RoleRoute allowedRoles={[ROLES.ADMIN]}>
              <AdminStatisticsPage />
            </RoleRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <RoleRoute allowedRoles={[ROLES.ADMIN]}>
              <UsersPage />
            </RoleRoute>
          }
        />

        <Route
          path="/admin/users/new"
          element={
            <RoleRoute allowedRoles={[ROLES.ADMIN]}>
              <CreateStaffUserPage />
            </RoleRoute>
          }
        />

        <Route
          path="/admin/users/:id"
          element={
            <RoleRoute allowedRoles={[ROLES.ADMIN]}>
              <UserDetailsPage />
            </RoleRoute>
          }
        />

        <Route
          path="/admin/departments"
          element={
            <RoleRoute allowedRoles={[ROLES.ADMIN]}>
              <DepartmentsPage />
            </RoleRoute>
          }
        />
      </Route>

      {/* -------------------- 404 -------------------- */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
