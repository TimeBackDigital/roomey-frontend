"use client";

import { authClient, signIn } from "@/lib/auth/auth-client";
import { LoginSchema, LoginSchemaType } from "@/lib/schema/schema";
import { CaptchaApi } from "@/lib/type";
import { CheckEmail } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorContext } from "better-auth/react";
import { LockKeyhole, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Captcha from "../Captcha/TurnstileCaptcha";
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
import { PasswordInput } from "../ui/password-input";
import RoomeyText from "../ui/roomey";

const LoginForm = () => {
  const router = useRouter();
  const loginDefaults: LoginSchemaType = {
    identifier: "",
    password: "",
  };

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: loginDefaults,
    shouldUnregister: true,
  });

  const captchaRef = useRef<CaptchaApi>(null);

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  const handleSignInMethod = async (formData: LoginSchemaType) => {
    try {
      const token = await captchaRef.current!.getFreshToken();
      const { identifier, password } = formData;

      if (CheckEmail(identifier)) {
        const { error } = await signIn.email({
          email: identifier,
          password: password,
          callbackURL: `${process.env.NEXT_PUBLIC_APP_URL}/callback`,
          fetchOptions: {
            // headers: { "x-captcha-response": token ?? "" },
            onError: async (error: ErrorContext) => {
              if (error.error.code === "EMAIL_NOT_VERIFIED") {
                await signIn.magicLink({
                  email: identifier,
                  callbackURL: `${process.env.NEXT_PUBLIC_APP_URL}/callback`,
                });
              }
            },
          },
        });

        if (error) {
          toast.error(error.message ?? "Invalid email or password");
          return;
        }

        return;
      }

      const { error } = await authClient.signIn.phoneNumber({
        phoneNumber: identifier,
        password: password,
        fetchOptions: {
          // headers: { "x-captcha-response": token ?? "" },
          onSuccess: async (ctx) => {
            if (!ctx.data.user.phoneNumberVerified) {
              await authClient.phoneNumber.sendOtp({
                phoneNumber: identifier,
              });
            }
          },
        },
      });

      if (error) {
        toast.error(error.message ?? "Failed to send OTP");
        return;
      }

      router.push("/callback");
    } catch {
      toast.error("Sign in failed");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(handleSignInMethod)}>
        <div className="flex flex-col py-6 min-h-screen">
          <RoomeyText />
          <div className="flex-1 flex flex-col gap-y-[60px]">
            <div className="w-full space-y-2 text-center mb-6 pt-20">
              <h3 className="tracking-tighter">
                Log in to your Roomey account!
              </h3>
              <p className="mx-auto max-w-62 text-base">
                Let&apos;s set up your profile so you can get started.
              </p>
            </div>

            <div className="space-y-4 w-full">
              <FormField
                control={control}
                name="identifier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email or Phone Number*</FormLabel>
                    <FormControl>
                      <Input
                        icon={<User className="size-5" />}
                        id="identifier"
                        type="text"
                        placeholder="Enter your email or phone number"
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
                    <FormLabel>Password*</FormLabel>
                    <FormControl>
                      <PasswordInput
                        icon={<LockKeyhole className="size-5" />}
                        id="password"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="text-center">
                <Link
                  href="/forgot-password"
                  className="text-sm text-primary hover:underline font-bold italic"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
          </div>

          <div className="w-full">
            <Button
              size="lg"
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Log In"}
            </Button>

            <div className="mt-4">
              <Captcha ref={captchaRef} />
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
