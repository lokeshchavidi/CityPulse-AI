import { Loader2 } from "lucide-react";

const variants = {
  primary:
    "bg-brand-700 text-white shadow-soft-sm hover:brightness-110 hover:shadow-soft-md focus-visible:ring-offset-[var(--ring-offset)]",

  secondary:
    "border border-brand-200 bg-brand-50 text-brand-800 hover:bg-brand-100 focus-visible:ring-offset-[var(--ring-offset)]",

  outline:
    "border border-slate-300 bg-surface text-slate-700 hover:border-brand-600 hover:bg-brand-50 hover:text-brand-800 focus-visible:ring-offset-[var(--ring-offset)]",

  ghost:
    "bg-transparent text-slate-700 hover:bg-slate-100 focus-visible:ring-offset-[var(--ring-offset)]",

  danger:
    "bg-red-700 text-white shadow-soft-sm hover:bg-red-800 hover:shadow-soft-md focus-visible:ring-offset-[var(--ring-offset)]",
}

const sizes = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

const Button = ({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  fullWidth = false,
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`
        inline-flex
        items-center
        justify-center
        gap-2
        rounded-lg
        whitespace-nowrap
        font-semibold
        tracking-tight
        transition-all
        duration-200
        focus:outline-none
        focus-visible:ring-2
        focus-visible:ring-brand-600/30
        focus-visible:ring-offset-2
        active:scale-[0.98]
        disabled:pointer-events-none
        disabled:opacity-60
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <Loader2 size={18} className="animate-spin" aria-hidden="true" />
      ) : (
        leftIcon
      )}

      <span>{children}</span>

      {!loading && rightIcon}
    </button>
  );
};

export default Button;
