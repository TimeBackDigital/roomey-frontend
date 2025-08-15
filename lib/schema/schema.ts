import { phoneNumber } from "better-auth/plugins";
import { z } from "zod";

export const phoneRegex = /^[+]?[\d\s\-().]{7,20}$/;

export const LoginSchema = z.object({
  type: z.literal("login"),
  identifier: z.string().min(1, "Required field").max(50).trim(),
  password: z.string().min(6, "Required field").max(25).trim(),
});

export const RegisterSchema = z.object({
  type: z.literal("register"),
  displayName: z.string().min(1, "Display name is required"),
  email: z.email("Invalid email"),
  phoneNumber: z.string().regex(phoneRegex, "Invalid phone number"),
  password: z.string().min(6, "Password must be at least 6 characters").max(25),
});

export const UnionSchema = z.discriminatedUnion("type", [
  LoginSchema,
  RegisterSchema,
]);

export const ForgotPasswordSchema = z.object({
  email: z.email(),
});

export const OtpVerificationSchema = z.object({
  otp: z.string().min(6, "OTP must be 6 digits"),
});

export const OtpVerificationPhoneSchema = z.object({
  phoneNumber: phoneNumber(),
});

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

export const SeekerSchema = z.object({
  profilePhoto: z.instanceof(File),
  allowMarketing: z.boolean(),
  allowVerification: z.boolean(),
  role: z.literal("seeker"),
});

export const ListerSchema = z.object({
  profilePhoto: z.instanceof(File),
  allowMarketing: z.boolean(),
  allowVerification: z.boolean(),
  propertyName: z.string(),
  role: z.literal("lister"),
});

export const AgencySchema = z.object({
  agencyName: z.string(),
  agencyLicense: z.string(),
  allowMarketing: z.boolean(),
  allowVerification: z.boolean(),
  role: z.literal("agency"),
});

export const schemaByRole = {
  seeker: {
    schema: SeekerSchema,
    totalSteps: 2,
    redirectTo: "/",
  },
  lister: {
    schema: ListerSchema,
    totalSteps: 2,
    redirectTo: "/",
  },
  agency: {
    schema: AgencySchema,
    totalSteps: 3,
    redirectTo: "/",
  },
};

const AdminModalSchema = z.object({
  action: z
    .literal("promote")
    .or(z.literal("changePassword").or(z.literal("ban"))),
  userId: z.string().min(1, "User ID is required"),
  role: z.string().optional(),
  newPassword: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .optional(),
});

const CreateUserSchema = z
  .object({
    action: z.literal("createUser"),
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const AdminMOdalFormSchema = z.discriminatedUnion("action", [
  AdminModalSchema,
  CreateUserSchema,
]);

export type AdminFormValues = z.infer<typeof AdminMOdalFormSchema>;
export type ResetPasswordSchemaType = z.infer<typeof ResetPasswordSchema>;
export type UnionSchemaType = z.infer<typeof UnionSchema>;
export type LoginSchemaType = z.infer<typeof LoginSchema>;
export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
export type ForgotPasswordSchemaType = z.infer<typeof ForgotPasswordSchema>;
export type OtpVerificationPhoneSchemaType = z.infer<
  typeof OtpVerificationPhoneSchema
>;
export type OtpVerificationSchemaType = z.infer<typeof OtpVerificationSchema>;
