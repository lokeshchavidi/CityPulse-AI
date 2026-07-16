import { CheckCircle2, XCircle } from "lucide-react";

const ChecklistItem = ({ passed, label }) => (
  <div className="flex items-center gap-2">
    {passed ? (
      <CheckCircle2 size={18} className="text-green-600" />
    ) : (
      <XCircle size={18} className="text-slate-400" />
    )}

    <span className={`text-sm ${passed ? "text-green-700" : "text-slate-500"}`}>
      {label}
    </span>
  </div>
);

const PasswordChecklist = ({ requirements }) => {
  return (
    <div className="space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-4">
      <ChecklistItem
        passed={requirements.minLength}
        label="Minimum 8 characters"
      />

      <ChecklistItem
        passed={requirements.maxLength}
        label="Maximum 20 characters"
      />

      <ChecklistItem
        passed={requirements.uppercase}
        label="One uppercase letter"
      />

      <ChecklistItem
        passed={requirements.lowercase}
        label="One lowercase letter"
      />

      <ChecklistItem passed={requirements.number} label="One number" />

      <ChecklistItem
        passed={requirements.specialCharacter}
        label="One special character"
      />
    </div>
  );
};

export default PasswordChecklist;
