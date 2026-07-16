import { Link } from "react-router-dom";
import { Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

import Logo from "@/assets/logos/citypulse-logo-primary.svg";

const quickLinks = [
  { label: "Home", id: "home" },
  { label: "Platform", id: "platform" },
  { label: "AI Features", id: "features" },
  { label: "Departments", id: "departments" },
  { label: "Contact", id: "contact" },
];

const legalLinks = [
  { label: "Privacy Policy", to: "/privacy-policy" },
  { label: "Terms of Service", to: "/terms-of-service" },
  { label: "Accessibility", to: "/accessibility" },
];

const socialLinks = [
  { icon: FaFacebookF, label: "Facebook", href: "https://facebook.com" },
  { icon: FaTwitter, label: "Twitter", href: "https://twitter.com" },
  { icon: FaLinkedinIn, label: "LinkedIn", href: "https://linkedin.com" },
  { icon: FaInstagram, label: "Instagram", href: "https://instagram.com" },
];

const scrollToSection = (id) => {
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-slate-200 bg-slate-900 text-slate-300">
      <div className="pointer-events-none absolute -left-32 top-0 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link to="/" className="inline-flex items-center">
              <div className="bg-white px-1 border rounded-md">
                <img src={Logo} alt="CityPulse AI" className="h-12 w-auto" />
              </div>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">
              An AI-assisted civic complaint platform helping citizens report
              issues and municipal departments resolve them faster, with
              complete human oversight.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/60 px-4 py-2 text-xs font-semibold text-slate-300">
              <ShieldCheck size={16} className="text-blue-400" />
              Government-Grade Security
            </div>

            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-slate-800/60 text-slate-300 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:bg-blue-600 hover:text-white"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              Explore
            </h3>

            <ul className="mt-5 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-sm text-slate-400 transition-colors hover:text-blue-400"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Portal Access */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              Portal Access
            </h3>

            <ul className="mt-5 space-y-3">
              <li>
                <Link
                  to="/login"
                  className="text-sm text-slate-400 transition-colors hover:text-blue-400"
                >
                  Citizen Login
                </Link>
              </li>

              <li>
                <Link
                  to="/register"
                  className="text-sm text-slate-400 transition-colors hover:text-blue-400"
                >
                  Citizen Registration
                </Link>
              </li>

              <li>
                <Link
                  to="/officer/login"
                  className="text-sm text-slate-400 transition-colors hover:text-blue-400"
                >
                  Officer Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              Contact
            </h3>

            <ul className="mt-5 space-y-4">
              <li className="flex items-start gap-3 text-sm text-slate-400">
                <Phone size={16} className="mt-0.5 shrink-0 text-blue-400" />
                1800-123-4567
              </li>

              <li className="flex items-start gap-3 text-sm text-slate-400">
                <Mail size={16} className="mt-0.5 shrink-0 text-blue-400" />
                support@citypulse.gov.in
              </li>

              <li className="flex items-start gap-3 text-sm text-slate-400">
                <MapPin size={16} className="mt-0.5 shrink-0 text-blue-400" />
                Municipal Corporation HQ, Hyderabad
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 sm:flex-row">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} CityPulse AI. All Rights Reserved.
          </p>

          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {legalLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className="text-xs text-slate-500 transition-colors hover:text-blue-400"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
