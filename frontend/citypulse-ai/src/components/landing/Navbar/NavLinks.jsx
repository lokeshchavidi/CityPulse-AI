import { motion } from "framer-motion";

const navigationItems = [
  {
    label: "Home",
    id: "home",
  },
  {
    label: "Platform",
    id: "platform",
  },
  {
    label: "AI Features",
    id: "features",
  },
  {
    label: "Departments",
    id: "departments",
  },
  {
    label: "Contact",
    id: "contact",
  },
];

const NavLinks = ({ activeSection, onNavigate }) => {
  return (
    <nav className="hidden items-center gap-8 xl:flex xl:gap-10">
      {navigationItems.map((item) => {
        const isActive = activeSection === item.id;

        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className="group relative py-2"
          >
            <span
              className={`text-[15px] font-semibold tracking-wide transition-colors duration-300 ${
                isActive
                  ? "text-blue-800"
                  : "text-slate-700 group-hover:text-blue-800"
              }`}
            >
              {item.label}
            </span>

            <motion.span
              layoutId="active-navbar-link"
              className={`absolute -bottom-1 left-0 h-[3px] rounded-full bg-blue-800 ${
                isActive ? "w-full" : "w-0"
              }`}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 35,
              }}
            />
          </button>
        );
      })}
    </nav>
  );
};

export default NavLinks;
