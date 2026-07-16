import { Loader2 } from "lucide-react";

const variants = {
  primary: "bg-blue-700 text-white shadow-sm hover:bg-blue-800 hover:shadow-md",

  secondary:
    "border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100",

  outline:
    "border border-slate-300 bg-white text-slate-700 hover:border-blue-600 hover:bg-blue-50 hover:text-blue-700",

  ghost: "bg-transparent text-slate-700 hover:bg-slate-100",

  danger: "bg-red-600 text-white shadow-sm hover:bg-red-700 hover:shadow-md",
};

const sizes = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-7 text-base",
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
        rounded-xl
        whitespace-nowrap
        font-medium
        transition-all
        duration-200
        focus:outline-none
        focus:ring-2
        focus:ring-blue-200
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
      {loading ? <Loader2 size={18} className="animate-spin" /> : leftIcon}

      <span>{children}</span>

      {!loading && rightIcon}
    </button>
  );
};

export default Button;
