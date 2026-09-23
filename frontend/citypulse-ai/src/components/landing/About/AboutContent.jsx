import { motion } from "framer-motion";
import { BrainCircuit, ShieldCheck, Users } from "lucide-react";

const features = [
  {
    icon: BrainCircuit,
    title: "AI-assisted analysis",
    description:
      "Automatic category, severity, and department recommendations on every complaint.",
  },
  {
    icon: Users,
    title: "Human-in-the-loop control",
    description:
      "Department managers validate or override AI before work reaches officers.",
  },
  {
    icon: ShieldCheck,
    title: "Secure & auditable",
    description:
      "Role-based access with a complete history from intake through resolution.",
  },
];

const AboutContent = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45 }}
      className="max-w-xl"
    >
      <span className="inline-flex items-center rounded-md border border-brand-200 bg-brand-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-800">
        The Platform
      </span>

      <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
        Modern complaint operations for municipal teams
      </h2>

      <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
        CityPulse AI connects citizens with the right departments — combining
        machine intelligence with accountable government workflows.
      </p>

      <div className="mt-10 space-y-5">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <div key={feature.title} className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-surface text-brand-800 shadow-soft-sm ring-1 ring-slate-200">
                <Icon size={20} aria-hidden="true" />
              </div>

              <div>
                <h3 className="text-base font-semibold text-slate-900">
                  {feature.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">
                  {feature.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default AboutContent;
