"use client";

import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useCurrentUser } from "@/hooks/getUserHook";
import { authClient } from "@/lib/auth/auth-client";
import {
  OtpVerificationSchema,
  OtpVerificationSchemaType,
} from "@/lib/schema/schema";
import { cn, MaskPhoneNumberMiddle } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import GreetingModal from "../Modal/GreetingModal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

const OtpVerificationForm = ({
  className,
  ...props
}: React.ComponentProps<"form">) => {
  const [countdown, setCountdown] = useState(0);
  const [isVerified, setIsVerified] = useState(false);

  const { data: user } = useCurrentUser();

  const form = useForm<OtpVerificationSchemaType>({
    resolver: zodResolver(OtpVerificationSchema),
    defaultValues: {
      otp: "",
    },
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = form;

  useEffect(() => {
    if (countdown <= 0) return;
    const id = setInterval(() => {
      setCountdown((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, [countdown]);

  const handleSendOtp = async () => {
    if (countdown > 0) return;

    try {
      const { error } = await authClient.phoneNumber.sendOtp({
        phoneNumber: user?.phoneNumber ?? "",
      });

      if (error) {
        toast.error(error.message ?? "Failed to send OTP");
        return;
      }

      toast.success("OTP sent successfully!");
      setIsVerified(true);
      setCountdown(30);
    } catch {
      toast.error("Failed to send OTP");
    }
  };

  const handleOtpSubmit = async (data: OtpVerificationSchemaType) => {
    try {
      const { error } = await authClient.phoneNumber.verify({
        phoneNumber: user?.phoneNumber ?? "",
        code: data.otp,
        disableSession: false,
        updatePhoneNumber: true,
      });

      if (error) {
        toast.error(error.message ?? "Failed to verify OTP");
        return;
      }

      toast.success("Phone number verified successfully");

      reset();
      setCountdown(0);
    } catch {
      toast.error("Failed to verify OTP");
    }
  };

  if (isVerified) {
    return (
      <GreetingModal
        cta="Next"
        redirectTo="/onboarding"
        title="Your phone number has been verified"
        isOpen={isVerified}
        onOpenChange={setIsVerified}
        Icon={<CheckCircle className="size-24 text-primary" />}
      />
    );
  }

  return (
    <Form {...form}>
      <form
        className={cn("flex flex-col justify-center h-full gap-6", className)}
        onSubmit={handleSubmit((data) => handleOtpSubmit(data))}
        {...props}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h2>Verify your phone number</h2>
        </div>

        <FormField
          control={control}
          name="otp"
          render={({ field }) => (
            <FormItem className="max-w-2xl mx-auto flex flex-col items-center justify-center">
              <FormLabel className="text-center">
                We&apos;ve sent you an OTP to your phone number{" "}
                {MaskPhoneNumberMiddle(user?.phoneNumber ?? "")}. Please verify
                to continue.
              </FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-4 space-y-2">
          <Button
            size="lg"
            type="button"
            className="w-full text-lg"
            disabled={isSubmitting || countdown > 0}
            onClick={handleSendOtp}
          >
            {countdown > 0 ? `Resend OTP in ${countdown}s` : "Resend OTP"}
          </Button>
          <Button
            size="lg"
            type="submit"
            className="w-full text-lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Verifying..." : "Verify OTP"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default OtpVerificationForm;
