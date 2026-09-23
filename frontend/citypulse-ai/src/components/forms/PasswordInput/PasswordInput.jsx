import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import Input from "@/components/forms/Input";

const PasswordInput = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  placeholder = "Enter password",
  error,
  required = false,
  disabled = false,
  autoComplete = "current-password",
  className = "",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Input
      label={label}
      name={name}
      type={showPassword ? "text" : "password"}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      error={error}
      required={required}
      disabled={disabled}
      autoComplete={autoComplete}
      className={className}
      trailing={
        <button
          type="button"
          onClick={() => setShowPassword((previous) => !previous)}
          className="flex h-8 w-8 items-center justify-center rounded-md text-slate-500 transition-colors duration-200 hover:bg-slate-100 hover:text-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600/30"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeOff size={18} aria-hidden="true" />
          ) : (
            <Eye size={18} aria-hidden="true" />
          )}
        </button>
      }
      {...props}
    />
  );
};

export default PasswordInput;
