const Input = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder = "",
  error = "",
  required = false,
  disabled = false,
  className = "",
  inputClassName = "",
  trailing = null,
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
          {required && (
            <span className="ml-1 text-red-600" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      <div className={trailing ? "relative" : undefined}>
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error ? `${name}-error` : undefined}
          className={`w-full rounded-lg border px-4 py-3 text-sm text-slate-800 outline-none transition-all duration-200
          ${trailing ? "pr-12" : ""}
          ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100"
              : "border-slate-300 focus:border-brand-600 focus:ring-2 focus:ring-brand-100"
          }
          ${disabled ? "cursor-not-allowed bg-slate-100 text-slate-400" : "bg-surface"}
          ${inputClassName}`}
          {...props}
        />

        {trailing && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {trailing}
          </div>
        )}
      </div>

      {error && (
        <p id={`${name}-error`} className="text-sm font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
