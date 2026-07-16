import { motion } from "framer-motion";
import { ArrowRight, BrainCircuit } from "lucide-react";

import Button from "@/components/common/Button/Button";

const HeroContent = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-2xl"
    >
      {/* Badge */}
      <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-800">
        <BrainCircuit size={18} />
        AI Powered Smart Governance
      </div>

      {/* Heading */}
      <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
        Transforming Citizen Complaints Into
        <span className="block text-blue-800">Smarter City Solutions.</span>
      </h1>

      {/* Description */}
      <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
        Report civic issues effortlessly while enabling government departments
        to intelligently classify, prioritize, assign, and resolve complaints
        using Artificial Intelligence with complete human oversight.
      </p>

      {/* CTA Buttons */}
      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <Button
          size="lg"
          className="w-full sm:w-auto sm:min-w-[210px]"
          rightIcon={<ArrowRight size={18} />}
        >
          Report Complaint
        </Button>

        <Button
          variant="secondary"
          size="lg"
          className="w-full sm:w-auto sm:min-w-[210px]"
        >
          Explore Platform
        </Button>
      </div>
    </motion.div>
  );
};

export default HeroContent;
