const SectionTitle = ({ badge, title, description, center = true }) => {
  return (
    <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {badge && (
        <span className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-800">
          {badge}
        </span>
      )}

      <h2 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 lg:text-5xl">
        {title}
      </h2>

      {description && (
        <p className="mt-6 text-lg leading-8 text-slate-600">{description}</p>
      )}
    </div>
  );
};

export default SectionTitle;
