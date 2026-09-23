import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const colors = {
  blue: {
    bg: "bg-brand-50",
    text: "text-brand-800",
    badge: "text-brand-700",
  },
  green: {
    bg: "bg-[var(--color-success-bg)]",
    text: "text-[var(--color-success-fg)]",
    badge: "text-[var(--color-success)]",
  },
  orange: {
    bg: "bg-[var(--color-warning-bg)]",
    text: "text-[var(--color-warning-fg)]",
    badge: "text-[var(--color-warning)]",
  },
  red: {
    bg: "bg-[var(--color-danger-bg)]",
    text: "text-[var(--color-danger-fg)]",
    badge: "text-[var(--color-danger)]",
  },
  purple: {
    bg: "bg-[var(--color-sky-bg)]",
    text: "text-[var(--color-sky-fg)]",
    badge: "text-[var(--color-info)]",
  },
  teal: {
    bg: "bg-[var(--color-cyan-bg)]",
    text: "text-[var(--color-cyan-fg)]",
    badge: "text-[var(--color-cyan-fg)]",
  },
};

const StatsCard = ({
  title,
  value,
  icon: Icon,
  color = "blue",
  trend,
  subtitle,
}) => {
  const current = colors[color] || colors.blue;

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className="rounded-xl border border-slate-200 bg-surface p-5 shadow-soft-sm transition duration-200 hover:border-brand-200 hover:shadow-soft-md"
    >
      <div className="flex items-start justify-between gap-3">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-lg ${current.bg}`}
        >
          {Icon && <Icon size={20} className={current.text} aria-hidden="true" />}
        </div>

        {trend && (
          <div
            className={`flex items-center gap-1 rounded-md bg-slate-50 px-2 py-1 text-xs font-semibold ${current.badge}`}
          >
            {trend}
            <ArrowUpRight size={14} aria-hidden="true" />
          </div>
        )}
      </div>

      <div className="mt-4">
        <p className="text-3xl font-bold tracking-tight text-slate-900">
          {value}
        </p>

        <h3 className="mt-1.5 text-sm font-semibold text-slate-800">{title}</h3>

        {subtitle && (
          <p className="mt-1 text-xs leading-relaxed text-slate-500">
            {subtitle}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default StatsCard;
