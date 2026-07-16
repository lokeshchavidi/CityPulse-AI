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

  const togglePasswordVisibility = () => {
    setShowPassword((previous) => !previous);
  };

  return (
    <div className={className}>
      <div className="relative">
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
          inputClassName="pr-12"
          {...props}
        />

        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-4 top-[52px] -translate-y-1/2 text-slate-500 transition-colors duration-200 hover:text-blue-600 focus:outline-none"
          tabIndex={-1}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
