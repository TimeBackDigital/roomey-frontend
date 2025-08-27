import { OnboardingSchema, OnboardingStep } from "./type";

export const providers = (
  handleSignInSocial: (type: "google" | "apple") => void
) => [
  {
    name: "Google",
    icon: null,
    onClick: () => handleSignInSocial("google"),
  },
  {
    name: "Apple",
    icon: null,
    onClick: () => handleSignInSocial("apple"),
  },
];

export const PUBLIC_ROUTES = new Set(["/auth", "/"]);
export const ONBOARDING_ROUTE = "/onboarding";
export const OTP_ROUTE = ["/otp-verification", "/email-verification"];
export const ROLE_PREFIX = /^\/(admin|s|m|l)(\/|$)/;

export const profilePhotoStep: OnboardingStep = {
  id: "profile-photo",
  title: "Add a profile photo",
  description: "Upload a profile photo to make your account more personal.",
  fields: [
    { name: "photo", label: "Profile Photo", type: "file", required: false },
  ],
  actions: [
    { label: "Choose a photo", type: "next" },
    { label: "Take a photo", type: "next" },
    { label: "Skip for now", type: "skip" },
  ],
};

const verificationStep: OnboardingStep = {
  id: "verification",
  title: "Verified",
  description: "Your account has been successfully verified.",
  actions: [{ label: "Start exploring", type: "submit" }],
};

const seekerOnboarding: OnboardingSchema = {
  role: "seeker",
  steps: [
    profilePhotoStep,
    {
      id: "permissions",
      title: "Profile set up",
      fields: [
        {
          name: "allowMarketing",
          label: "I agree to receive marketing emails",
          type: "checkbox",
        },
        {
          name: "allowVerification",
          label: "Verify and communicate through the Roomey platform",
          type: "checkbox",
          required: true,
        },
      ],
      actions: [{ label: "Save", type: "next" }],
    },
  ],
};

const listerOnboarding: OnboardingSchema = {
  role: "lister",
  steps: [
    {
      id: "create-account",
      title: "Create Account",
      fields: [
        {
          name: "propertyName",
          label: "Property Name",
          type: "text",
          required: true,
        },
      ],
      actions: [{ label: "Create account", type: "next" }],
    },
    profilePhotoStep,
    {
      id: "permissions",
      title: "Profile set up",
      fields: [
        {
          name: "allowMarketing",
          label: "I agree to receive marketing emails",
          type: "checkbox",
        },
        {
          name: "allowVerification",
          label: "Verify and communicate through the Roomey platform",
          type: "checkbox",
          required: true,
        },
      ],
      actions: [{ label: "Save", type: "next" }],
    },
    {
      ...verificationStep,
      actions: [{ label: "Start Listing", type: "submit" }],
    },
  ],
};

const agencyOnboarding: OnboardingSchema = {
  role: "agency",
  steps: [
    profilePhotoStep,
    {
      id: "permissions",
      title: "Profile set up",
      fields: [
        {
          name: "allowMarketing",
          label: "I agree to receive marketing emails",
          type: "checkbox",
        },
        {
          name: "allowVerification",
          label: "Verify and communicate through the Roomey platform",
          type: "checkbox",
          required: true,
        },
      ],
      actions: [{ label: "Save", type: "next" }],
    },
    {
      ...verificationStep,
      actions: [{ label: "Start Listing", type: "submit" }],
    },
  ],
};

export const onboardingSchemas: OnboardingSchema[] = [
  seekerOnboarding,
  listerOnboarding,
  agencyOnboarding,
];

export const RoleList = [
  {
    label: "Admin",
    value: "admin",
  },
  {
    label: "Seeker",
    value: "seeker",
  },
  {
    label: "Lister",
    value: "lister",
  },
  {
    label: "Agency",
    value: "agency",
  },
];

export const AdminModalData: Record<
  "promote" | "changePassword" | "ban" | "createUser",
  { title: string; description: string; button: string }
> = {
  promote: {
    title: "Promote User Role",
    description: "Select a new role for this user.",
    button: "Promote",
  },
  changePassword: {
    title: "Change User Password",
    description: "Enter a new password for this user.",
    button: "Change Password",
  },
  ban: {
    title: "Ban User",
    description: "Are you sure you want to ban this user?",
    button: "Ban",
  },
  createUser: {
    title: "Create New User",
    description: "Fill in the details to create a new account.",
    button: "Create User",
  },
};
