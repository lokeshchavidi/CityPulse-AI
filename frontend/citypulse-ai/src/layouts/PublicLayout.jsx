import Navbar from "@/components/landing/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";

const PublicLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-canvas font-sans text-slate-900">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-surface focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-brand-800 focus:shadow-soft-md"
      >
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content" className="pt-20">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default PublicLayout;
