"use client";

import ErrorCard from "@/components/Cards/ErrorCard";
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
import { listerStepFields, listerStepForm } from "@/lib/constant";
import {
  buildAllDefaults,
  buildAllStepsSchema,
  buildStepSchema,
  ErrorMap,
} from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import ProfileCreationHeader from "./ProfileCreationHeader";

const ListerRolePage = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const currentFields = listerStepFields[step] ?? [];
  const currentSchema = useMemo(() => buildStepSchema(currentFields), [step]);

  const allSchema = useMemo(() => buildAllStepsSchema(listerStepFields), []);
  const allDefaults = useMemo(
    () => buildAllDefaults(listerStepFields, "empty"),
    []
  );

  const form = useForm({
    resolver: zodResolver(currentSchema, { errorMap: ErrorMap }),
    defaultValues: allDefaults,
    shouldUnregister: false,
    mode: "onChange",
  });

  const currentMeta = listerStepForm.find((s) => s.step === step);
  const isLastStep = step === listerStepForm.length;

  const handleNext = () =>
    setStep((prev) => Math.min(prev + 1, listerStepForm.length));
  const handleBack = () => {
    if (step === 1) router.back();
    else setStep((prev) => Math.max(prev - 1, 1));
  };

  const onSubmit = async () => {
    if (!isLastStep) {
      handleNext();
    } else {
      //temporary
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
      router.push("/onboarding/lister/completed");
    }
  };

  return (
    <div className="flex min-h-[90vh] flex-col">
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
                {listerStepForm.map((s) => (
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
                    {s.step < listerStepForm.length && <StepperSeparator />}
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

export default ListerRolePage;
