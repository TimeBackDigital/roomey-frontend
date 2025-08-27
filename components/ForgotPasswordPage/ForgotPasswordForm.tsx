"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth/auth-client";
import {
  ForgotPasswordSchema,
  ForgotPasswordSchemaType,
} from "@/lib/schema/schema";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

const ForgotPasswordForm = ({
  className,
  ...props
}: React.ComponentProps<"form">) => {
  const form = useForm<ForgotPasswordSchemaType>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = form;

  const handleEmailSubmit = async (data: ForgotPasswordSchemaType) => {
    try {
      const { error } = await authClient.requestPasswordReset({
        email: data.email,
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`,
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
      reset();
    } catch (err) {
      toast.error("Failed to send OTP", {
        duration: 3000,
      });
    }
  };

  return (
    <Form {...form}>
      <form
        className={cn("flex flex-col justify-center h-full gap-6", className)}
        onSubmit={handleSubmit(handleEmailSubmit)}
        {...props}
      >
        <div className="flex-1 flex flex-col justify-center gap-6">
          <div className="flex flex-col items-center gap-2 text-center">
            <h2>Forgot your password?</h2>
          </div>

          <div className="grid gap-3">
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter Email</FormLabel>
                  <FormControl>
                    <Input
                      icon={<Mail className="size-5" />}
                      id="email"
                      type="email"
                      placeholder="m@example.com"
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
            {isSubmitting ? "Sending..." : "Send Reset Link"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ForgotPasswordForm;
