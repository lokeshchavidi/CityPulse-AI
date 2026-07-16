const Textarea = ({
  label,
  name,
  value,
  onChange,
  placeholder = "",
  rows = 5,
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

      <textarea
        id={name}
        name={name}
        rows={rows}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`
          w-full
          resize-none
          rounded-xl
          border
          px-4
          py-3
          text-sm
          leading-6
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
      />

      {error && <p className="text-sm font-medium text-red-600">{error}</p>}
    </div>
  );
};

export default Textarea;
