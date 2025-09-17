import { FieldConfig, OnboardingStep } from "./type";

export const SEEKER = "seeker";
export const LISTER = "lister";
export const ADMIN = "admin";

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

export const AGE_MAP = {
  "18_25": { min: 18, max: 25 },
  "26_35": { min: 26, max: 35 },
  "36_45": { min: 36, max: 45 },
  "46_plus_or_mixed": { min: 46, max: null }, // or { min: null, max: null } if you prefer
} as const;

export const seekerStepForm = [
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
      name: "price_range_min",
      label: "Price Range",
      placeholder: "Rent Min",
      required: true,
      type: "number",
    },
    {
      name: "price_range_max",
      label: "Price Range",
      placeholder: "Rent Max",
      required: true,
      hidden: true,
      type: "number",
    },
    {
      name: "payment_frequency",
      label: "Payment Frequency",
      placeholder: "Select",
      type: "select",
      required: true,
      options: [
        { label: "per week", value: "per week" },
        { label: "per month", value: "per month" },
        { label: "per year", value: "per year" },
      ],
    },
    {
      name: "is_bills_included",
      label: "Bills Included",
      required: true,
      placeholder: "Select",
      type: "radio group",
      isRow: true,
      options: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
      ],
    },
    {
      name: "property_types",
      label: "Property Type Preference",
      placeholder: "Select",
      type: "checkbox",
      isRow: false,
      required: true,
      options: [
        { label: "House", value: "house" },
        { label: "Apartment", value: "apartment" },
        { label: "Unit", value: "unit" },
        { label: "Townhouse", value: "townhouse" },
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
      name: "room_set_ups",
      label: "Room Setup",
      required: true,
      type: "checkbox",
      options: [
        { label: "Private Room", value: "Private Room" },
        { label: "Shared Room", value: "Shared Room" },
      ],
    },
    {
      name: "bathroom",
      label: "Bathroom",
      required: true,
      type: "radio group",
      options: [
        { label: "Shared", value: "Private" },
        { label: "Private", value: "Shared" },
        { label: "No Preference", value: "No Preference" },
      ],
    },
    {
      name: "furnishing",
      label: "Furnishing",
      required: true,
      type: "radio group",
      options: [
        { label: "Furnished", value: "Furnished" },
        { label: "Unfurnished", value: "Unfurnished" },
        { label: "No Preference", value: "No Preference" },
      ],
    },
    {
      name: "parking_spaces",
      label: "Parking Space",
      required: true,
      type: "checkbox",
      options: [
        { label: "Secured Garage", value: "Secured Garage" },
        { label: "Covered Carport", value: "Covered Carport" },
        { label: "Driveway Parking", value: "Driveway Parking" },
        { label: "Street Parking", value: "Street Parking" },
        { label: "Permit Parking", value: "Permit Parking" },
        { label: "No Parking Needed", value: "No Parking Needed" },
      ],
    },
    {
      name: "accessibility",
      label: "Accessibility",
      required: true,
      type: "radio group",
      description: "Only select if you have specific accessibility needs.",
      options: [
        { label: "Wheelchair Access", value: "Wheelchair Access" },
        { label: "Ground Floor", value: "Ground Floor" },
      ],
    },
  ],
  // 3) About Me
  3: [
    {
      name: "photo_url",
      label: "Profile Photo",
      required: true,
      placeholder: "Upload a clear photo",
      type: "file",
    },
    {
      name: "birthday",
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
        { label: "Employed", value: "Employed" },
        { label: "Student", value: "Student" },
        { label: "Self-Employed", value: "Self Employed" },
        { label: "Unemployed", value: "Unemployed" },
        { label: "Retired", value: "Retired" },
      ],
    },
    {
      name: "gender",
      label: "Gender",
      type: "radio group",
      required: true,
      options: [
        { label: "Female", value: "Female" },
        { label: "Male", value: "Male" },
        { label: "Non‑binary", value: "Non-Binary" },
        { label: "Prefer not to say", value: "Prefer Not To Say" },
      ],
    },
    {
      name: "inclusion",
      label: "Who will be moving into the room?",
      type: "radio group",
      required: true,
      options: [
        { label: "Just Me", value: "Just Me" },
        { label: "My Partner and I", value: "My Partner and I" },
        { label: "Me and a Friend", value: "Me and a Friend" },
        { label: "Other", value: "Other" },
      ],
    },
    {
      name: "is_pets",
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
      name: "smoking_habit",
      label: "Do you smoke?",
      type: "radio group",
      required: true,
      options: [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
        { label: "Vape Only", value: "Vape Only" },
      ],
    },
    {
      name: "description_lifestyle",
      label: "Tell us a bit about yourself",
      placeholder: "Work, study, hobbies, or your typical routine…",
      type: "textarea",
      required: true,
    },
    {
      name: "description_looking_for",
      label: "What are you looking for in a home and housemates?",
      placeholder: "What are you looking for in a homeand housemates?",
      type: "textarea",
      required: true,
    },
    {
      name: "description_contribution",
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
        { label: "Quiet Environment", value: "Quiet Environment" },
        { label: "Male Only Household", value: "Male Only Household" },
        { label: "Female Only Household", value: "Female Only Household" },
        { label: "LGBTQ+ Friendly", value: "LGBTQ+ Friendly" },
        { label: "No Pets Allowed", value: "No Pets Allowed" },
        { label: "No Smoking Anywhere", value: "No Smoking Anywhere" },
      ],
    },

    {
      name: "age_preference",
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
      name: "age_preference_min",
      label: "Housemate Age Range",
      type: "number",
      required: true,
      hidden: true,
    },
    {
      name: "age_preference_max",
      label: "Housemate Age Range",
      type: "number",
      required: true,
      hidden: true,
    },

    {
      name: "housemate_preferences",
      label: "Housemate Preference",
      type: "checkbox",
      required: true,
      options: [
        { label: "Male", value: "Male" },
        { label: "Female", value: "Female" },
        { label: "Either", value: "Either" },
        { label: "Couple", value: "couple" },
      ],
    },

    {
      name: "pet_preference",
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
      name: "smoking_preferences",
      label: "Smoking rules I prefer:",
      type: "checkbox",
      required: true,
      options: [
        { label: "Not Allowed", value: "Not Allowed" },
        { label: "Allowed Outside Only", value: "Allowed Outside Only" },
        { label: "Allowed Inside", value: "Allowed Inside" },
        { label: "Vaping Only", value: "Vaping Only" },
      ],
    },
    {
      name: "guest_preferences",
      label: "Guests",
      type: "radio group",
      required: true,
      options: [
        { label: "No Restrictions", value: "No Restrictions" },
        { label: "Guests Welcome", value: "Guests Welcome" },
        { label: "Daytime Visitors Only", value: "Daytime Visitors Only" },
        { label: "Occasionally", value: "Occasionally" },
        { label: "Not Allowed", value: "Not Allowed" },
      ],
    },
    {
      name: "cleaning_arrangements",
      label: "Cleaning Arrangements",
      type: "checkbox",
      required: true,
      options: [
        { label: "Clean-As-You-Go", value: "Clean As You Go" },
        { label: "Cleaning Roster", value: "Cleaning Roster" },
        { label: "Professional Cleaner", value: "Professional Cleaner" },
      ],
    },
    {
      name: "other_house_rules_preferences",
      label: "Other House Rules",
      type: "checkbox",
      required: true,
      options: [
        { label: "Quiet Hours 10pm–7am", value: "Quite Hours 10pm-7am" },
        {
          label: "Shared Responsibility For Common Areas",
          value: "Shared Responsibility For Common Areas",
        },
      ],
    },
    {
      name: "seeker_preferences",
      label: "Preference",
      description:
        "Nice-to-have features that would make your living experience better.",
      type: "checkbox",
      required: true,
      options: [
        { label: "Air Conditioning", value: "Air Conditioning" },
        { label: "Outdoor Space/Garden", value: "Outdoor Space/Garden" },
        { label: "Modern Kitchen", value: "Modern Kitchen" },
        { label: "Natural Light", value: "Natural Light" },
        { label: "Fast Internet/Wi-Fi", value: "Fast Internet/Wi-Fi" },
        { label: "Near Public Transport", value: "Near Public Transport" },
        { label: "Furnished Room", value: "Furnished Room" },
        { label: "Washing Machine", value: "Washing Machine" },
      ],
    },
  ],
};

