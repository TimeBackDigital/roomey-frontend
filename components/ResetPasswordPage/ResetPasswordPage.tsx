"use client";

import { authClient } from "@/lib/auth/auth-client";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type ResetPasswordFormInputs = {
  password: string;
  confirmPassword: string;
};

const ResetPasswordPage = () => {
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormInputs>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const handleResetPassword = async (data: ResetPasswordFormInputs) => {
    try {
      const { error } = await authClient.resetPassword({
        newPassword: data.password,
        token: token ?? undefined,
      });
      if (error) throw error;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      className={cn("flex flex-col gap-6")}
      onSubmit={handleSubmit(handleResetPassword)}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Forgot your password?</h1>
        <p className="text-muted-foreground text-sm">Enter your new password</p>
      </div>

      <div className="grid gap-4">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}

        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          {...register("confirmPassword", {
            required: "Confirm Password is required",
          })}
        />
        {errors.confirmPassword && (
          <p className="text-sm text-red-500">
            {errors.confirmPassword.message}
          </p>
        )}
        <Button type="submit" className="w-full">
          Reset Password
        </Button>
      </div>
    </form>
  );
};

export default ResetPasswordPage;
