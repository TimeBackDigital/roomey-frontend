"use client";

import GreetingModal from "@/components/Modal/GreetingModal";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { schemaByRole } from "@/lib/schema/schema";
import { RoleKey } from "@/lib/type";
import ImageService from "@/services/image/image.service";
import OnboardingService from "@/services/onboarding/onboaring.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { BadgeCheck, UserCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

type Props = {
  role: RoleKey;
};

export default function OnboardingRolePage({ role }: Props) {
  const [step, setStep] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const totalSteps = schemaByRole[role as keyof typeof schemaByRole].totalSteps;
  const isLastStep = step === totalSteps - 1;
  const currentSchema = schemaByRole[role as keyof typeof schemaByRole].schema;

  const form = useForm({
    resolver: zodResolver(currentSchema),
    defaultValues: {
      role: role as "agency" | "seeker" | "lister" | undefined,
    },
    mode: "onChange",
  });

  const profilePhoto = form.watch("profilePhoto");

  const onSubmit = async (formData: z.infer<typeof currentSchema>) => {
    if (!isLastStep) {
      setStep(step + 1);
    }

    const image = await ImageService.uploadImage(
      (formData as { profilePhoto: File }).profilePhoto,
      {
        opts: {
          folder: "avatar",
        },
      }
    );

    try {
      await OnboardingService.createOnboarding({
        role,
        data: {
          ...formData,
          ...(role === "seeker" && {
            allowMarketing: formData.allowMarketing,
            allowVerification: formData.allowVerification,
          }),
          profilePhoto: image.url,
        },
      });
    } catch (e) {
      await ImageService.deleteImage(image.public_id);
    }

    setStep(0);
    form.reset();
    setIsFinished(true);
  };

  if (isFinished) {
    return (
      <GreetingModal
        title="You're all set"
        cta="Start exploring"
        Icon={<BadgeCheck className="size-24 text-primary" />}
        redirectTo={schemaByRole[role as keyof typeof schemaByRole].redirectTo}
        isOpen={isFinished}
        onOpenChange={setIsFinished}
      />
    );
  }

  return (
    <div className="max-w-md mx-auto min-h-screen h-full flex flex-col justify-between">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 flex flex-col"
        >
          {role === "seeker" && step === 0 && (
            <FormItem className="text-center flex flex-col justify-between h-[75vh]">
              <div className="space-y-4">
                <h3>Add a profile photo</h3>
                <h3 className="font-normal">
                  Make it easier for listers to recognize and trust you. Your
                  photo helps build confidence when connecting with potential
                  housemates or landlords.
                </h3>

                <p>
                  Your profile photo is only visible to listers after
                  you&apos;ve sent a message or request.
                </p>
              </div>

              <FormControl>
                <div className="flex flex-col items-center gap-4">
                  {form.getValues("profilePhoto") ? (
                    <Image
                      src={URL.createObjectURL(form.getValues("profilePhoto"))}
                      alt="Profile Preview"
                      width={500}
                      height={500}
                      className="rounded-full w-52 h-52 object-cover"
                    />
                  ) : (
                    <UserCircle className="w-42 h-42 text-primary" />
                  )}

                  <Input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="profilePhoto-input"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        form.setValue("profilePhoto", file, {
                          shouldValidate: true,
                        });
                      }
                    }}
                  />
                  <FormMessage />
                </div>
              </FormControl>

              <div className="space-y-2 w-full">
                {!profilePhoto ? (
                  <>
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full"
                      onClick={() =>
                        document.getElementById("profilePhoto-input")?.click()
                      }
                      type="button"
                    >
                      Choose a photo
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full"
                      type="button"
                      onClick={() => {
                        const input = document.createElement("input");
                        input.type = "file";
                        input.accept = "image/*";
                        input.capture = "user";
                        input.onchange = (ev) => {
                          const file = (ev.target as HTMLInputElement)
                            .files?.[0];
                          if (file) {
                            form.setValue("profilePhoto", file, {
                              shouldValidate: true,
                            });
                          }
                        };
                        input.click();
                      }}
                    >
                      Take a photo
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full"
                      onClick={() =>
                        document.getElementById("profilePhoto-input")?.click()
                      }
                      type="button"
                    >
                      Replace photo
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full"
                      type="button"
                      onClick={() => setStep(1)}
                    >
                      Next
                    </Button>
                  </>
                )}
              </div>
            </FormItem>
          )}

          {role === "seeker" && step === 1 && (
            <div className="flex flex-col items-center justify-center gap-14 space-x-3 space-y-0 h-[75vh]">
              <div className="flex flex-col justify-center items-center gap-4">
                <Image
                  src={"/assets/avatar/onboarding_avatar.webp"}
                  alt="Profile Preview"
                  width={500}
                  height={500}
                  className="rounded-full w-52 h-52 object-cover"
                />
              </div>

              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="allowMarketing"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3">
                      <FormControl>
                        <Checkbox
                          className="size-5"
                          checked={field.value || false}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div>
                        By using this website you are agreeing to our{" "}
                        <Link
                          href="/personal-info"
                          className="font-semibold underline"
                          target="_blank"
                        >
                          Personal Information Collection Statement
                        </Link>
                        ,{" "}
                        <Link
                          href="/terms"
                          className="font-semibold underline"
                          target="_blank"
                        >
                          Terms &amp; Conditions
                        </Link>{" "}
                        and{" "}
                        <Link
                          href="/privacy"
                          className="font-semibold underline"
                          target="_blank"
                        >
                          Privacy Policy
                        </Link>
                        .
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="allowVerification"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3">
                      <FormControl>
                        <Checkbox
                          className="size-5"
                          checked={field.value || false}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div>
                        I will only communicate through the Roomey platform
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          )}

          <Button size="lg" type="submit" className="w-full">
            {isLastStep ? "Finish" : step === 0 ? "Skip for now" : "Continue"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
