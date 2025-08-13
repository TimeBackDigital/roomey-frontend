"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient, signIn, signUp } from "@/lib/auth/auth-client";
import { providers } from "@/lib/constant";
import { RegisterSchema, RegisterSchemaType } from "@/lib/schema/schema";
import { CaptchaApi } from "@/lib/type";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Mail, Phone, User } from "lucide-react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Captcha from "../Captcha/TurnstileCaptcha";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Separator } from "../ui/separator";

const RegisterForm = ({
  className,
  ...props
}: React.ComponentProps<"form">) => {
  const captchaRef = useRef<CaptchaApi>(null);

  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      displayName: "",
      email: "",
      password: "",
      phoneNumber: "",
    },
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (formData: RegisterSchemaType) => {
    try {
      const { displayName, email, password, phoneNumber } = formData;

      const token = await captchaRef.current!.getFreshToken();

      const { error } = await signUp.email({
        name: displayName,
        email,
        password,
        user_phone_number: phoneNumber,
        user_phone_number_verified: false,
        user_is_onboarded: false,
        callbackURL: `${process.env.NEXT_PUBLIC_APP_URL}/email-verification`,
        fetchOptions: {
          headers: {
            "x-captcha-response": token ?? "",
          },
          onSuccess: async () => {
            await authClient.phoneNumber.sendOtp({
              phoneNumber: phoneNumber,
            });
            reset();
          },
        },
      });

      if (error) {
        toast.error(error.message ?? "Failed to create account");
        return;
      }

      toast.success("Account created successfully, please verify your email");
    } catch (err) {
      toast.error("Failed to create account");
    }
  };

  const handleSignInSocial = async (type: "google" | "apple") => {
    await signIn.social({
      provider: type,
      callbackURL: `${process.env.NEXT_PUBLIC_APP_URL}/callback`,
    });
  };
  return (
    <Form {...form}>
      <form
        className={cn("flex flex-col justify-center gap-6 h-full", className)}
        onSubmit={handleSubmit(onSubmit)}
        {...props}
      >
        <div className="flex-1 flex flex-col justify-center gap-4">
          <div className="flex flex-col items-center gap-2 text-center">
            <h3>Create account</h3>
          </div>

          {providers(handleSignInSocial).map((provider) => (
            <Button
              key={provider.name}
              onClick={provider.onClick}
              iconLeft={provider.icon}
              type="button"
              variant="outline"
              size="lg"
              className="w-full font-normal"
            >
              Sign in with {provider.name}
            </Button>
          ))}

          <Separator label="or" />

          <div className="grid gap-4">
            <FormField
              control={control}
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      icon={<User className="size-5" />}
                      id="displayName"
                      type="text"
                      placeholder="John Doe"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem>
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

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      icon={<Phone className="size-4" />}
                      id="phoneNumber"
                      type="text"
                      placeholder="Phone Number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      icon={<Lock className="size-4" />}
                      id="password"
                      type="password"
                      placeholder="********"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Captcha ref={captchaRef} />
        </div>

        <div className="mt-auto my-10 space-y-2">
          <Button
            size="lg"
            type="submit"
            className="w-full text-lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create account"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;
