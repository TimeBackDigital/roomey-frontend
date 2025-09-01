"use client";

import RenderFields from "@/components/RoomeyForm/RommeyField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTrigger,
} from "@/components/ui/stepper";
import { FieldConfig } from "@/lib/type";
import {
  buildAllDefaults,
  buildAllStepsSchema,
  buildStepSchema,
  ErrorMap,
} from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";

const stepForm = [
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
  // 1) Property & Location
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
      label: "Date of Birth*",
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

const SeekerRolePage = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const currentFields = seekerStepFields[step] ?? [];
  const currentSchema = useMemo(() => buildStepSchema(currentFields), [step]);

  const allSchema = useMemo(() => buildAllStepsSchema(seekerStepFields), []);
  const allDefaults = useMemo(
    () => buildAllDefaults(seekerStepFields, "empty"),
    []
  );

  const form = useForm({
    resolver: zodResolver(currentSchema, { errorMap: ErrorMap }),
    defaultValues: allDefaults,
    shouldUnregister: false, // ✅ important to retain values across steps
    mode: "onChange",
  });

  const currentMeta = stepForm.find((s) => s.step === step);
  const isLastStep = step === stepForm.length;

  const handleNext = () =>
    setStep((prev) => Math.min(prev + 1, stepForm.length));
  const handleBack = () => {
    if (step === 1) router.back();
    else setStep((prev) => Math.max(prev - 1, 1));
  };

  const onSubmit = async () => {
    if (!isLastStep) {
      handleNext();
    } else {
      const allValues = form.getValues();
      const result = allSchema.safeParse(allValues);
      if (!result.success) {
        result.error.errors.forEach((err) => {
          if (err.path.length > 0) {
            form.setError(err.path[0] as string, { message: err.message });
          }
        });
        return;
      }

      console.log("✅ Final submission:", result.data);
    }
  };

  return (
    <>
      <div className="bg-primary h-14 flex items-center justify-center relative">
        <div className="flex items-center gap-2">
          <div onClick={handleBack} className="absolute left-4 cursor-pointer">
            <ArrowLeft className="size-4 text-white" />
          </div>
          <div className="text-white text-lg font-medium">
            {currentMeta?.title}
          </div>
        </div>
      </div>

      <div className="container space-y-10">
        <div className="max-w-2xs mx-auto space-y-4">
          <Stepper value={step} onValueChange={setStep}>
            {stepForm.map((s) => (
              <StepperItem
                key={s.step}
                step={s.step}
                className="not-last:flex-1"
              >
                <StepperTrigger>
                  <StepperIndicator asChild>{s.step}</StepperIndicator>
                </StepperTrigger>
                {s.step < stepForm.length && <StepperSeparator />}
              </StepperItem>
            ))}
          </Stepper>
          {currentMeta?.description && (
            <p className="text-center font-bold whitespace-pre-line">
              {currentMeta.description}
            </p>
          )}
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <RenderFields control={form.control} fields={currentFields} />

            <div className="flex-1 justify-end">
              <Button type="submit" size="lg" className="w-full">
                {isLastStep ? "Finish" : "Continue"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default SeekerRolePage;
