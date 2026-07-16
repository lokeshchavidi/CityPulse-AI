import Navbar from "@/components/landing/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";

const PublicLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="pt-20">{children}</main>

      <Footer />
    </div>
  );
};

export default PublicLayout;
