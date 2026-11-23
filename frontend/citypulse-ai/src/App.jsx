import { Toaster } from "react-hot-toast";

import AppRoutes from "@/routes/AppRoutes";
import ScrollToTop from "@/components/common/Scroll/ScrollToTop";
import useTheme from "@/hooks/useTheme";
import useAuthBackGuard from "@/hooks/useAuthBackGuard";

const App = () => {
  const { isDark } = useTheme();
  useAuthBackGuard();

  return (
    <>
      <ScrollToTop />

      <AppRoutes />

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            borderRadius: "12px",
            background: isDark ? "#1e293b" : "#0f172a",
            color: "#f8fafc",
            border: isDark ? "1px solid #334155" : "none",
            fontSize: "14px",
            fontWeight: 500,
          },
          success: {
            iconTheme: {
              primary: "#16a34a",
              secondary: "#f8fafc",
            },
          },
          error: {
            iconTheme: {
              primary: "#dc2626",
              secondary: "#f8fafc",
            },
          },
        }}
      />
    </>
  );
};

export default App;
