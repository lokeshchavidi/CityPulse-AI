import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";

import Button from "@/components/common/Button/Button";
import LightPlate from "@/components/common/LightPlate";
import ThemeToggle from "@/components/common/ThemeToggle";
import NavLinks from "./NavLinks";
import MobileMenu from "./MobileMenu";

import Logo from "@/assets/logos/citypulse-logo-primary.svg";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    if (location.pathname !== "/") {
      setScrolled(true);
      return;
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 12);

      const sections = [
        "home",
        "platform",
        "features",
        "departments",
        "contact",
      ];

      for (const section of sections) {
        const element = document.getElementById(section);

        if (!element) continue;

        const rect = element.getBoundingClientRect();

        if (rect.top <= 120 && rect.bottom >= 120) {
          setActiveSection(section);
          break;
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const navigateToSection = (id) => {
    setMobileOpen(false);

    if (location.pathname === "/") {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      return;
    }

    navigate("/", {
      state: {
        scrollTo: id,
      },
    });
  };

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.35 }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-slate-200/90 bg-surface/95 shadow-soft-sm backdrop-blur-md"
            : "border-b border-transparent bg-surface/70 backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
          <Link to="/" className="flex items-center" aria-label="CityPulse AI home">
            <LightPlate padding="sm" rounded="rounded-lg">
              <img
                src={Logo}
                alt="CityPulse AI"
                className="h-12 w-auto object-contain sm:h-14"
              />
            </LightPlate>
          </Link>

          <NavLinks
            activeSection={activeSection}
            onNavigate={navigateToSection}
          />

          <div className="hidden items-center gap-3 xl:flex">
            <ThemeToggle />

            <Link to="/officer/login">
              <Button variant="outline" size="sm">
                Staff Portal
              </Button>
            </Link>

            <Link to="/login">
              <Button size="sm">Citizen Login</Button>
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="rounded-lg p-2 text-slate-700 transition hover:bg-slate-100 xl:hidden"
            aria-label="Open navigation menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
          >
            <Menu size={24} aria-hidden="true" />
          </button>
        </div>
      </motion.header>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onNavigate={navigateToSection}
      />
    </>
  );
};

export default Navbar;
