import {
  LayoutDashboard,
  PlusCircle,
  ClipboardList,
  Bell,
  User,
  Users,
  Building2,
  ClipboardCheck,
  CheckCircle2,
  BarChart3,
} from "lucide-react";

/* -------------------- Citizen -------------------- */

export const citizenMenu = [
  { label: "Dashboard", path: "/citizen/dashboard", icon: LayoutDashboard },
  {
    label: "Create Complaint",
    path: "/citizen/complaints/new",
    icon: PlusCircle,
  },
  { label: "My Complaints", path: "/citizen/complaints", icon: ClipboardList },
  { label: "Statistics", path: "/citizen/statistics", icon: BarChart3 },
  { label: "Notifications", path: "/notifications", icon: Bell },
  { label: "Profile", path: "/profile", icon: User },
];

/* -------------------- Officer -------------------- */

export const officerMenu = [
  { label: "Dashboard", path: "/officer/dashboard", icon: LayoutDashboard },
  {
    label: "Assigned Complaints",
    path: "/officer/complaints",
    icon: ClipboardList,
  },
  { label: "Statistics", path: "/officer/statistics", icon: BarChart3 },
  { label: "Notifications", path: "/notifications", icon: Bell },
  { label: "Profile", path: "/profile", icon: User },
];

/* -------------------- Department Manager -------------------- */

export const departmentManagerMenu = [
  {
    label: "Dashboard",
    path: "/department-manager/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Complaint Queue",
    path: "/department-manager/complaints",
    icon: ClipboardList,
  },
  {
    label: "Active Complaints",
    path: "/department-manager/complaints/active",
    icon: ClipboardCheck,
  },
  {
    label: "Resolved Complaints",
    path: "/department-manager/complaints/resolved",
    icon: CheckCircle2,
  },
  {
    label: "Statistics",
    path: "/department-manager/statistics",
    icon: BarChart3,
  },
  {
    label: "Officers",
    path: "/department-manager/officers",
    icon: Users,
  },
  {
    label: "Notifications",
    path: "/notifications",
    icon: Bell,
  },
  {
    label: "Profile",
    path: "/profile",
    icon: User,
  },
];

/* -------------------- Admin -------------------- */

export const adminMenu = [
  { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
  { label: "All Complaints", path: "/admin/complaints", icon: ClipboardList },
  { label: "Statistics", path: "/admin/statistics", icon: BarChart3 },
  { label: "Users", path: "/admin/users", icon: Users },
  { label: "Departments", path: "/admin/departments", icon: Building2 },
  { label: "Notifications", path: "/notifications", icon: Bell },
  { label: "Profile", path: "/profile", icon: User },
];
