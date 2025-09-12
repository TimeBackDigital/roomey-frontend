"use client";

import ErrorCard from "@/components/Cards/ErrorCard";
import RenderFields from "@/components/RoomeyForm/RommeyField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import PageLoader from "@/components/ui/page-loader";
import RoomeyText from "@/components/ui/roomey";
import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTrigger,
} from "@/components/ui/stepper";
import { authClient } from "@/lib/auth/auth-client";
import { seekerStepFields, seekerStepForm } from "@/lib/constant";
import { UploadedImage } from "@/lib/type";
import {
  buildAllDefaults,
  buildAllStepsSchema,
  buildStepSchema,
  ErrorMap,
  isFile,
  mapZodErrorsToForm,
  toBoolFromYesNo,
} from "@/lib/utils";
import ImageService from "@/services/image/image.service";
import OnboardingService from "@/services/onboarding/onboaring.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import ProfileCreationHeader from "./ProfileCreationHeader";

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
    shouldUnregister: false,
    mode: "onChange",
  });

  const currentMeta = seekerStepForm.find((s) => s.step === step);
  const isLastStep = step === seekerStepForm.length;

  const handleNext = () =>
    setStep((prev) => Math.min(prev + 1, seekerStepForm.length));
  const handleBack = () => {
    if (step === 1) router.back();
    else setStep((prev) => Math.max(prev - 1, 1));
  };

  async function uploadPhotoIfAny(photo: unknown): Promise<UploadedImage> {
    if (!isFile(photo)) return null;
    return ImageService.uploadImage(photo, { opts: { folder: "seeker" } });
  }

  async function safeDelete(publicId?: string) {
    if (!publicId) return;
    try {
      await ImageService.deleteImage(publicId);
    } catch (e) {
      console.error("Failed to delete uploaded image:", e);
    }
  }

  const onSubmit = async () => {
    if (!isLastStep) {
      handleNext();
      return;
    }

    const allValues = form.getValues();
    const parsed = allSchema.safeParse(allValues) as z.SafeParseReturnType<
      typeof allSchema,
      typeof allValues
    >;

    if (!parsed.success) {
      mapZodErrorsToForm(parsed.error, form.setError);
      return;
    }

    const data = { ...parsed.data };
    let uploaded: UploadedImage = null;

    try {
      uploaded = await uploadPhotoIfAny(data.photo_url);
      if (uploaded) data.photo_url = uploaded.url;

      data.is_bills_included = toBoolFromYesNo(data.is_bills_included);
      data.is_pets = toBoolFromYesNo(data.is_pets);

      await Promise.all([
        OnboardingService.createSeekerOnboarding(data),
        authClient.updateUser({
          user_is_onboarded: true,
          image: uploaded?.url,
        }),
      ]);

      router.push("/onboarding/completed");
    } catch (error) {
      await safeDelete(uploaded?.public_id);
    }
  };
  return (
    <div className="flex min-h-[90vh] flex-col">
      {form.formState.isSubmitting && (
        <PageLoader
          text="Creating your profile"
          subtext="We're almost there"
          logo={<RoomeyText />}
        />
      )}

      <ProfileCreationHeader
        onBack={handleBack}
        currentMeta={currentMeta?.title ?? ""}
      />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-1 flex-col"
        >
          <div className="container flex-1 overflow-y-auto space-y-6">
            <div className="max-w-xs mx-auto space-y-4">
              <Stepper value={step} onValueChange={setStep}>
                {seekerStepForm.map((s) => (
                  <StepperItem
                    key={s.step}
                    step={s.step}
                    className="not-last:flex-1"
                  >
                    <StepperTrigger>
                      <StepperIndicator
                        className="data-[state=inactive]:ring-inactive"
                        asChild
                      >
                        {s.step < step ? (
                          <CheckIcon className="w-3 h-3 text-white" />
                        ) : (
                          s.step
                        )}
                      </StepperIndicator>
                    </StepperTrigger>
                    {s.step < seekerStepForm.length && <StepperSeparator />}
                  </StepperItem>
                ))}
              </Stepper>

              {currentMeta?.description && (
                <p className="text-center font-bold whitespace-pre-line">
                  {currentMeta.description}
                </p>
              )}
            </div>

            <RenderFields fields={currentFields} form={form} />
          </div>

          <div className="container py-4 flex flex-col justify-end gap-4">
            {Object.entries(form.formState.errors).length > 0 && (
              <ErrorCard Errors={form.formState.errors} />
            )}

            <Button
              // disabled={!form.formState.isValid}
              type="submit"
              size="lg"
              className="w-full"
            >
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SeekerRolePage;
