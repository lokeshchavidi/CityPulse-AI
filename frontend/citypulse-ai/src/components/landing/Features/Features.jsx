import { motion } from "framer-motion";
import {
  BrainCircuit,
  Gauge,
  MapPin,
  Route,
  BellRing,
  BarChart3,
  Sparkles,
} from "lucide-react";

import AIAnalysis from "@/assets/illustrations/ai-analysis.svg";

const features = [
  {
    icon: BrainCircuit,
    title: "Smart Classification",
    description:
      "AI reads every complaint and automatically tags its category, so nothing sits unsorted in a queue.",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-700",
  },
  {
    icon: Gauge,
    title: "Severity & Priority Scoring",
    description:
      "Each report is scored for urgency, helping departments act on critical issues first.",
    iconBg: "bg-red-100",
    iconColor: "text-red-700",
  },
  {
    icon: Route,
    title: "Automatic Department Routing",
    description:
      "Complaints are recommended to the right department instantly, with managers free to override.",
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-700",
  },
  {
    icon: MapPin,
    title: "Geo-Tagged Reporting",
    description:
      "Citizens pin the exact location of an issue on a live map for faster on-ground response.",
    iconBg: "bg-cyan-100",
    iconColor: "text-cyan-700",
  },
  {
    icon: BellRing,
    title: "Real-Time Notifications",
    description:
      "Citizens are notified at every stage — submitted, assigned, in progress, and resolved.",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-700",
  },
  {
    icon: BarChart3,
    title: "Analytics for Departments",
    description:
      "Dashboards give department heads a live view of workload, response time, and resolution trends.",
    iconBg: "bg-violet-100",
    iconColor: "text-violet-700",
  },
];

const Features = () => {
  return (
    <section id="features" className="relative overflow-hidden bg-slate-50 py-16 sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute -right-32 top-10 h-80 w-80 rounded-full bg-blue-100/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-800">
            <Sparkles size={18} />
            AI Features
          </div>

          <h2 className="mt-6 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Everything Departments Need
            <span className="block text-blue-800">
              to Resolve Issues Faster.
            </span>
          </h2>

          <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">
            CityPulse AI pairs every complaint with machine intelligence,
            while keeping a human in the loop for every final decision.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2 flex items-center justify-center lg:order-1"
          >
            <div className="relative w-full max-w-md">
              <div className="absolute inset-0 rounded-full bg-blue-100/40 blur-3xl" />
              <img
                src={AIAnalysis}
                alt="AI Complaint Analysis"
                className="relative z-10 mx-auto w-full object-contain"
                draggable={false}
              />
            </div>
          </motion.div>

          <div className="order-1 grid gap-5 sm:grid-cols-2 lg:order-2">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
                >
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${feature.iconBg}`}
                  >
                    <Icon className={feature.iconColor} size={20} />
                  </div>

                  <h3 className="mt-4 text-base font-semibold text-slate-900">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
