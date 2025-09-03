"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheck, LockKeyhole } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { authClient } from "@/lib/auth/auth-client";
import { cn } from "@/lib/utils";

import Captcha from "@/components/Captcha/TurnstileCaptcha";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { PasswordInput } from "@/components/ui/password-input";
import RoomeyText from "@/components/ui/roomey";
import type { CaptchaApi } from "@/lib/type";

import {
  OtpVerificationSchema,
  OtpVerificationSchemaType,
  ResetPasswordSchema,
  ResetPasswordSchemaType,
} from "@/lib/schema/schema";
import GreetingModal from "../Modal/GreetingModal";

type Step = "password" | "otp";

type Props = {
  phoneNumber: string;
};

const ResetPasswordOtpVerification = ({ phoneNumber }: Props) => {
  const router = useRouter();

  const effectivePhone = phoneNumber;

  const [step, setStep] = useState<Step>("password");
  const [pendingPassword, setPendingPassword] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [redirectCount, setRedirectCount] = useState(0); // for success modal
  const [success, setSuccess] = useState(false);
  const captchaRef = useRef<CaptchaApi>(null);

  useEffect(() => {
    if (countdown <= 0) return;
    const id = setInterval(
      () => setCountdown((s) => (s > 0 ? s - 1 : 0)),
      1000
    );
    return () => clearInterval(id);
  }, [countdown]);

  useEffect(() => {
    if (!success) return;
    if (redirectCount <= 0) {
      if (redirectCount === 0) router.push("/auth/login");
      return;
    }
    const id = setTimeout(() => setRedirectCount((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [success, redirectCount, router]);

  const passwordForm = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const handleStartReset = async (data: ResetPasswordSchemaType) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setPendingPassword(data.password);
      setStep("otp");
    } catch {
      toast.error("Failed to start reset");
    }
  };

  const otpForm = useForm<OtpVerificationSchemaType>({
    resolver: zodResolver(OtpVerificationSchema),
    defaultValues: { otp: "" },
  });

  const handleConfirmReset = async ({ otp }: OtpVerificationSchemaType) => {
    if (!pendingPassword) {
      toast.error("Please choose your new password first.");
      setStep("password");
      return;
    }

    try {
      const { error } = await authClient.phoneNumber.resetPassword({
        phoneNumber: effectivePhone,
        otp,
        newPassword: pendingPassword,
      });

      if (error) {
        toast.error(error.message ?? "Failed to reset password");
        return;
      }

      toast.success("Password updated successfully");
      setSuccess(true);
      setRedirectCount(3);
    } catch {
      toast.error("Failed to reset password");
    }
  };

  const handleResend = async () => {
    if (countdown > 0) return;
    try {
      const { error } = await authClient.phoneNumber.requestPasswordReset({
        phoneNumber: effectivePhone,
      });
      if (error) {
        toast.error(error.message ?? "Failed to resend OTP");
        return;
      }
      setCountdown(300);

      toast.success("OTP resent");
    } catch {
      toast.error("Failed to resend OTP");
    }
  };

  if (success) {
    return (
      <GreetingModal
        Icon={<CircleCheck className="size-24 text-primary" />}
        title="Password Updated"
        description="Your password has been
updated successfully!"
        secondaryDescription={`Redirecting in ${redirectCount} seconds...`}
        isOpen={true}
        onOpenChange={setSuccess}
      />
    );
  }

  return (
    <>
      {step === "password" && (
        <Form {...passwordForm}>
          <form
            className={cn("flex flex-col justify-center h-full gap-6 py-6")}
            onSubmit={passwordForm.handleSubmit(handleStartReset)}
          >
            <RoomeyText />
            <div className="flex-1 flex flex-col justify-center gap-6">
              <div className="flex flex-col items-center gap-2 text-center">
                <h2>Choose a new password</h2>
                <p>Create a strong password to secure your account.</p>
              </div>

              <div className="grid gap-4">
                <FormField
                  control={passwordForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password *</FormLabel>
                      <FormControl>
                        <PasswordInput
                          icon={<LockKeyhole className="size-5" />}
                          id="password"
                          type="password"
                          placeholder="Password"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>8 Characters Minimum</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={passwordForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password *</FormLabel>
                      <FormControl>
                        <PasswordInput
                          icon={<LockKeyhole className="size-5" />}
                          id="confirmPassword"
                          type="password"
                          placeholder="Confirm Password"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Match your password above
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="mt-auto space-y-2">
              <Button
                size="lg"
                type="submit"
                className="w-full text-lg"
                disabled={passwordForm.formState.isSubmitting}
              >
                {passwordForm.formState.isSubmitting
                  ? "Setting new password..."
                  : "Set new password"}
              </Button>
            </div>

            <Captcha ref={captchaRef} />
          </form>
        </Form>
      )}

      {step === "otp" && (
        <Form {...otpForm}>
          <form
            className={cn("flex flex-col justify-center h-full gap-6 py-6")}
            onSubmit={otpForm.handleSubmit(handleConfirmReset)}
          >
            <RoomeyText />
            <div className="flex-1 flex flex-col justify-center gap-6">
              <div className="flex flex-col items-center gap-2 text-center">
                <h3>Verify Your Identity</h3>
                <p>
                  We&apos;ve sent a verification code to your phone. Please
                  enter it below to continue
                </p>
              </div>

              <FormField
                control={otpForm.control}
                name="otp"
                render={({ field }) => (
                  <FormItem className="max-w-2xl mx-auto flex flex-col items-center justify-center">
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

              <div className="flex justify-center items-center gap-2 text-center">
                <p>Didn&apos;t get it?</p>
                <Button
                  type="button"
                  variant="ghost"
                  className="p-0 text-primary"
                  size="sm"
                  disabled={otpForm.formState.isSubmitting || countdown > 0}
                  onClick={handleResend}
                >
                  Resend {countdown !== 0 && `in ${countdown} sec`}
                </Button>
              </div>
            </div>

            <div className="mt-auto space-y-2">
              <Button
                size="lg"
                type="submit"
                className="w-full text-lg"
                disabled={otpForm.formState.isSubmitting}
              >
                {otpForm.formState.isSubmitting
                  ? "Updating password..."
                  : "Verify"}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </>
  );
};

export default ResetPasswordOtpVerification;
