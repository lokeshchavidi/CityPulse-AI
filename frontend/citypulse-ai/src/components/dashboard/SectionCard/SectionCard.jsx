import { motion } from "framer-motion";

const SectionCard = ({
  title,
  subtitle,
  action,
  children,
  className = "",
  bodyClassName = "",
}) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`overflow-hidden rounded-xl border border-slate-200 bg-surface shadow-soft-sm ${className}`}
    >
      {(title || subtitle || action) && (
        <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between md:px-6">
          <div className="min-w-0">
            {title && (
              <h2 className="text-lg font-semibold tracking-tight text-slate-900">
                {title}
              </h2>
            )}

            {subtitle && (
              <p className="mt-1 text-sm leading-relaxed text-slate-500">
                {subtitle}
              </p>
            )}
          </div>

          {action && (
            <div className="flex w-full justify-start sm:w-auto sm:justify-end">
              {action}
            </div>
          )}
        </div>
      )}

      <div className={`p-5 md:p-6 ${bodyClassName}`}>{children}</div>
    </motion.section>
  );
};

export default SectionCard;
