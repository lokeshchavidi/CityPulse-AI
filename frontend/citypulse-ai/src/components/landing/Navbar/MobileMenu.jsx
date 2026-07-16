import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import Button from "@/components/common/Button/Button";

const navigationItems = [
  { label: "Home", id: "home" },
  { label: "Platform", id: "platform" },
  { label: "AI Features", id: "features" },
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
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm xl:hidden"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed right-0 top-0 z-50 flex h-screen w-[85vw] max-w-80 flex-col bg-white shadow-2xl xl:hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 p-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  CityPulse AI
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Smart Governance Platform
                </p>
              </div>

              <button
                onClick={onClose}
                className="rounded-lg p-2 transition hover:bg-slate-100"
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex flex-1 flex-col gap-2 p-6">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id)}
                  className="rounded-xl px-4 py-3 text-left font-medium text-slate-700 transition hover:bg-slate-100 hover:text-blue-800"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Footer Buttons */}
            <div className="space-y-3 border-t border-slate-200 p-6">
              <Link to="/officer/login" onClick={onClose}>
                <Button variant="outline" fullWidth>
                  Officer Portal
                </Button>
              </Link>

              <Link to="/login" onClick={onClose}>
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
