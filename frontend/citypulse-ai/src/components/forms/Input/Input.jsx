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

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        className={`w-full rounded-xl border px-4 py-3 text-sm text-slate-800 outline-none transition-all duration-200
        ${
          error
            ? "border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-100"
            : "border-slate-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
        }
        ${disabled ? "cursor-not-allowed bg-slate-100" : "bg-white"}
        ${inputClassName}`}
        {...props}
      />

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Input;
