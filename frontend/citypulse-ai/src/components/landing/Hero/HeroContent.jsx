import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import Button from "@/components/common/Button/Button";

const scrollToPlatform = () => {
  document.getElementById("platform")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

const HeroContent = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="max-w-xl"
    >
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-800">
        Municipal Smart City Platform
      </p>

      <h1 className="mt-4 text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl lg:text-[4.25rem] lg:leading-[1.05]">
        CityPulse AI
      </h1>

      <p className="mt-5 text-xl font-semibold tracking-tight text-slate-800 sm:text-2xl">
        Civic complaints, resolved with intelligence and oversight.
      </p>

      <p className="mt-4 max-w-lg text-base leading-relaxed text-slate-600 sm:text-lg">
        Report issues in minutes. Departments classify, prioritize, and act
        with AI assistance — always under human control.
      </p>

      <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Link to="/register" className="w-full sm:w-auto">
          <Button
            size="lg"
            className="w-full sm:min-w-[200px]"
            rightIcon={<ArrowRight size={18} aria-hidden="true" />}
          >
            Report a Complaint
          </Button>
        </Link>

        <Button
          variant="outline"
          size="lg"
          className="w-full sm:min-w-[180px]"
          onClick={scrollToPlatform}
        >
          Explore Platform
        </Button>
      </div>
    </motion.div>
  );
};

export default HeroContent;
