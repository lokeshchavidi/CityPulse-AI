import { motion } from "framer-motion";
import {
  Building2,
  Droplets,
  Lightbulb,
  Trash2,
  ShieldAlert,
  TreePine,
  ArrowRight,
} from "lucide-react";

const departments = [
  {
    icon: Building2,
    title: "Roads & Infrastructure",
    description: "Potholes, damaged roads, footpaths, and bridge upkeep.",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-700",
  },
  {
    icon: Droplets,
    title: "Water Supply",
    description: "Leakages, contamination, and supply disruption reports.",
    iconBg: "bg-cyan-100",
    iconColor: "text-cyan-700",
  },
  {
    icon: Trash2,
    title: "Sanitation & Waste",
    description: "Garbage collection, drainage, and public cleanliness.",
    iconBg: "bg-green-100",
    iconColor: "text-green-700",
  },
  {
    icon: Lightbulb,
    title: "Electricity",
    description: "Streetlight outages, power cuts, and faulty wiring.",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-700",
  },
  {
    icon: ShieldAlert,
    title: "Public Safety",
    description: "Traffic hazards, unsafe structures, and emergency reports.",
    iconBg: "bg-red-100",
    iconColor: "text-red-700",
  },
  {
    icon: TreePine,
    title: "Parks & Environment",
    description: "Park maintenance, tree hazards, and pollution concerns.",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-700",
  },
];

const Departments = () => {
  return (
    <section id="departments" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-800">
            <Building2 size={18} />
            Departments
          </div>

          <h2 className="mt-6 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
            One Platform, Every
            <span className="block text-blue-800">Municipal Department.</span>
          </h2>

          <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">
            Complaints are routed to the department best equipped to resolve
            them, with full visibility for department heads and officers.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {departments.map((dept, index) => {
            const Icon = dept.icon;

            return (
              <motion.div
                key={dept.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${dept.iconBg}`}
                >
                  <Icon className={dept.iconColor} size={22} />
                </div>

                <h3 className="mt-5 text-lg font-semibold text-slate-900">
                  {dept.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {dept.description}
                </p>

                <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-blue-800 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Learn more
                  <ArrowRight size={15} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Departments;
