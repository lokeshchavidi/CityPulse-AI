import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";

import Button from "@/components/common/Button/Button";
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
    // Only track sections on the landing page
    if (location.pathname !== "/") {
      setScrolled(true);
      return;
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

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

    // Already on landing page → smooth scroll
    if (location.pathname === "/") {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      return;
    }

    // Coming from login/register/officer login
    navigate("/", {
      state: {
        scrollTo: id,
      },
    });
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4 }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-slate-200 bg-white/90 shadow-sm backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
          <Link to="/" className="flex items-center">
            <img src={Logo} alt="CityPulse AI" className="h-14 w-auto" />
          </Link>

          <NavLinks
            activeSection={activeSection}
            onNavigate={navigateToSection}
          />

          <div className="hidden items-center gap-4 xl:flex">
            <Link to="/officer/login">
              <Button variant="outline">Officer Portal</Button>
            </Link>

            <Link to="/login">
              <Button>Citizen Login</Button>
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(true)}
            className="rounded-xl p-2 transition hover:bg-slate-100 xl:hidden"
            aria-label="Open Menu"
          >
            <Menu size={28} />
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
