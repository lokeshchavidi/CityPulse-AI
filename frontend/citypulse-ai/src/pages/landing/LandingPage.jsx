import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import PublicLayout from "@/layouts/PublicLayout";

import Hero, { HeroStats } from "@/components/landing/Hero";
import About from "@/components/landing/About";
import Features from "@/components/landing/Features";
import Departments from "@/components/landing/Departments";
import Contact from "@/components/landing/Contact";

const LandingPage = () => {
  const location = useLocation();

  useEffect(() => {
    if (!location.state?.scrollTo) return;

    const timer = setTimeout(() => {
      document.getElementById(location.state.scrollTo)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 150);

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <PublicLayout>
      <Hero />
      <HeroStats />
      <About />
      <Features />
      <Departments />
      <Contact />
    </PublicLayout>
  );
};

export default LandingPage;
