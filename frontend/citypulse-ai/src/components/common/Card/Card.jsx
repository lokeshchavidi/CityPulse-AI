const Card = ({ children, className = "", hover = false, padding = "md" }) => {
  const paddings = {
    none: "p-0",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <div
      className={`
        rounded-xl
        border
        border-slate-200
        bg-surface
        shadow-soft-sm
        transition
        duration-200
        ${hover ? "hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-soft-md" : ""}
        ${paddings[padding] ?? paddings.md}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;
