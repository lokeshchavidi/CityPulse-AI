import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const StatsCard = ({
  title,
  value,
  icon: Icon,
  color = "blue",
  trend,
  subtitle,
}) => {
  const colors = {
    blue: {
      bg: "bg-blue-100",
      text: "text-blue-700",
      badge: "text-blue-600",
    },
    green: {
      bg: "bg-green-100",
      text: "text-green-700",
      badge: "text-green-600",
    },
    orange: {
      bg: "bg-orange-100",
      text: "text-orange-700",
      badge: "text-orange-600",
    },
    red: {
      bg: "bg-red-100",
      text: "text-red-700",
      badge: "text-red-600",
    },
    purple: {
      bg: "bg-purple-100",
      text: "text-purple-700",
      badge: "text-purple-600",
    },
    teal: {
      bg: "bg-teal-100",
      text: "text-teal-700",
      badge: "text-teal-600",
    },
  };

  const current = colors[color] || colors.blue;

  return (
    <motion.div
      whileHover={{
        y: -3,
      }}
      transition={{
        duration: 0.2,
      }}
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:border-blue-100 hover:shadow-md"
    >
      <div className="flex items-start justify-between">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${current.bg} md:h-14 md:w-14`}
        >
          {Icon && <Icon size={22} className={current.text} />}
        </div>

        {trend && (
          <div
            className={`flex items-center gap-1 rounded-full bg-slate-50 px-2 py-1 text-xs font-semibold ${current.badge}`}
          >
            {trend}
            <ArrowUpRight size={14} />
          </div>
        )}
      </div>

      <div className="mt-5">
        <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
          {value}
        </h2>

        <h3 className="mt-2 text-base font-semibold text-slate-800 md:text-lg">
          {title}
        </h3>

        {subtitle && (
          <p className="mt-2 text-sm leading-6 text-slate-500">{subtitle}</p>
        )}
      </div>
    </motion.div>
  );
};

export default StatsCard;
