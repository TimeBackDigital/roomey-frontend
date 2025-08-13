import { phoneNumber } from "better-auth/plugins";
import { z } from "zod";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

export const LoginSchema = z.object({
  email: z.email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;

export const ForgotPasswordSchema = z.object({
  email: z.email(),
});

export type ForgotPasswordSchemaType = z.infer<typeof ForgotPasswordSchema>;

export const OtpVerificationSchema = z.object({
  otp: z.string().min(6, "OTP must be 6 digits"),
});

export const OtpVerificationPhoneSchema = z.object({
  phoneNumber: phoneNumber(),
});

export type OtpVerificationPhoneSchemaType = z.infer<
  typeof OtpVerificationPhoneSchema
>;

export type OtpVerificationSchemaType = z.infer<typeof OtpVerificationSchema>;

export const ResetPasswordSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ResetPasswordSchemaType = z.infer<typeof ResetPasswordSchema>;

export const RegisterSchema = z.object({
  displayName: z.string().min(1, "Display name is required"),
  email: z.email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phoneNumber: z.string().regex(phoneRegex, "Invalid phone number"),
});

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;

// export const registerSchema = z.object({
//   email: z.string().email(),
//   password: z.string().min(8),
// });
