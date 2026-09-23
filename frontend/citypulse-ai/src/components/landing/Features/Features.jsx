import { motion } from "framer-motion";
import {
  BrainCircuit,
  Gauge,
  MapPin,
  Route,
  BellRing,
  BarChart3,
} from "lucide-react";

import SectionTitle from "@/components/common/SectionTitle/SectionTitle";
import LightPlate from "@/components/common/LightPlate";
import AIAnalysis from "@/assets/illustrations/ai-analysis.svg";

const features = [
  {
    icon: BrainCircuit,
    title: "Smart classification",
    description:
      "AI tags every complaint so queues stay organized from the first report.",
  },
  {
    icon: Gauge,
    title: "Severity & priority scoring",
    description:
      "Critical issues surface first so field teams can respond in order of impact.",
  },
  {
    icon: Route,
    title: "Department routing",
    description:
      "Recommended routing with manager override keeps accountability with the city.",
  },
  {
    icon: MapPin,
    title: "Geo-tagged reporting",
    description:
      "Citizens pin exact locations so officers arrive with precise context.",
  },
  {
    icon: BellRing,
    title: "Lifecycle notifications",
    description:
      "Status updates from submission through resolution keep residents informed.",
  },
  {
    icon: BarChart3,
    title: "Operational visibility",
    description:
      "Role-based dashboards show workload, backlog, and resolution progress.",
  },
];

const Features = () => {
  return (
    <section id="features" className="bg-surface py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <SectionTitle
          eyebrow="Capabilities"
          title="What departments need to resolve issues faster"
          description="Machine intelligence accelerates triage. Humans remain responsible for every assignment and closure."
        />

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45 }}
            className="order-2 flex justify-center lg:order-1"
          >
            <div className="relative w-full max-w-md">
              <div className="absolute inset-10 rounded-full bg-brand-100/50 blur-3xl" />
              <LightPlate
                padding="lg"
                rounded="rounded-2xl"
                className="relative z-10 w-full"
              >
                <img
                  src={AIAnalysis}
                  alt="AI-assisted complaint analysis workflow"
                  className="mx-auto w-full object-contain"
                  draggable={false}
                />
              </LightPlate>
            </div>
          </motion.div>

          <div className="order-1 grid gap-4 sm:grid-cols-2 lg:order-2">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                  className="rounded-xl border border-slate-200 bg-canvas p-5 shadow-soft-sm transition duration-200 hover:border-brand-200 hover:bg-surface hover:shadow-soft-md"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-800">
                    <Icon size={18} aria-hidden="true" />
                  </div>

                  <h3 className="mt-4 text-base font-semibold text-slate-900">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
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
