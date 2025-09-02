"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth/auth-client";
import {
  ForgotPasswordSchema,
  ForgotPasswordSchemaType,
} from "@/lib/schema/schema";
import { CaptchaApi } from "@/lib/type";
import { CheckEmail, cn, NormalizePhone } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Captcha from "../Captcha/TurnstileCaptcha";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import RoomeyText from "../ui/roomey";

const ForgotPasswordForm = ({
  className,
  ...props
}: React.ComponentProps<"form">) => {
  const router = useRouter();
  const form = useForm<ForgotPasswordSchemaType>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      identifier: "",
    },
  });

  const captchaRef = useRef<CaptchaApi>(null);

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = form;

  const handleEmailSubmit = async (formData: ForgotPasswordSchemaType) => {
    try {
      const token = await captchaRef.current!.getFreshToken();
      const { identifier } = formData;

      if (CheckEmail(identifier)) {
        const { error } = await authClient.requestPasswordReset({
          email: identifier,
          redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`,
          fetchOptions: {
            headers: { "x-captcha-response": token ?? "" },
          },
        });

        if (error) {
          toast.error(error.message ?? "Invalid email or password");
          return;
        }
        reset();
        return toast.success("Password reset link sent to your email", {
          duration: 3000,
        });
      }

      const phone = NormalizePhone(identifier);

      const { error } = await authClient.phoneNumber.requestPasswordReset({
        phoneNumber:
          process.env.NODE_ENV === "development" ? "+18777804236" : phone,
        fetchOptions: {
          headers: { "x-captcha-response": token ?? "" },
        },
      });

      if (error) {
        toast.error(error.message ?? "Failed to send OTP", {
          duration: 3000,
        });
        return;
      }

      toast.success("Password reset link sent to your email", {
        duration: 3000,
      });

      router.push(
        `/reset-password/otp-verification?phoneNumber=${encodeURIComponent(
          phone
        )}`
      );
      reset();
    } catch (err) {
      console.error(err);
      toast.error("Failed to send OTP", {
        duration: 3000,
      });
    }
  };

  return (
    <Form {...form}>
      <form
        className={cn(
          "flex flex-col justify-center h-full gap-6 py-6",
          className
        )}
        onSubmit={handleSubmit(handleEmailSubmit)}
        {...props}
      >
        <RoomeyText />
        <div className="flex-1 flex flex-col justify-center gap-6">
          <div className="flex flex-col items-center gap-2 text-center">
            <h2>Need a New Password?</h2>
            <p>
              Enter the email address or the phone number you used to create
              your account.
            </p>
          </div>

          <div className="grid gap-3">
            <FormField
              control={control}
              name="identifier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email or Phone Number * </FormLabel>
                  <FormControl>
                    <Input
                      icon={<User className="size-5" />}
                      id="identifier"
                      placeholder="m@example.com or +1234567890"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    We&apos;ll send you a link to verify
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
            disabled={isSubmitting}
          >
            {isSubmitting ? "Verifying..." : "Verify"}
          </Button>
        </div>

        <Captcha ref={captchaRef} />
      </form>
    </Form>
  );
};

export default ForgotPasswordForm;
