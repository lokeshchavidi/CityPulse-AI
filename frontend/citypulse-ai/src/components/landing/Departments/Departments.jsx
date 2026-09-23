import { motion } from "framer-motion";
import {
  Building2,
  Droplets,
  Lightbulb,
  Trash2,
  ShieldAlert,
  TreePine,
} from "lucide-react";

import SectionTitle from "@/components/common/SectionTitle/SectionTitle";

const departments = [
  {
    icon: Building2,
    title: "Roads & Infrastructure",
    description: "Potholes, damaged roads, footpaths, and bridge upkeep.",
  },
  {
    icon: Droplets,
    title: "Water Supply",
    description: "Leakages, contamination, and supply disruption reports.",
  },
  {
    icon: Trash2,
    title: "Sanitation & Waste",
    description: "Garbage collection, drainage, and public cleanliness.",
  },
  {
    icon: Lightbulb,
    title: "Electricity",
    description: "Streetlight outages, power cuts, and faulty wiring.",
  },
  {
    icon: ShieldAlert,
    title: "Public Safety",
    description: "Traffic hazards, unsafe structures, and emergency reports.",
  },
  {
    icon: TreePine,
    title: "Parks & Environment",
    description: "Park maintenance, tree hazards, and pollution concerns.",
  },
];

const Departments = () => {
  return (
    <section id="departments" className="bg-canvas py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <SectionTitle
          eyebrow="Departments"
          title="One platform for every municipal department"
          description="Complaints route to the team best equipped to resolve them, with full visibility for managers and officers."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {departments.map((dept, index) => {
            const Icon = dept.icon;

            return (
              <motion.div
                key={dept.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                className="rounded-xl border border-slate-200 bg-surface p-6 shadow-soft-sm transition duration-200 hover:border-brand-200 hover:shadow-soft-md"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-50 text-brand-800">
                  <Icon size={20} aria-hidden="true" />
                </div>

                <h3 className="mt-5 text-lg font-semibold text-slate-900">
                  {dept.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {dept.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Departments;
