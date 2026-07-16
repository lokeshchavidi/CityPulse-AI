const PasswordStrength = ({ strength }) => {
  const { label, color, percentage } = strength;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-600">
          Password Strength
        </span>

        <span className="text-sm font-semibold text-slate-700">{label}</span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-slate-200">
        <div
          className={`h-full rounded-full transition-all duration-500 ${color}`}
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
};

export default PasswordStrength;
