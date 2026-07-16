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
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu */}
          <button
            onClick={onMenuClick}
            className="rounded-lg p-2 transition hover:bg-slate-100 lg:hidden"
          >
            <Menu size={22} />
          </button>

          {/* Desktop Collapse Button */}
          <button
            onClick={toggleSidebar}
            className="hidden rounded-lg p-2 transition hover:bg-slate-100 lg:flex"
            title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {collapsed ? <PanelLeft size={20} /> : <PanelLeftClose size={20} />}
          </button>

          <div className="hidden sm:block">
            <h2 className="text-lg font-semibold text-slate-900">
              {ROLE_LABEL[user?.role] ?? "Dashboard"}
            </h2>

            <p className="text-sm text-slate-500">
              Welcome back, {user?.firstName}
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <button
            onClick={() => navigate("/notifications")}
            className="relative rounded-xl p-2.5 transition hover:bg-slate-100"
            aria-label="Notifications"
          >
            <Bell size={20} />

            {unreadCount > 0 && (
              <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen((prev) => !prev)}
              className="flex items-center gap-3 rounded-xl px-2 py-2 transition hover:bg-slate-100"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-700 text-sm font-semibold text-white">
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
              />
            </button>

            {profileOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setProfileOpen(false)}
                />

                <div className="absolute right-0 z-20 mt-3 w-60 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
                  <button
                    onClick={() => {
                      setProfileOpen(false);
                      navigate("/profile");
                    }}
                    className="flex w-full items-center gap-3 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                  >
                    <UserIcon size={18} />
                    Profile
                  </button>

                  <div className="border-t border-slate-100" />

                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-5 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50"
                  >
                    <LogOut size={18} />
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
