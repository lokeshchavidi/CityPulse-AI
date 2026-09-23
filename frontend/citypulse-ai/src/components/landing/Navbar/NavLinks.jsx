const navigationItems = [
  { label: "Home", id: "home" },
  { label: "Platform", id: "platform" },
  { label: "Capabilities", id: "features" },
  { label: "Departments", id: "departments" },
  { label: "Contact", id: "contact" },
];

const NavLinks = ({ activeSection, onNavigate }) => {
  return (
    <nav className="hidden items-center gap-1 xl:flex" aria-label="Primary">
      {navigationItems.map((item) => {
        const isActive = activeSection === item.id;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onNavigate(item.id)}
            className={`relative rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors duration-200 ${
              isActive
                ? "bg-brand-50 text-brand-800"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
            aria-current={isActive ? "true" : undefined}
          >
            {item.label}
          </button>
        );
      })}
    </nav>
  );
};

export default NavLinks;
