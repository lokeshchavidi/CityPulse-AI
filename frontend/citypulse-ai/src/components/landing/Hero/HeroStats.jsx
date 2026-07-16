import { motion } from "framer-motion";
import { ArrowUpRight, BrainCircuit, CheckCircle2, Users } from "lucide-react";

const statistics = [
  {
    title: "Complaints Resolved",
    value: "25K+",
    description: "Successfully resolved citizen complaints",
    icon: CheckCircle2,
    iconBg: "bg-green-100",
    iconColor: "text-green-700",
    trend: "+18%",
    trendColor: "text-green-600",
  },
  {
    title: "Government Officers",
    value: "150+",
    description: "Active officers managing complaints",
    icon: Users,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-700",
    trend: "+12%",
    trendColor: "text-blue-700",
  },
  {
    title: "AI Prediction Accuracy",
    value: "98%",
    description: "Accurate complaint classification by AI",
    icon: BrainCircuit,
    iconBg: "bg-violet-100",
    iconColor: "text-violet-700",
    trend: "+4%",
    trendColor: "text-violet-700",
  },
];

const HeroStats = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {statistics.map((item, index) => {
        const Icon = item.icon;

        return (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: index * 0.15,
            }}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.iconBg}`}
              >
                <Icon className={item.iconColor} size={22} />
              </div>

              <div
                className={`flex items-center gap-1 text-sm font-semibold ${item.trendColor}`}
              >
                {item.trend}
                <ArrowUpRight size={16} />
              </div>
            </div>

            <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 lg:text-5xl">
              {item.value}
            </h2>

            <h3 className="mt-2 text-lg font-semibold text-slate-900">
              {item.title}
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              {item.description}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
};

export default HeroStats;
