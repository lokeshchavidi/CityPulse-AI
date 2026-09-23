import { Link } from "react-router-dom";
import { Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

import LightPlate from "@/components/common/LightPlate";
import Logo from "@/assets/logos/citypulse-logo-primary.svg";

const quickLinks = [
  { label: "Home", id: "home" },
  { label: "Platform", id: "platform" },
  { label: "Capabilities", id: "features" },
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
    <footer className="border-t border-slate-200 bg-surface text-slate-600">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Link to="/" className="inline-flex items-center gap-3">
              <LightPlate padding="sm" rounded="rounded-md">
                <img src={Logo} alt="CityPulse AI" className="h-10 w-auto" />
              </LightPlate>
              <span className="text-lg font-bold tracking-tight text-slate-900">
                CityPulse AI
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-500">
              AI-assisted civic complaint management for municipal corporations
              and smart city departments — with complete human oversight.
            </p>

            <div className="mt-5 inline-flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600">
              <ShieldCheck size={15} className="text-brand-500" aria-hidden="true" />
              Government-grade security
            </div>

            <div className="mt-6 flex items-center gap-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-600 transition duration-200 hover:border-brand-500 hover:bg-brand-700 hover:text-white"
                  >
                    <Icon size={15} aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-900">
              Explore
            </h3>

            <ul className="mt-5 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(link.id)}
                    className="text-sm text-slate-500 transition-colors hover:text-slate-900"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-900">
              Portal Access
            </h3>

            <ul className="mt-5 space-y-3">
              <li>
                <Link
                  to="/login"
                  className="text-sm text-slate-500 transition-colors hover:text-slate-900"
                >
                  Citizen Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="text-sm text-slate-500 transition-colors hover:text-slate-900"
                >
                  Citizen Registration
                </Link>
              </li>
              <li>
                <Link
                  to="/officer/login"
                  className="text-sm text-slate-500 transition-colors hover:text-slate-900"
                >
                  Staff Portal
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-900">
              Contact
            </h3>

            <ul className="mt-5 space-y-4">
              <li className="flex items-start gap-3 text-sm text-slate-500">
                <Phone size={16} className="mt-0.5 shrink-0 text-brand-500" aria-hidden="true" />
                1800-123-4567
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-500">
                <Mail size={16} className="mt-0.5 shrink-0 text-brand-500" aria-hidden="true" />
                support@citypulse.gov.in
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-500">
                <MapPin size={16} className="mt-0.5 shrink-0 text-brand-500" aria-hidden="true" />
                Municipal Corporation HQ, Hyderabad
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 sm:flex-row">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} CityPulse AI. All rights reserved.
          </p>

          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {legalLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className="text-xs text-slate-500 transition-colors hover:text-slate-800"
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
