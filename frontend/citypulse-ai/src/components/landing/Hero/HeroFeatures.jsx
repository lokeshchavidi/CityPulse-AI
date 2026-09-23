import { motion } from "framer-motion";
import { BrainCircuit, Building2, MapPinned, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Secure Platform",
    description:
      "Enterprise-grade security for citizens and government departments.",
  },
  {
    icon: BrainCircuit,
    title: "AI Powered",
    description:
      "Automatic complaint classification and intelligent prioritization.",
  },
  {
    icon: MapPinned,
    title: "Geo Tracking",
    description:
      "Pinpoint complaint locations using interactive smart city maps.",
  },
  {
    icon: Building2,
    title: "Government Ready",
    description:
      "Designed specifically for municipalities and smart city departments.",
  },
];

const HeroFeatures = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="mt-10 grid gap-4 sm:grid-cols-2"
    >
      {features.map((feature) => {
        const Icon = feature.icon;

        return (
          <div
            key={feature.title}
            className="group rounded-xl border border-slate-200 bg-surface p-4 shadow-soft-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-soft-md"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-800">
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
          </div>
        );
      })}
    </motion.div>
  );
};

export default HeroFeatures;
