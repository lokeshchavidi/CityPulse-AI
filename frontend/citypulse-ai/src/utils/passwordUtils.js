import zxcvbn from "zxcvbn";

export const getPasswordStrength = (password) => {
  if (!password) {
    return {
      score: 0,
      label: "Very Weak",
      color: "bg-slate-300",
      percentage: 0,
    };
  }

  const result = zxcvbn(password);

  const strengthMap = [
    {
      label: "Very Weak",
      color: "bg-red-500",
      percentage: 20,
    },
    {
      label: "Weak",
      color: "bg-orange-500",
      percentage: 40,
    },
    {
      label: "Fair",
      color: "bg-yellow-500",
      percentage: 60,
    },
    {
      label: "Good",
      color: "bg-blue-500",
      percentage: 80,
    },
    {
      label: "Strong",
      color: "bg-green-600",
      percentage: 100,
    },
  ];

  return {
    score: result.score,
    ...strengthMap[result.score],
  };
};

export const getPasswordRequirements = (password = "") => ({
  minLength: password.length >= 8,

  maxLength: password.length <= 20,

  uppercase: /[A-Z]/.test(password),

  lowercase: /[a-z]/.test(password),

  number: /\d/.test(password),

  specialCharacter: /[@$!%*?&^#()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
});
