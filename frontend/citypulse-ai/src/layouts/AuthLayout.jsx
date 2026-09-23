import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";

import LightPlate from "@/components/common/LightPlate";
import ThemeToggle from "@/components/common/ThemeToggle";
import Logo from "@/assets/logos/citypulse-logo-primary.svg";
import CitizenReport from "@/assets/illustrations/citizen-report.svg";
import LoginSecurity from "@/assets/illustrations/login-security.svg";
import GovernmentDashboard from "@/assets/illustrations/government-dashboard.svg";

const PORTAL_COPY = {
  citizen: {
    eyebrow: "Citizen Portal",
    headline: "Report civic issues and track every resolution.",
    description:
      "Secure access for residents to submit complaints, follow progress, and receive lifecycle updates.",
    illustration: CitizenReport,
    alt: "Citizen reporting a civic issue",
    points: [
      "File geo-tagged complaints in minutes",
      "Track status from intake to closure",
      "Receive notifications at every stage",
    ],
  },
  staff: {
    eyebrow: "Staff Portal",
    headline: "Operate municipal complaint workflows with clarity.",
    description:
      "Secure access for officers, department managers, and administrators managing city operations.",
    illustration: GovernmentDashboard,
    alt: "Government operations dashboard",
    points: [
      "Review AI recommendations with oversight",
      "Assign and resolve field work efficiently",
      "Monitor department performance in real time",
    ],
  },
  register: {
    eyebrow: "Citizen Registration",
    headline: "Create your account to engage with your city.",
    description:
      "Register once to report issues and stay informed as departments act on your complaints.",
    illustration: LoginSecurity,
    alt: "Secure citizen account registration",
    points: [
      "Self-register as a verified citizen",
      "Staff accounts are provisioned by admins",
      "Your data stays protected and auditable",
    ],
  },
};

const AuthLayout = ({ children, portal = "citizen" }) => {
  const content = PORTAL_COPY[portal] ?? PORTAL_COPY.citizen;

  return (
    <div className="min-h-screen bg-canvas font-sans text-slate-900 [scrollbar-gutter:stable]">
      <a
        href="#auth-form"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-surface focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-brand-800 focus:shadow-soft-md"
      >
        Skip to form
      </a>

      <header className="border-b border-slate-200 bg-surface">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
          <Link to="/" className="flex items-center" aria-label="CityPulse AI home">
            <LightPlate padding="sm" rounded="rounded-lg">
              <img
                src={Logo}
                alt="CityPulse AI"
                className="h-11 w-auto object-contain sm:h-12"
              />
            </LightPlate>
          </Link>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 sm:text-sm">
              <ShieldCheck size={16} className="text-brand-700" aria-hidden="true" />
              <span className="hidden sm:inline">Secure government access</span>
              <span className="sm:hidden">Secure access</span>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl lg:grid-cols-2">
        {/* Brand panel — sticky + viewport height so form growth never shifts it */}
        <aside className="relative sticky top-16 hidden h-[calc(100vh-4rem)] overflow-hidden border-r border-slate-200 bg-gradient-to-br from-slate-50 via-brand-50 to-canvas lg:flex lg:flex-col lg:justify-center lg:gap-8 lg:px-10 lg:py-10 xl:px-14">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(rgba(148,163,184,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.12) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
              maskImage: "linear-gradient(to bottom, black 10%, transparent 85%)",
            }}
          />

          <div className="relative shrink-0">
            <span className="inline-flex items-center rounded-md border border-brand-200 bg-brand-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-800">
              {content.eyebrow}
            </span>

            <h1 className="mt-5 max-w-md text-3xl font-bold tracking-tight text-slate-900 xl:text-4xl xl:leading-tight">
              {content.headline}
            </h1>

            <p className="mt-4 max-w-md text-base leading-relaxed text-slate-600">
              {content.description}
            </p>

            <ul className="mt-6 space-y-3">
              {content.points.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 text-sm font-medium text-slate-700"
                >
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-700"
                    aria-hidden="true"
                  />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center">
            <LightPlate
              padding="lg"
              rounded="rounded-2xl"
              className="w-full max-w-sm xl:max-w-md"
            >
              <img
                src={content.illustration}
                alt={content.alt}
                className="max-h-full w-full object-contain"
                draggable={false}
              />
            </LightPlate>
          </div>
        </aside>

        {/* Form panel */}
        <section className="flex items-start justify-center px-5 py-10 sm:px-8 sm:py-12 lg:px-10 xl:px-16">
          <div id="auth-form" className="w-full max-w-md">
            {children}
          </div>
        </section>
      </main>
    </div>
  );
};

export default AuthLayout;
