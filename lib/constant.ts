import { FieldConfig, OnboardingSchema, OnboardingStep } from "./type";

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

export const REQUIRED = "This field is required";
export const INVALID = "Invalid input";
export const INVALID_NUM = "Please enter a valid number";
export const INVALID_DATE = "Please select a valid date";
export const INVALID_OPT = "Please select a valid option";

export const stepForm = [
  {
    step: 1,
    title: "Property & Location",
    description:
      "Let’s help you find the perfect home! \n Tell us what you're looking for in your \n next home.",
  },
  {
    step: 2,
    title: "Home Details & Access",
    description:
      "Choose your room comforts—privacy, bathroom, furnishing, parking, and any accessibility needs.",
  },
  {
    step: 3,
    title: "About Me",
    description:
      "Add a clear photo and a few lines about you to help others connect safely",
  },

  {
    step: 4,
    title: "Living Preferences",
    description:
      "Tell us the house vibe you enjoy,housemates, guests, pets, smoking, cleaning, deal-breakers.",
  },
];

export const seekerStepFields: Record<number, FieldConfig[]> = {
  1: [
    {
      name: "preferred_area",
      label: "Preferred Area",
      placeholder: "Search for suburb/area",
      required: true,
      type: "text",
    },

    {
      name: "budget_amount",
      label: "Budget",
      placeholder: "250",
      required: true,
      type: "number",
    },
    {
      name: "budget_unit",
      label: "",
      placeholder: "Select",
      type: "select",
      options: [
        { label: "per week", value: "per_week" },
        { label: "per month", value: "per_month" },
        { label: "per year", value: "per_year" },
      ],
    },
    {
      name: "bills_included",
      label: "Bills Included",
      required: true,
      placeholder: "Select",
      type: "radio group",
      isRow: true,
      options: [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" },
      ],
    },
    {
      name: "property_type_preference",
      label: "Property Type Preference",
      placeholder: "Select",
      type: "radio group",
      isRow: false,
      required: true,
      options: [
        { label: "House", value: "house" },
        { label: "Apartment", value: "apartment" },
        { label: "Unit", value: "unit" },
        { label: "Townhouse", value: "townhouse" },
        { label: "Granny Flat", value: "granny_flat" },
        { label: "Studio", value: "studio" },
      ],
    },
    {
      name: "move_in_date",
      label: "Move‑in Date",
      placeholder: "Select",
      required: true,
      type: "date",
    },
  ],
  2: [
    {
      name: "room_setup",
      label: "Room Setup",
      required: true,
      type: "radio group",
      options: [
        { label: "Private Room", value: "private" },
        { label: "Shared Room", value: "shared" },
      ],
    },
    {
      name: "bathroom_type",
      label: "Bathroom",
      required: true,
      type: "radio group",
      options: [
        { label: "Shared", value: "shared" },
        { label: "Private", value: "private" },
        { label: "No Preference", value: "no_preference" },
      ],
    },
    {
      name: "furnishing",
      label: "Furnishing",
      required: true,
      type: "radio group",
      options: [
        { label: "Furnished", value: "furnished" },
        { label: "Unfurnished", value: "un_furnished" },
        { label: "No Preference", value: "no_preference" },
      ],
    },
    {
      name: "parking_space",
      label: "Parking Space",
      required: true,
      type: "radio group",
      options: [
        { label: "Secured Garage", value: "small" },
        { label: "Covered Carport", value: "medium" },
        { label: "Driveway Parking", value: "large" },
        { label: "Street Parking", value: "street_parking" },
        { label: "Permit Parking", value: "permit_parking" },
        { label: "No Parking Needed", value: "no_parking_needed" },
      ],
    },
    {
      name: "accessibility",
      label: "Accessibility",
      required: true,
      type: "radio group",
      description: "Only select if you have specific accessibility needs.",
      options: [
        { label: "Wheelchair Access", value: "wheelchair_access" },
        { label: "Ground Floor", value: "ground_floor" },
      ],
    },
  ],
  // 3) About Me
  3: [
    {
      name: "profile_photo",
      label: "Profile Photo",
      required: true,
      placeholder: "Upload a clear photo",
      type: "file",
    },
    {
      name: "date_of_birth",
      label: "Date of Birth",
      required: true,
      type: "date",
    },
    {
      name: "occupation",
      label: "Occupation",
      type: "radio group",
      isRow: true,
      required: true,
      options: [
        { label: "Employed", value: "employed" },
        { label: "Student", value: "student" },
        { label: "Self-Employed", value: "self_employed" },
        { label: "Unemployed", value: "unemployed" },
        { label: "Retired", value: "retired" },
      ],
    },
    {
      name: "gender",
      label: "Gender",
      type: "radio group",
      required: true,
      options: [
        { label: "Female", value: "female" },
        { label: "Male", value: "male" },
        { label: "Non‑binary", value: "non_binary" },
        { label: "Prefer not to say", value: "prefer_not_to_say" },
      ],
    },
    {
      name: "who_will_be_moving_into_the_room",
      label: "Who will be moving into the room?",
      type: "radio group",
      required: true,
      options: [
        { label: "Just Me", value: "just_me" },
        { label: "My Partner and I", value: "partner_and_i" },
        { label: "Me and a Friend", value: "me_and_a_friend" },
        { label: "Other", value: "other" },
      ],
    },
    {
      name: "do_you_have_pets",
      label: "Do you have pets?",
      type: "radio group",
      isRow: true,
      required: true,
      options: [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" },
      ],
    },
    {
      name: "do_you_smoke",
      label: "Do you smoke?",
      type: "radio group",
      required: true,
      options: [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" },
        { label: "Vape Only", value: "vape_only" },
      ],
    },
    {
      name: "tell_us_a_bit_about_your_lifestyle",
      label: "Tell us a bit about yourself",
      placeholder: "Work, study, hobbies, or your typical routine…",
      type: "textarea",
      required: true,
    },
    {
      name: "what_are_you_looking_for_in_a_home_and_housemates",
      label: "What are you looking for in a home and housemates?",
      placeholder: "What are you looking for in a homeand housemates?",
      type: "textarea",
      required: true,
    },
    {
      name: "how_do_you_see_yourself_contributing_as_a_housemate",
      label: "How do you see yourself contributing as a housemate?",
      placeholder: "Chores, friendliness, reliability, what you bring…",
      type: "textarea",
      required: true,
    },
  ],
  4: [
    {
      name: "deal_breakers",
      label: "Deal-Breakers",
      description:
        "Non-negotiable requirements. You won't be matched with places that don't meet these.",
      type: "checkbox",
      required: true,
      options: [
        { label: "Quiet Environment", value: "quiet_environment" },
        { label: "Male Only Household", value: "male_only_household" },
        { label: "Female Only Household", value: "female_only_household" },
        { label: "LGBTQ+ Friendly", value: "lgbtq_friendly_required" },
        { label: "No Smoking Anywhere", value: "no_smoking_anywhere" },
      ],
    },

    {
      name: "housemate_age_range",
      label: "Housemate Age Range",
      type: "radio group",
      required: true,
      options: [
        { label: "18–25", value: "18_25" },
        { label: "26–35", value: "26_35" },
        { label: "36–45", value: "36_45" },
        { label: "46+ / Mixed", value: "46_plus_or_mixed" },
      ],
    },

    {
      name: "housemate_preference",
      label: "Housemate Preference",
      type: "radio group",
      required: true,
      options: [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
        { label: "Either", value: "either" },
        { label: "Couple", value: "couple" },
        { label: "No Couple", value: "no_couple" },
      ],
    },

    {
      name: "open_to_pets",
      label: "Are you Open to Living with a Pet?",
      type: "radio group",
      required: true,
      options: [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" },
        { label: "Depends", value: "depends" },
      ],
    },
    {
      name: "smoking_rules",
      label: "Smoking rules I prefer:",
      type: "radio group",
      required: true,
      options: [
        { label: "Not Allowed", value: "not_allowed" },
        { label: "Allowed Outside Only", value: "outside_only" },
        { label: "Allowed Inside", value: "allowed_inside" },
        { label: "Vaping Only", value: "vaping_only" },
      ],
    },
    {
      name: "guests_policy",
      label: "Guests",
      type: "radio group",
      required: true,
      options: [
        { label: "No Restrictions", value: "no_restrictions" },
        { label: "Guests Welcome", value: "guests_welcome" },
        { label: "Daytime Visitors Only", value: "daytime_only" },
        { label: "Occasionally", value: "occasionally" },
        { label: "Not Allowed", value: "not_allowed" },
      ],
    },
    {
      name: "cleaning_arrangements",
      label: "Cleaning Arrangements",
      type: "radio group",
      required: true,
      options: [
        { label: "Clean-As-You-Go", value: "clean_as_you_go" },
        { label: "Cleaning Roster", value: "cleaning_roster" },
        { label: "Professional Cleaner", value: "professional_cleaner" },
      ],
    },
    {
      name: "other_house_rules",
      label: "Other House Rules",
      type: "radio group",
      required: true,
      options: [
        { label: "Quiet Hours 10pm–7am", value: "quiet_hours_10_7" },
        {
          label: "Shared Responsibility For Common Areas",
          value: "shared_common_areas",
        },
      ],
    },
    {
      name: "preferences",
      label: "Preference",
      description:
        "Nice-to-have features that would make your living experience better.",
      type: "checkbox",
      required: true,
      options: [
        { label: "Air Conditioning", value: "air_conditioning" },
        { label: "Outdoor Space/Garden", value: "outdoor_space" },
        { label: "Modern Kitchen", value: "modern_kitchen" },
        { label: "Natural Light", value: "natural_light" },
        { label: "Fast Internet/Wi-Fi", value: "fast_internet" },
        { label: "Near Public Transport", value: "near_public_transport" },
        { label: "Furnished Room", value: "furnished_room" },
        { label: "Washing Machine", value: "washing_machine" },
      ],
    },
  ],
};
