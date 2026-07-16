import { motion } from "framer-motion";
import {
  BrainCircuit,
  CheckCircle2,
  MapPinned,
  TrendingUp,
} from "lucide-react";

import SmartCity from "@/assets/illustrations/smart-city.svg";

const HeroIllustration = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7 }}
      className="relative flex items-center justify-center py-8 lg:py-0"
    >
      {/* Background Glow */}
      <div className="absolute h-72 w-72 rounded-full bg-blue-100/50 blur-3xl sm:h-96 sm:w-96 lg:h-[460px] lg:w-[460px]" />

      {/* Main Illustration */}
      <motion.img
        src={SmartCity}
        alt="AI Powered Smart City"
        className="relative z-10 w-full max-w-sm sm:max-w-md lg:max-w-xl xl:max-w-2xl"
        animate={{ y: [-6, 6, -6] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        draggable={false}
      />

      {/* AI Analysis Card */}
      <motion.div
        animate={{ y: [-6, 6, -6] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-0 top-6 z-20 hidden w-64 rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-xl backdrop-blur lg:block xl:w-72"
      >
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-blue-100 p-3">
            <BrainCircuit className="text-blue-700" size={22} />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              AI Analysis
            </h3>

            <p className="text-xs text-slate-500">Intelligent Classification</p>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Severity</span>

            <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
              Critical
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Department</span>

            <span className="text-sm font-semibold text-slate-900">Roads</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Priority</span>

            <span className="text-sm font-semibold text-blue-700">High</span>
          </div>
        </div>
      </motion.div>

      {/* Resolution Card */}
      <motion.div
        animate={{ y: [6, -6, 6] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-8 right-0 z-20 hidden w-64 rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-xl backdrop-blur lg:block xl:w-72"
      >
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-green-100 p-3">
            <CheckCircle2 className="text-green-700" size={22} />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Complaint Resolved
            </h3>

            <p className="text-xs text-slate-500">Updated 2 mins ago</p>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          <div className="flex items-center gap-2">
            <MapPinned className="text-blue-700" size={16} />

            <span className="text-sm text-slate-600">MG Road, Hyderabad</span>
          </div>

          <div className="flex items-center gap-2">
            <TrendingUp className="text-green-700" size={16} />

            <span className="text-sm text-slate-600">
              Resolution Time: 3 Hours
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HeroIllustration;
