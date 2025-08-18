"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient, signIn, signUp } from "@/lib/auth/auth-client";
import {
  LoginSchemaType,
  RegisterSchemaType,
  UnionSchema,
  UnionSchemaType,
} from "@/lib/schema/schema";
import { AuthFormType, CaptchaApi } from "@/lib/type";
import { CheckEmail, cn, NormalizePhone } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorContext } from "better-auth/react";
import { BadgeCheck, Lock, Mail, Phone, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Captcha from "../Captcha/TurnstileCaptcha";
import GreetingModal from "../Modal/GreetingModal";

const AuthForm = ({ className, ...props }: React.ComponentProps<"form">) => {
  const loginDefaults: LoginSchemaType = {
    type: "login",
    identifier: "",
    password: "",
  };

  const registerDefaults: RegisterSchemaType = {
    type: "register",
    displayName: "",
    email: "",
    phoneNumber: "",
    password: "",
  };

  const [formType, setFormType] = useState<AuthFormType | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const form = useForm<UnionSchemaType>({
    resolver: zodResolver(UnionSchema),
    defaultValues: loginDefaults,
    shouldUnregister: true,
  });

  const captchaRef = useRef<CaptchaApi>(null);

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { isSubmitting },
  } = form;

  useEffect(() => {
    reset(formType === "login" ? loginDefaults : registerDefaults);
    setValue("type", formType ?? "login", { shouldValidate: false });
  }, [formType, reset]);

  const handleSignInMethod = async (formData: LoginSchemaType) => {
    try {
      const token = await captchaRef.current!.getFreshToken();
      const { identifier, password } = formData;

      if (CheckEmail(identifier)) {
        const { error } = await signIn.email({
          email: identifier,
          password: password,
          fetchOptions: {
            headers: { "x-captcha-response": token ?? "" },
            onError: async (error: ErrorContext) => {
              if (error.error.code === "EMAIL_NOT_VERIFIED") {
                await signIn.magicLink({
                  email: identifier,
                  callbackURL: `${process.env.NEXT_PUBLIC_APP_URL}/callback`,
                });
              }
            },
            onSuccess: async () => setIsLoggedIn(true),
          },
        });

        if (error) {
          toast.error(error.message ?? "Invalid email or password");
          return;
        }

        toast.success("Logged in successfully");
        return;
      }

      const phone = NormalizePhone(identifier);

      const { error } = await authClient.signIn.phoneNumber({
        phoneNumber:
          process.env.NODE_ENV === "development" ? "+18777804236" : phone,
        password: password,
        fetchOptions: {
          headers: { "x-captcha-response": token ?? "" },
          onSuccess: async () => setIsLoggedIn(true),
        },
      });

      if (error) {
        toast.error(error.message ?? "Failed to send OTP");
        return;
      }

      toast.success("Logged in successfully");
    } catch {
      toast.error("Sign in failed");
    }
  };

  const handleSignUpMethod = async (formData: RegisterSchemaType) => {
    try {
      const { displayName, email, password, phoneNumber } = formData;

      const token = await captchaRef.current!.getFreshToken();

      const { error } = await signUp.email({
        name: displayName,
        email,
        password,
        user_phone_number:
          process.env.NODE_ENV === "development"
            ? "+18777804236"
            : NormalizePhone(phoneNumber),
        user_is_onboarded: false,
        callbackURL: `${process.env.NEXT_PUBLIC_APP_URL}/otp-verification`,
        fetchOptions: {
          headers: {
            "x-captcha-response": token ?? "",
          },
          onSuccess: async () => {
            await authClient.phoneNumber.sendOtp({
              phoneNumber: phoneNumber,
            });
            reset();

            setIsRegistered(true);
          },
        },
      });

      if (error) {
        toast.error(error.message ?? "Failed to create account");
        return;
      }
    } catch (err) {
      toast.error("Failed to create account");
    }
  };

  const onSubmit = async (formData: UnionSchemaType) => {
    try {
      if (formType === "login") {
        return await handleSignInMethod(formData as LoginSchemaType);
      }

      return await handleSignUpMethod(formData as RegisterSchemaType);
    } catch (err) {
      toast.error("Invalid email or password");
    } finally {
    }
  };

  const handleChangeFormType = (type: AuthFormType) => {
    setFormType(type);
  };

  if (isLoggedIn) {
    return (
      <GreetingModal
        title="You're Logged in"
        isOpen={isLoggedIn}
        onOpenChange={setIsLoggedIn}
        Icon={<BadgeCheck className="size-24 text-primary" />}
        cta="Start exploring"
        redirectTo="/callback"
      />
    );
  }

  if (isRegistered) {
    return (
      <GreetingModal
        title="Check your inbox"
        description="We've sent you a magic link"
        secondaryDescription="Click it to continue"
        isOpen={isRegistered}
        onOpenChange={setIsRegistered}
        // cta="Start exploring"
        // redirectTo="/callback"
      />
    );
  }

  return (
    <Form {...form}>
      <form
        className={cn("flex flex-col justify-center gap-6 h-full", className)}
        onSubmit={handleSubmit(onSubmit)}
        {...props}
      >
        <div className="flex-1 flex flex-col justify-end gap-4 z-50">
          {formType === "login" ? (
            <div className="grid gap-4">
              <FormField
                control={control}
                name="identifier"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        icon={<User className="size-5 text-background" />}
                        variant="outline"
                        id="identifier"
                        type="text"
                        placeholder="Input number or Email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* <Link href="/forgot-password" className="text-center">
                <h3>Forgot password?</h3>
              </Link> */}

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        icon={<Lock className="size-5 text-background" />}
                        variant="outline"
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
              <Button
                size="lg"
                type="submit"
                className="w-full text-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Log in"}
              </Button>
            </div>
          ) : formType === "register" ? (
            <div className="grid gap-4">
              <FormField
                control={control}
                name="displayName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        variant="outline"
                        icon={<User className="size-5 text-background" />}
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
                        variant="outline"
                        icon={<Mail className="size-5 text-background" />}
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
                        variant="outline"
                        icon={<Phone className="size-5 text-background" />}
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
                        variant="outline"
                        icon={<Lock className="size-5 text-background" />}
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
              <Button
                size="lg"
                type="submit"
                className="w-full text-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating account..." : "Create account"}
              </Button>
            </div>
          ) : null}

          <Captcha ref={captchaRef} />
        </div>

        {!formType && (
          <div className="mt-auto my-10 space-y-2">
            <Button
              type="button"
              size="lg"
              className="w-full text-lg"
              onClick={() => handleChangeFormType("register")}
            >
              Create account
            </Button>

            <Button
              size="lg"
              variant="outline_white"
              type="button"
              className="w-full text-lg"
              onClick={() => handleChangeFormType("login")}
            >
              Log in
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
};

export default AuthForm;
