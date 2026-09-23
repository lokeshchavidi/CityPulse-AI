import { motion } from "framer-motion";
import { BrainCircuit, CheckCircle2, Users } from "lucide-react";

import SectionTitle from "@/components/common/SectionTitle/SectionTitle";

const statistics = [
  {
    title: "Complaints Resolved",
    value: "25K+",
    description: "Citizen issues closed across participating departments.",
    icon: CheckCircle2,
  },
  {
    title: "Active Officers",
    value: "150+",
    description: "Field officers managing assigned civic workstreams.",
    icon: Users,
  },
  {
    title: "AI Classification Accuracy",
    value: "98%",
    description: "Consistent category and priority recommendations.",
    icon: BrainCircuit,
  },
];

const HeroStats = () => {
  return (
    <section id="impact" className="border-b border-slate-200 bg-surface py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <SectionTitle
          eyebrow="Platform Impact"
          title="Built for measurable civic outcomes"
          description="A production-ready operating layer for municipal complaint response — transparent, auditable, and scalable."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {statistics.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="rounded-xl border border-slate-200 bg-canvas p-6 shadow-soft-sm transition duration-200 hover:border-brand-200 hover:shadow-soft-md"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-50 text-brand-800">
                  <Icon size={22} aria-hidden="true" />
                </div>

                <p className="mt-6 text-4xl font-bold tracking-tight text-slate-900">
                  {item.value}
                </p>

                <h3 className="mt-2 text-base font-semibold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HeroStats;
