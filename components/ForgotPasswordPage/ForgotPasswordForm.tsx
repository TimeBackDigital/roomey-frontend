"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth/auth-client";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";

type ForgotPasswordFormInputs = {
  email: string;
};

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormInputs>({
    defaultValues: {
      email: "",
    },
  });

  const handleEmailSubmit = async (data: ForgotPasswordFormInputs) => {
    try {
      const { error } = await authClient.requestPasswordReset({
        email: data.email,
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`,
      });
      if (error) throw error;
    } catch (err) {
      console.error("Failed to send OTP:", err);
    }
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit(handleEmailSubmit)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Forgot your password?</h1>
        <p className="text-muted-foreground text-sm">
          Enter your email to receive a reset code
        </p>
      </div>

      <div className="grid gap-4">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
        <Button type="submit" className="w-full">
          Send Reset Link
        </Button>
      </div>
    </form>
  );
}
