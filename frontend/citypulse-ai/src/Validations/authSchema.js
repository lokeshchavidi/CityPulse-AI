import { z } from "zod";

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()_+\-=[\]{};':"\\|,.<>/?]).{8,20}$/;

export const registerSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(2, "First name must be at least 2 characters.")
      .max(50, "First name cannot exceed 50 characters.")
      .regex(/^[A-Za-z]+$/, "Only alphabets are allowed."),

    lastName: z
      .string()
      .trim()
      .min(2, "Last name must be at least 2 characters.")
      .max(50, "Last name cannot exceed 50 characters.")
      .regex(/^[A-Za-z]+$/, "Only alphabets are allowed."),

    email: z.string().trim().email("Enter a valid email address."),

    phoneNumber: z
      .string()
      .trim()
      .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number."),

    password: z
      .string()
      .regex(PASSWORD_REGEX, "Password does not meet the required criteria."),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

export const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),

  password: z.string().min(1, "Password is required."),
});
