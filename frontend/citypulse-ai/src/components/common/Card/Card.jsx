const Card = ({ children, className = "", hover = true }) => {
  return (
    <div
      className={`rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition duration-300 ${
        hover ? "hover:-translate-y-1 hover:shadow-xl" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
