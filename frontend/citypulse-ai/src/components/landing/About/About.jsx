import AboutContent from "./AboutContent";
import AboutIllustration from "./AboutIllustration";

const About = () => {
  return (
    <section id="platform" className="bg-canvas py-16 sm:py-20 lg:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-10">
        <AboutContent />
        <AboutIllustration />
      </div>
    </section>
  );
};

export default About;
