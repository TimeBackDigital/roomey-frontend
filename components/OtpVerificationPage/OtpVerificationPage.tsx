"use client";

import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { authClient, useSession } from "@/lib/auth/auth-client";
import {
  OtpVerificationSchema,
  OtpVerificationSchemaType,
} from "@/lib/schema/schema";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import RoomeyText from "../ui/roomey";
import smsVerify from "./../../lib/clients/sms-verify";

const OtpVerificationForm = ({
  className,
  ...props
}: React.ComponentProps<"form">) => {
  const [countdown, setCountdown] = useState(0);
  const [hasSentOtp, setHasSentOtp] = useState(false);

  const router = useRouter();

  const { data: user, refetch } = useSession();

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
      if (countdown === 0) {
        setHasSentOtp(false);
      }
    }, 1000);
    return () => clearInterval(id);
  }, [countdown]);

  const handleSendOtp = async () => {
    if (countdown > 0) return;

    setHasSentOtp(true);
    try {
      const { error } = await authClient.phoneNumber.sendOtp({
        phoneNumber: user?.user.user_phone_number ?? "",
      });

      if (error) {
        toast.error(error.message ?? "Failed to send OTP");
        return;
      }

      toast.success("OTP sent successfully!");

      setCountdown(300);
    } catch {
      toast.error("Failed to send OTP");
    }
  };

  const handleOtpSubmit = async (data: OtpVerificationSchemaType) => {
    try {
      const phoneNumber = user?.user.user_phone_number ?? "";
      const { error } = await smsVerify(data.otp, phoneNumber);
      if (error) {
        toast.error(error.message ?? "Failed to verify OTP");
        return;
      }

      toast.success("Phone number verified successfully");

      await reset();
      await refetch();
      router.push("/onboarding");

      setCountdown(0);
    } catch (err) {
      console.log("err", err);
      toast.error("Failed to verify OTP");
    }
  };

  return (
    <Form {...form}>
      <form
        className={cn(
          "flex flex-col justify-between h-full gap-6 py-6",
          className
        )}
        onSubmit={handleSubmit((data) => handleOtpSubmit(data))}
        {...props}
      >
        <RoomeyText />

        <div className="flex flex-col gap-2 text-center">
          <div className="flex flex-col items-center gap-6 text-center">
            <h3>
              Email Confirmed <span className="text-2xl">🎉</span>
            </h3>
            <h3 className="font-normal">
              Enter the 6-digit code we sent to your phone
            </h3>
          </div>

          <FormField
            control={control}
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
              disabled={isSubmitting || countdown > 0 || hasSentOtp}
              onClick={handleSendOtp}
            >
              Resend {countdown !== 0 && `in ${countdown} sec`}
            </Button>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <Button
            size="lg"
            type="submit"
            className="w-full text-lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Verifying..." : "Verify & Move In"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default OtpVerificationForm;
