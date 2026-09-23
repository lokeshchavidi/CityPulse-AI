import { Outlet } from "react-router-dom";
import { useState } from "react";

import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";

import useSidebar from "@/hooks/useSidebar";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { collapsed, toggleSidebar } = useSidebar();

  return (
    <div className="min-h-screen bg-canvas font-sans">
      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div
        className={`flex min-h-screen flex-col transition-[margin] duration-300 ease-out ${
          collapsed ? "lg:ml-20" : "lg:ml-72"
        }`}
      >
        <Topbar
          collapsed={collapsed}
          toggleSidebar={toggleSidebar}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="flex-1 px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
          <div className="mx-auto w-full max-w-[1700px]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
