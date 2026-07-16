import { motion } from "framer-motion";

import AboutCity from "@/assets/illustrations/about-city.svg";

const AboutIllustration = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex min-w-0 items-center justify-center"
    >
      <div className="relative w-full max-w-lg lg:max-w-xl">
        <div className="absolute inset-0 rounded-full bg-blue-100/40 blur-3xl" />

        <img
          src={AboutCity}
          alt="About CityPulse AI"
          className="relative z-10 mx-auto w-full object-contain"
          draggable={false}
        />
      </div>
    </motion.div>
  );
};

export default AboutIllustration;
