const SectionTitle = ({
  eyebrow,
  badge,
  title,
  highlight,
  description,
  center = true,
  className = "",
}) => {
  const label = eyebrow ?? badge;

  return (
    <div
      className={`${center ? "mx-auto max-w-3xl text-center" : "max-w-2xl"} ${className}`}
    >
      {label && (
        <span className="inline-flex items-center rounded-md border border-brand-200 bg-brand-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-800">
          {label}
        </span>
      )}

      <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
        {title}
        {highlight && (
          <span className="mt-1 block text-brand-800">{highlight}</span>
        )}
      </h2>

      {description && (
        <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
