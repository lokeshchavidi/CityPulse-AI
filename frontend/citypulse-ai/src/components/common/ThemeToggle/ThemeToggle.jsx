import { Monitor, Moon, Sun } from "lucide-react";

import useTheme from "@/hooks/useTheme";

const modes = [
  { id: "light", label: "Light", icon: Sun },
  { id: "dark", label: "Dark", icon: Moon },
  { id: "system", label: "System", icon: Monitor },
];

/**
 * Compact theme control.
 * - `variant="icon"`: cycles light ↔ dark (topbar)
 * - `variant="segmented"`: light / dark / system (optional denser UI)
 */
const ThemeToggle = ({ variant = "icon", className = "" }) => {
  const { preference, resolved, setTheme, toggleTheme } = useTheme();

  if (variant === "segmented") {
    return (
      <div
        role="group"
        aria-label="Color theme"
        className={`inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-canvas p-1 ${className}`}
      >
        {modes.map(({ id, label, icon: Icon }) => {
          const active = preference === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => setTheme(id)}
              aria-pressed={active}
              title={label}
              className={`inline-flex h-8 items-center gap-1.5 rounded-md px-2.5 text-xs font-semibold transition ${
                active
                  ? "bg-surface text-slate-900 shadow-soft-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <Icon size={14} aria-hidden="true" />
              <span className="hidden sm:inline">{label}</span>
            </button>
          );
        })}
      </div>
    );
  }

  const Icon = resolved === "dark" ? Sun : Moon;
  const label =
    resolved === "dark" ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className={`rounded-lg p-2.5 text-slate-600 transition hover:bg-brand-50 hover:text-brand-800 ${className}`}
    >
      <Icon size={20} aria-hidden="true" />
    </button>
  );
};

export default ThemeToggle;
