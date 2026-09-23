import { motion } from "framer-motion";

import LightPlate from "@/components/common/LightPlate";
import SmartCity from "@/assets/illustrations/smart-city.svg";

const HeroIllustration = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay: 0.1, ease: "easeOut" }}
      className="relative flex items-center justify-center"
    >
      <div className="absolute h-[70%] w-[70%] rounded-full bg-brand-100/50 blur-3xl" />

      <LightPlate
        padding="lg"
        rounded="rounded-2xl"
        className="relative z-10 w-full max-w-md sm:max-w-lg lg:max-w-2xl"
      >
        <img
          src={SmartCity}
          alt="CityPulse AI smart city monitoring"
          className="w-full object-contain"
          draggable={false}
        />
      </LightPlate>
    </motion.div>
  );
};

export default HeroIllustration;