export const listerStepForm = [
  {
    step: 1,
    title: "Showcase your place",
    description:
      "Add a clear title, standout photos, address, rent, bond, availability, and property type.",
  },
  {
    step: 2,
    title: "Home Details & Access",
    description:
      "Beds, baths, furnishing, parking options, and accessibility—everything seekers need",
  },
  {
    step: 3,
    title: "Tell your story",
    description:
      "Describe the place, the household, and friendly house rules to attract great matches",
  },

  {
    step: 4,
    title: "Living Arrangement",
    description:
      "Set house vibe, housemate preferences, guests, pets, smoking, cleaning, and included amenities. ",
  },
];

export const listerStepFields: Record<number, FieldConfig[]> = {
  1: [
    {
      name: "listing_photo",
      label: "Listing Photo",
      required: true,
      type: "multi file",
    },
    {
      name: "listing_title",
      label: "Listing Title",
      required: true,
      type: "text",
    },
    { name: "address", label: "Address", required: true, type: "text" },
    {
      name: "rent_amount",
      label: "Rent Amount",
      required: true,
      type: "number",
    },
    {
      name: "rent_unit",
      label: "Rent Unit",
      required: true,
      type: "select",
      options: [
        { label: "Week", value: "week" },
        { label: "Month", value: "month" },
        { label: "Day", value: "day" },
        { label: "Hour", value: "hour" },
        { label: "Year", value: "year" },
      ],
    },
    {
      name: "bond_amount",
      label: "Bond Amount",
      required: true,
      type: "number",
    },
    {
      name: "availability",
      label: "Availability",
      required: true,
      type: "select",
      options: [
        { label: "Available Now", value: "available_now" },
        { label: "Available Soon", value: "available_soon" },
        { label: "Available Later", value: "available_later" },
        { label: "Available Flexible", value: "available_flexible" },
        { label: "Available Not Sure", value: "available_not_sure" },
      ],
    },

    {
      name: "minimum_stay",
      label: "Minimum Stay",
      required: true,
      type: "select",
      options: [
        { label: "1 Week", value: "1_week" },
        { label: "2 Weeks", value: "2_weeks" },
        { label: "3 Weeks", value: "3_weeks" },
        { label: "4 Weeks", value: "4_weeks" },
        { label: "5 Weeks", value: "5_weeks" },
      ],
    },
    {
      name: "property_type",
      label: "Property Type",
      required: true,
      type: "checkbox",
      options: [
        { label: "House", value: "house" },
        { label: "Apartment", value: "apartment" },
        { label: "Unit", value: "unit" },
        { label: "Townhouse", value: "townhouse" },
      ],
    },
    {
      name: "room_type",
      label: "Room Type",
      required: true,
      type: "radio group",
      options: [
        { label: "Private Room", value: "private_room" },
        { label: "Shared Room", value: "shared_room" },
        { label: "Studio Type", value: "studio_type" },
        { label: "Granny Flat", value: "granny_flat" },
      ],
    },
  ],
  2: [
    {
      name: "total_bedrooms",
      label: "Total Bedrooms",
      required: true,
      type: "select",
      options: [
        { label: "1", value: "1" },
        { label: "2", value: "2" },
        { label: "3", value: "3" },
        { label: "4", value: "4" },
        { label: "5", value: "5" },
      ],
    },
    {
      name: "total_bathrooms",
      label: "Bathrooms",
      required: true,
      type: "radio group",
      options: [
        { label: "Private", value: "private" },
        { label: "Shared", value: "shared" },
      ],
    },
    {
      name: "furnishing",
      label: "Furnishing",
      required: true,
      type: "radio group",
      options: [
        { label: "Furnished", value: "furnished" },
        { label: "Unfurnished", value: "unfurnished" },
      ],
    },
    {
      name: "parking_space",
      label: "Parking Space",
      required: true,
      type: "radio group",
      options: [
        { label: "Secured Garage", value: "secured_garage" },
        { label: "Covered Carport", value: "covered_carport" },
        { label: "Driveway Parking", value: "driveway_parking" },
        { label: "Street Parking", value: "street_parking" },
        { label: "Permit Parking", value: "permit_parking" },
        { label: "No Parking Needed", value: "no_parking_needed_required" },
      ],
    },
    {
      name: "accessibility",
      label: "Accessibility",
      required: false,
      type: "radio group",
      description: "Only select if you have specific accessibility needs.",
      options: [
        { label: "Wheelchair Access", value: "Wheelchair_access" },
        { label: "Ground Floor", value: "ground_floor" },
      ],
    },
  ],
  3: [
    {
      name: "about_the_place",
      label:
        "About the place:layout, light, standout features, nearby transport",
      required: true,
      type: "textarea",
    },
    {
      name: "about_the_household",
      label: "About the household: who lives here, routines, vibe.",
      required: true,
      type: "textarea",
    },
    {
      name: "house_rules_and_expectations",
      label:
        "House rules & expectations: quiet hours, guests, cleaning—clear and welcoming.",
      required: true,
      type: "textarea",
    },
  ],
  // replace your current step 4
  4: [
    {
      name: "housemate_preference",
      label: "Housemate Preference",
      required: false,
      type: "checkbox",
      isRow: true,
      options: [
        { label: "Male", value: "Male" },
        { label: "Female", value: "Female" },
        { label: "Any Gender", value: "Any Gender" },
        { label: "Couple", value: "Couple" },
      ],
    },
    {
      name: "housemate_age_range",
      label: "Housemate Age Range",
      required: false,
      type: "checkbox",
      isRow: true,
      options: [
        { label: "18–25", value: "18_25" },
        { label: "26–35", value: "26_35" },
        { label: "36–45", value: "36_45" },
        { label: "46+ / Mixed", value: "46_plus_mixed" },
      ],
    },
    {
      name: "preferred_housemate_type",
      label: "Preferred Housemate Type",
      required: false,
      type: "checkbox",
      isRow: true,
      options: [
        { label: "Any", value: "any" },
        { label: "Student", value: "student" },
        { label: "Full-Time Professional", value: "full_time_pro" },
        { label: "Part-Time Professional", value: "part_time_pro" },
        { label: "Business Owner", value: "business_owner" },
        { label: "Unemployed", value: "unemployed" },
        { label: "Retired", value: "retired" },
      ],
    },
    {
      name: "smoking_policy",
      label: "Smoking",
      required: true,
      type: "radio group",
      isRow: true,
      options: [
        { label: "Not Allowed", value: "not_allowed" },
        { label: "Allowed Anywhere", value: "allowed_anywhere" },
        { label: "Allowed Inside", value: "allowed_inside" },
        { label: "Allowed Outside", value: "allowed_outside" },
        { label: "Vaping Only", value: "vaping_only" },
      ],
    },
    {
      name: "pets_policy",
      label: "Pets",
      required: true,
      type: "radio group",
      isRow: false,
      options: [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" },
        { label: "Flexible", value: "flexible" },
      ],
    },
    {
      name: "guests_policy",
      label: "Guests",
      required: true,
      type: "radio group",
      isRow: true,
      options: [
        { label: "No Restrictions", value: "no_restrictions" },
        { label: "Not Allowed", value: "not_allowed" },
        { label: "Occasionally", value: "occasionally" },
        { label: "Guests Welcome", value: "guests_welcome" },
      ],
    },
    {
      name: "cleaning_arrangements",
      label: "Cleaning Arrangements",
      required: true,
      type: "radio group",
      isRow: true,
      options: [
        { label: "Clean-As-You-Go", value: "clean_as_you_go" },
        { label: "Cleaning Roster", value: "cleaning_roster" },
        { label: "Professional Cleaner", value: "professional_cleaner" },
      ],
    },
    {
      name: "other_house_rules",
      label: "Other House Rules",
      required: false,
      type: "checkbox",
      isRow: true,
      options: [
        { label: "Quiet hours 10pm–7am", value: "quiet_hours_22_07" },
        {
          label: "Shared Responsibility For Common Areas",
          value: "shared_common_areas",
        },
      ],
    },
    {
      name: "amenities",
      label: "Other benefits?",
      description:
        "Nice-to-have features that would make your living experience better.",
      required: false,
      type: "checkbox",
      isRow: true,
      options: [
        { label: "Air Conditioning", value: "air_conditioning" },
        { label: "Outdoor Space/Garden", value: "outdoor_space" },
        { label: "Modern Kitchen", value: "modern_kitchen" },
        { label: "Natural Light", value: "natural_light" },
        { label: "Fast Internet/WiFi", value: "fast_internet" },
        { label: "Near Public Transport", value: "near_transport" },
        { label: "Furnished Room", value: "furnished_room" },
        { label: "Washing Machine", value: "washing_machine" },
      ],
    },
  ],
};
