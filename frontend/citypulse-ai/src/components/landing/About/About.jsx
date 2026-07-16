import AboutContent from "./AboutContent";
import AboutIllustration from "./AboutIllustration";

const About = () => {
  return (
    <section id="platform" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-10">
        <AboutContent />

        <AboutIllustration />
      </div>
    </section>
  );
};

export default About;
