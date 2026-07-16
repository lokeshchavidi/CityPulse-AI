import Container from "@/components/common/Container/Container";

const Section = ({ id, children, className = "", containerClassName = "" }) => {
  return (
    <section id={id} className={`py-24 lg:py-32 ${className}`}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
};

export default Section;
