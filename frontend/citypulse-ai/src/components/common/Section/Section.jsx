import Container from "@/components/common/Container/Container";

const Section = ({
  id,
  children,
  className = "",
  containerClassName = "",
  tone = "default",
}) => {
  const tones = {
    default: "bg-surface",
    muted: "bg-canvas",
    brand: "bg-brand-50/40",
  };

  return (
    <section
      id={id}
      className={`py-16 sm:py-20 lg:py-24 ${tones[tone] ?? tones.default} ${className}`}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
};

export default Section;
