import { createContext, useCallback, useEffect, useState } from "react";

import notificationService from "@/services/notificationService";
import useAuth from "@/hooks/useAuth";

const NotificationContext = createContext(null);

const POLL_INTERVAL_MS = 5000;

/**
 * Keeps a lightweight, app-wide unread notification count in sync so the
 * Topbar bell (and anything else that cares) doesn't each need their own
 * polling logic. Only polls while the user is authenticated.
 */
export const NotificationProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();

  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState([]);

  const refreshNotifications = useCallback(async () => {
    if (!isAuthenticated) return;

    try {
      const data = await notificationService.getNotifications();

      setNotifications(data ?? []);

      const unread = data?.filter((n) => !n.read).length ?? 0;

      setUnreadCount(unread);
    } catch {
      // Ignore polling failures
    }
  }, [isAuthenticated]);

  const refreshUnreadCount = useCallback(async () => {
    if (!isAuthenticated) return;

    try {
      const count = await notificationService.getUnreadCount();
      setUnreadCount(count ?? 0);
    } catch {
      // Silently ignore — the bell just won't update this cycle.
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) {
      setUnreadCount(0);
      return;
    }

    refreshNotifications();

    const interval = setInterval(refreshNotifications, POLL_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [isAuthenticated, refreshUnreadCount]);

  const value = {
    unreadCount,
    notifications,
    refreshNotifications,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
