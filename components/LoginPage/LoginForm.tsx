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
import { Separator } from "@/components/ui/separator";
import { signIn } from "@/lib/auth/auth-client";
import { providers } from "@/lib/constant";
import { LoginSchema, LoginSchemaType } from "@/lib/schema/schema";
import { CaptchaApi } from "@/lib/type";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorContext } from "better-auth/react";
import { BadgeCheck, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Captcha from "../Captcha/TurnstileCaptcha";
import GreetingModal from "../Modal/GreetingModal";

const LoginForm = ({ className, ...props }: React.ComponentProps<"form">) => {
  const router = useRouter();
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const captchaRef = useRef<CaptchaApi>(null);

  const [isOpen, setIsOpen] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  const handleSignInMethod = async (formData: LoginSchemaType) => {
    try {
      const token = await captchaRef.current!.getFreshToken();

      const { error } = await signIn.email({
        ...formData,
        fetchOptions: {
          headers: {
            "x-captcha-response": token ?? "",
          },
          onError: async (error: ErrorContext) => {
            if (error.error.code === "EMAIL_NOT_VERIFIED") {
              await signIn.magicLink({
                email: formData.email,
                callbackURL: `${process.env.NEXT_PUBLIC_APP_URL}/email-verification`,
              });

              toast.success("Please check your email for verification");

              return;
            }
          },
          onSuccess: async () => {
            setIsOpen(true);
          },
        },
      });
      if (error) {
        toast.error(error.message ?? "Invalid email or password");
        return;
      }

      toast.success("Logged in successfully");
    } catch (err) {
      toast.error("Invalid email or password");
    }
  };

  const onSubmit = async (formData: LoginSchemaType) => {
    try {
      await handleSignInMethod(formData);
    } catch (err) {
      toast.error("Invalid email or password");
    } finally {
    }
  };

  const handleSignInSocial = async (type: "google" | "apple") => {
    await signIn.social({
      provider: type,
      callbackURL: `${process.env.NEXT_PUBLIC_APP_URL}/callback`,
    });
  };

  if (isOpen) {
    return (
      <GreetingModal
        title="You're Logged in"
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        Icon={<BadgeCheck className="size-24 text-primary" />}
        cta="Start exploring"
        redirectTo="/callback"
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
        <div className="flex-1 flex flex-col justify-center gap-4">
          <div className="flex flex-col items-center gap-2 text-center">
            <h3>Log in to your account</h3>
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      icon={<Mail className="size-5" />}
                      id="email"
                      type="email"
                      placeholder="Email"
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
                      placeholder="Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Captcha ref={captchaRef} />

          <Link href="/forgot-password" className="text-center">
            <h3>Forgot password?</h3>
          </Link>
        </div>

        <div className="mt-auto my-10 space-y-2">
          <Button
            size="lg"
            type="submit"
            className="w-full text-lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Log in"}
          </Button>

          <Button
            variant="outline"
            type="button"
            size="lg"
            className="w-full text-lg"
            onClick={() => router.push("/register")}
          >
            Create account
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
