import { motion } from "framer-motion";

const PageHeader = ({ title, subtitle, action }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"
    >
      <div className="min-w-0">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
            {subtitle}
          </p>
        )}
      </div>

      {action && (
        <div className="flex w-full shrink-0 justify-start sm:w-auto sm:justify-end">
          {action}
        </div>
      )}
    </motion.div>
  );
};

export default PageHeader;
