import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import Button from "@/components/common/Button/Button";
import ThemeToggle from "@/components/common/ThemeToggle";

const navigationItems = [
  { label: "Home", id: "home" },
  { label: "Platform", id: "platform" },
  { label: "Capabilities", id: "features" },
  { label: "Departments", id: "departments" },
  { label: "Contact", id: "contact" },
];

const MobileMenu = ({ open, onClose, onNavigate }) => {
  const handleNavigation = (id) => {
    onNavigate(id);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm xl:hidden"
            aria-hidden="true"
          />

          <motion.aside
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed right-0 top-0 z-50 flex h-screen w-[min(85vw,20rem)] flex-col bg-surface shadow-soft-lg xl:hidden"
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-5">
              <div>
                <p className="text-lg font-bold tracking-tight text-slate-900">
                  CityPulse AI
                </p>
                <p className="mt-0.5 text-sm text-slate-500">
                  Smart City Platform
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100"
                aria-label="Close navigation menu"
              >
                <X size={22} aria-hidden="true" />
              </button>
            </div>

            <nav className="flex flex-1 flex-col gap-1 p-4" aria-label="Mobile">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavigation(item.id)}
                  className="rounded-lg px-4 py-3 text-left text-sm font-semibold text-slate-700 transition hover:bg-brand-50 hover:text-brand-800"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="space-y-3 border-t border-slate-200 p-5">
              <div className="flex justify-center">
                <ThemeToggle variant="segmented" />
              </div>

              <Link to="/officer/login" onClick={onClose} className="block">
                <Button variant="outline" fullWidth>
                  Staff Portal
                </Button>
              </Link>

              <Link to="/login" onClick={onClose} className="block">
                <Button fullWidth>Citizen Login</Button>
              </Link>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
