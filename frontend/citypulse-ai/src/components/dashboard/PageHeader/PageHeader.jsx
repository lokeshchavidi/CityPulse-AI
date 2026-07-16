import { motion } from "framer-motion";

const PageHeader = ({ title, subtitle, action }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-6 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6 lg:flex-row lg:items-center lg:justify-between"
    >
      <div className="min-w-0">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            {subtitle}
          </p>
        )}
      </div>

      {action && (
        <div className="flex w-full shrink-0 justify-start lg:w-auto lg:justify-end">
          {action}
        </div>
      )}
    </motion.div>
  );
};

export default PageHeader;
