import {
  Menu,
  PanelLeft,
  PanelLeftClose,
  Bell,
  ChevronDown,
  User as UserIcon,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ThemeToggle from "@/components/common/ThemeToggle";
import useAuth from "@/hooks/useAuth";
import useNotifications from "@/hooks/useNotifications";
import { ROLES } from "@/constants/roles";

const ROLE_LABEL = {
  [ROLES.CITIZEN]: "Citizen",
  [ROLES.OFFICER]: "Officer",
  [ROLES.DEPARTMENT_MANAGER]: "Department Manager",
  [ROLES.ADMIN]: "Administrator",
};

const getInitials = (firstName = "", lastName = "") =>
  `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || "U";

const Topbar = ({ onMenuClick, collapsed, toggleSidebar }) => {
  const navigate = useNavigate();

  const { user, logout } = useAuth();
  const { unreadCount } = useNotifications() ?? {};

  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-surface/95 backdrop-blur">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 lg:hidden"
            aria-label="Open menu"
          >
            <Menu size={22} aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={toggleSidebar}
            className="hidden rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 lg:flex"
            title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <PanelLeft size={20} aria-hidden="true" />
            ) : (
              <PanelLeftClose size={20} aria-hidden="true" />
            )}
          </button>

          <div className="hidden sm:block">
            <h2 className="text-lg font-semibold tracking-tight text-slate-900">
              {ROLE_LABEL[user?.role] ?? "Dashboard"}
            </h2>
            <p className="text-sm text-slate-500">
              Welcome back, {user?.firstName}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />

          <button
            type="button"
            onClick={() => navigate("/notifications")}
            className="relative rounded-lg p-2.5 text-slate-600 transition hover:bg-brand-50 hover:text-brand-800"
            aria-label="Notifications"
          >
            <Bell size={20} aria-hidden="true" />

            {unreadCount > 0 && (
              <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-md bg-red-600 px-1 text-[10px] font-bold text-white">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>

          <div className="relative">
            <button
              type="button"
              onClick={() => setProfileOpen((prev) => !prev)}
              className="flex items-center gap-3 rounded-lg px-2 py-1.5 transition hover:bg-slate-100"
              aria-expanded={profileOpen}
              aria-haspopup="menu"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-700 text-sm font-semibold text-white">
                {getInitials(user?.firstName, user?.lastName)}
              </div>

              <div className="hidden text-left lg:block">
                <p className="text-sm font-semibold text-slate-900">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="max-w-[180px] truncate text-xs text-slate-500">
                  {user?.email}
                </p>
              </div>

              <ChevronDown
                size={16}
                className="hidden text-slate-500 lg:block"
                aria-hidden="true"
              />
            </button>

            {profileOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setProfileOpen(false)}
                />

                <div
                  role="menu"
                  className="absolute right-0 z-20 mt-2 w-56 overflow-hidden rounded-xl border border-slate-200 bg-surface shadow-soft-md"
                >
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setProfileOpen(false);
                      navigate("/profile");
                    }}
                    className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-canvas"
                  >
                    <UserIcon size={18} aria-hidden="true" />
                    Profile
                  </button>

                  <div className="border-t border-slate-100" />

                  <button
                    type="button"
                    role="menuitem"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50"
                  >
                    <LogOut size={18} aria-hidden="true" />
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
