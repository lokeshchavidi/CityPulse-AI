import { motion } from "framer-motion";

const SectionCard = ({ title, subtitle, action, children, className = "" }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm ${className}`}
    >
      {(title || subtitle || action) && (
        <div className="flex flex-col gap-4 border-b border-slate-200 p-5 md:p-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            {title && (
              <h2 className="text-lg font-semibold text-slate-900 md:text-xl">
                {title}
              </h2>
            )}

            {subtitle && (
              <p className="mt-1 text-sm leading-6 text-slate-500">
                {subtitle}
              </p>
            )}
          </div>

          {action && (
            <div className="flex w-full justify-start lg:w-auto lg:justify-end">
              {action}
            </div>
          )}
        </div>
      )}

      <div className="p-5 md:p-6">{children}</div>
    </motion.section>
  );
};

export default SectionCard;
