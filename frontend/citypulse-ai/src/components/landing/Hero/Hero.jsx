import HeroContent from "./HeroContent";
import HeroIllustration from "./HeroIllustration";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-[calc(100vh-5rem)] overflow-hidden border-b border-slate-200/80"
    >
      {/* Atmospheric plane — light in light mode, deep slate in dark mode */}
      <div className="absolute inset-0 bg-[linear-gradient(160deg,#f8fafc_0%,#eef4ff_45%,#f4f6f9_100%)] dark:bg-[linear-gradient(160deg,#0b1220_0%,#111827_45%,#0f172a_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_100%_0%,rgba(37,99,235,0.08),transparent_55%)] dark:bg-[radial-gradient(ellipse_80%_60%_at_100%_0%,rgba(59,130,246,0.16),transparent_55%)]" />
      <div
        className="absolute inset-0 opacity-[0.35] dark:opacity-[0.2]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,163,184,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.12) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "linear-gradient(to bottom, black 20%, transparent 90%)",
        }}
      />

      <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] max-w-7xl items-center px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
        <div className="grid w-full items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6 xl:col-span-5">
            <HeroContent />
          </div>

          <div className="lg:col-span-6 xl:col-span-7">
            <HeroIllustration />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
