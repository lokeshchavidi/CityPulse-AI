import { ChevronDown } from "lucide-react";

const Select = ({
  label,
  name,
  value,
  onChange,
  options = [],
  placeholder = "Select an option",
  error = "",
  required = false,
  disabled = false,
  className = "",
  ...props
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-semibold text-slate-700"
        >
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}

      <div className="relative">
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`
            w-full
            appearance-none
            rounded-xl
            border
            px-4
            py-3
            pr-10
            text-sm
            text-slate-800
            transition-all
            duration-200
            outline-none

            ${
              error
                ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                : "border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            }

            ${
              disabled
                ? "cursor-not-allowed bg-slate-100 text-slate-400"
                : "bg-white"
            }
          `}
          {...props}
        >
          <option value="">{placeholder}</option>

          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <ChevronDown
          size={18}
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
        />
      </div>

      {error && <p className="text-sm font-medium text-red-600">{error}</p>}
    </div>
  );
};

export default Select;
