"use client";

import { authClient } from "@/lib/auth/auth-client";
import {
  ResetPasswordSchema,
  ResetPasswordSchemaType,
} from "@/lib/schema/schema";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

type ResetPasswordPageProps = {
  token: string;
};

const ResetPasswordPage = ({ token }: ResetPasswordPageProps) => {
  const router = useRouter();

  const form = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

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

      toast.success("Password updated successfully");
      router.push("/auth");
    } catch (error) {
      toast.error("Failed to reset password");
    }
  };

  return (
    <Form {...form}>
      <form
        className={cn("flex flex-col justify-center gap-6 h-full")}
        onSubmit={handleSubmit(handleResetPassword)}
      >
        <div className="flex-1 flex flex-col justify-center gap-4">
          <div className="flex flex-col items-center gap-4 text-center">
            <h2 className="text-[26px] font-[600]">Reset password</h2>
            <p>Enter your new password</p>
          </div>

          <div className="grid gap-4">
            <FormField
              control={control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter Password</FormLabel>
                  <FormControl>
                    <Input
                      icon={<Lock className="size-4" />}
                      id="password"
                      type="password"
                      placeholder="Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      icon={<Lock className="size-4" />}
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="mt-auto my-10 space-y-2">
          <Button
            size="lg"
            type="submit"
            className="w-full text-lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Update Password"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ResetPasswordPage;
