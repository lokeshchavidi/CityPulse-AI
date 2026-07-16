import { X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Icon from "@/assets/icons/citypulse-ai-icon.png";
import useAuth from "@/hooks/useAuth";
import { ROLES } from "@/constants/roles";
import SidebarItem from "./SidebarItem";
import {
  citizenMenu,
  officerMenu,
  departmentManagerMenu,
  adminMenu,
} from "./menus";

const ROLE_MENU = {
  [ROLES.CITIZEN]: {
    items: citizenMenu,
    title: "Citizen Portal",
  },

  [ROLES.OFFICER]: {
    items: officerMenu,
    title: "Officer Portal",
  },

  [ROLES.DEPARTMENT_MANAGER]: {
    items: departmentManagerMenu,
    title: "Department Manager",
  },

  [ROLES.ADMIN]: {
    items: adminMenu,
    title: "Admin Console",
  },
};

const Sidebar = ({ open, onClose, collapsed }) => {
  const { user } = useAuth();

  const { items: menuItems, title } = ROLE_MENU[user?.role] ?? {
    items: citizenMenu,
    title: "Citizen Portal",
  };

  const sidebarContent = (
    <aside
      className={`relative flex h-full flex-col border-r border-slate-200 bg-white transition-all duration-300 ${
        collapsed ? "w-20" : "w-72"
      }`}
    >
      {/* Header */}
      <div
        className={`flex h-20 items-center border-b border-slate-100 ${
          collapsed ? "justify-center px-2" : "justify-between px-6"
        }`}
      >
        <NavLink
          to="/"
          className={`flex items-center ${
            collapsed ? "justify-center" : "gap-3"
          }`}
        >
          <img
            src={Icon}
            alt="CityPulse AI"
            className="h-11 w-11 object-contain"
          />

          {!collapsed && (
            <div className="min-w-0">
              <h1 className="truncate text-lg font-bold text-slate-900">
                CityPulse AI
              </h1>

              <p className="truncate text-xs text-slate-500">{title}</p>
            </div>
          )}
        </NavLink>

        {!collapsed && (
          <button
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-slate-100 lg:hidden"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-6">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.path}
              {...item}
              collapsed={collapsed}
              onClick={onClose}
            />
          ))}
        </div>
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="border-t border-slate-100 p-4">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-900">CityPulse AI</p>

            <p className="mt-2 text-xs leading-5 text-slate-500">
              Smart City Complaint Management Platform powered by AI.
            </p>

            <div className="mt-4 border-t border-slate-200 pt-3">
              <span className="text-xs font-medium text-slate-400">
                Version 1.0
              </span>
            </div>
          </div>
        </div>
      )}
    </aside>
  );

  return (
    <>
      {/* Desktop */}
      <div
        className={`fixed left-0 top-0 hidden h-screen transition-all duration-300 lg:block ${
          collapsed ? "w-20" : "w-72"
        }`}
      >
        {sidebarContent}
      </div>

      {/* Mobile */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
            />

            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{
                duration: 0.25,
                ease: "easeInOut",
              }}
              className="fixed left-0 top-0 z-50 h-screen lg:hidden"
            >
              <aside className="w-72">{sidebarContent}</aside>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
