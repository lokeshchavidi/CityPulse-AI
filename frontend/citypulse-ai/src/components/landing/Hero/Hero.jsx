import HeroContent from "./HeroContent";
import HeroFeatures from "./HeroFeatures";
import HeroIllustration from "./HeroIllustration";
import HeroStats from "./HeroStats";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50"
    >
      {/* Background Decorations */}
      <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-blue-200/20 blur-3xl" />

      <div className="absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-cyan-200/20 blur-3xl" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(37,99,235,0.08),transparent_35%),radial-gradient(circle_at_bottom_left,_rgba(15,118,110,0.08),transparent_35%)]" />

      <div className="relative mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-10 lg:py-20">
        {/* Hero Grid */}
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Left */}
          <div className="lg:col-span-7">
            <HeroContent />
            <HeroFeatures />
          </div>

          {/* Right */}
          <div className="lg:col-span-5">
            <HeroIllustration />
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-16 lg:mt-20">
          <HeroStats />
        </div>
      </div>
    </section>
  );
};

export default Hero;
