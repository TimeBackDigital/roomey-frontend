"use client";

import { authClient } from "@/lib/auth/auth-client";
import {
  ResetPasswordSchema,
  ResetPasswordSchemaType,
} from "@/lib/schema/schema";
import { CaptchaApi } from "@/lib/type";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheck, LockKeyhole } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Captcha from "../Captcha/TurnstileCaptcha";
import GreetingModal from "../Modal/GreetingModal";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { PasswordInput } from "../ui/password-input";
import RoomeyText from "../ui/roomey";

type ResetPasswordPageProps = {
  token: string;
};

const ResetPasswordPage = ({ token }: ResetPasswordPageProps) => {
  const router = useRouter();
  const captchaRef = useRef<CaptchaApi>(null);

  const [count, setCount] = useState(0);
  const [success, setSuccess] = useState(false);

  const form = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (!success) return;
    if (count <= 0) {
      if (count === 0) router.push("/auth/login");
      return;
    }
    const id = setTimeout(() => setCount((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [count, success, router]);

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  const handleResetPassword = async (data: ResetPasswordSchemaType) => {
    try {
      const { error } = await authClient.resetPassword({
        newPassword: data.password,
        token: token ?? undefined,
      });
      if (error) {
        toast.error(error.message ?? "Failed to reset password");
        return;
      }

      setCount(3);

      setSuccess(true);
    } catch {
      toast.error("Failed to reset password");
    }
  };

  if (success) {
    return (
      <GreetingModal
        Icon={<CircleCheck className="size-24" />}
        title="Password Updated"
        description="Your password has been
updated successfully!"
        secondaryDescription={`Redirecting in ${count} seconds...`}
        isOpen={true}
        onOpenChange={setSuccess}
      />
    );
  }

  return (
    <Form {...form}>
      <form
        className={cn("flex flex-col justify-center gap-6 h-full py-6")}
        onSubmit={handleSubmit(handleResetPassword)}
      >
        <RoomeyText />
        <div className="flex-1 flex flex-col justify-center gap-4">
          <div className="flex flex-col items-center gap-2 text-center">
            <h2>Choose a new password</h2>
            <p>Create a strong password to secure your account.</p>
          </div>

          <div className="grid gap-4">
            <FormField
              control={control}
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
              control={control}
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
                  <FormDescription>Match your password above</FormDescription>
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
            {isSubmitting ? "Updating..." : "Set new password"}
          </Button>
        </div>
        <Captcha ref={captchaRef} />
      </form>
    </Form>
  );
};

export default ResetPasswordPage;
