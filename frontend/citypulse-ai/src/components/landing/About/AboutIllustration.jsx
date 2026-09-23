import { motion } from "framer-motion";

import LightPlate from "@/components/common/LightPlate";
import AboutCity from "@/assets/illustrations/about-city.svg";

const AboutIllustration = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: 0.05 }}
      className="flex min-w-0 items-center justify-center"
    >
      <div className="relative w-full max-w-lg">
        <div className="absolute inset-8 rounded-full bg-brand-100/40 blur-3xl" />
        <LightPlate
          padding="lg"
          rounded="rounded-2xl"
          className="relative z-10 w-full"
        >
          <img
            src={AboutCity}
            alt="Municipal teams coordinating civic responses"
            className="mx-auto w-full object-contain"
            draggable={false}
          />
        </LightPlate>
      </div>
    </motion.div>
  );
};

export default AboutIllustration;
