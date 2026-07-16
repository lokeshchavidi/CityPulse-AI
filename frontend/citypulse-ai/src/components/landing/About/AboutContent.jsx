import { motion } from "framer-motion";
import { BrainCircuit, ShieldCheck, Sparkles, Users } from "lucide-react";

const features = [
  {
    icon: BrainCircuit,
    title: "AI Powered Analysis",
    description:
      "Automatically classifies complaints, predicts severity, priority, and recommends the responsible department.",
  },
  {
    icon: Users,
    title: "Human-in-the-Loop",
    description:
      "Department Managers validate AI recommendations before assigning complaints to officers.",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Transparent",
    description:
      "Every complaint is securely tracked from submission through final resolution with complete audit history.",
  },
];

const AboutContent = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-2xl"
    >
      <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-800">
        <Sparkles size={18} />
        About CityPulse AI
      </div>

      <h2 className="mt-6 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
        Modernizing Citizen Complaint Management
        <span className="block text-blue-800">
          with Artificial Intelligence.
        </span>
      </h2>

      <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">
        CityPulse AI empowers citizens to report civic issues while helping
        government departments intelligently analyze, prioritize, assign,
        monitor, and resolve complaints using AI-assisted workflows with
        complete human oversight.
      </p>

      <div className="mt-10 space-y-6">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <div key={feature.title} className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                <Icon size={22} className="text-blue-700" />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm leading-7 text-slate-600 sm:text-base">
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
