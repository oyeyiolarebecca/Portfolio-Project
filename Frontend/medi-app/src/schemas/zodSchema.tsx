import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string({ required_error: "Email is required" }).email(),
  password: z.string({ required_error: "Password is required" }),
});

export const RegistrationSchema = z.object({
  firstName: z.string({ required_error: "First name is required" }).min(1),
  lastName: z.string({ required_error: "Last name is required" }).min(1),
  dob: z.string({ required_error: "Date of birth is required" }).regex(
    /^\d{4}-\d{2}-\d{2}$/,
    "Invalid date format. Use YYYY-MM-DD"
  ),
  email: z.string({ required_error: "Email is required" }).email(),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password must be at least 6 characters"),
  role: z.enum(["USER", "ADMIN"], {
    required_error: "Role is required",
  }),
});
