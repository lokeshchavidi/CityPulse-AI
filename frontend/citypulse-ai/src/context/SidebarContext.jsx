import { createContext, useEffect, useState } from "react";

const STORAGE_KEY = "citypulse-sidebar-collapsed";

const SidebarContext = createContext(null);

export const SidebarProvider = ({ children }) => {
  const [collapsed, setCollapsed] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);

    return stored ? JSON.parse(stored) : false;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(collapsed));
  }, [collapsed]);

  /**
   * Toggles the desktop sidebar between expanded
   * and collapsed states.
   */
  const toggleSidebar = () => {
    setCollapsed((previous) => !previous);
  };

  /**
   * Expands the sidebar.
   */
  const expandSidebar = () => {
    setCollapsed(false);
  };

  /**
   * Collapses the sidebar.
   */
  const collapseSidebar = () => {
    setCollapsed(true);
  };

  const value = {
    collapsed,

    toggleSidebar,
    expandSidebar,
    collapseSidebar,
  };

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
};

export default SidebarContext;
