"use client";

import { authClient, signUp } from "@/lib/auth/auth-client";
import { RegisterSchema, RegisterSchemaType } from "@/lib/schema/schema";
import { CaptchaApi } from "@/lib/type";
import { NormalizePhone } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { LockKeyhole, Mail, Phone, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Captcha from "../Captcha/TurnstileCaptcha";
import GreetingModal from "../Modal/GreetingModal";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import RoomeyText from "../ui/roomey";

const RegisterForm = () => {
  const [success, setSuccess] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const router = useRouter();

  const registerDefaults: RegisterSchemaType = {
    displayName: "",
    email: "",
    phoneNumber: "",
    password: "",
    terms: false,
  };

  const captchaRef = useRef<CaptchaApi>(null);

  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: registerDefaults,
    shouldUnregister: true,
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = form;

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
            setSuccess(true);
            router.refresh();
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

  if (true) {
    return (
      <GreetingModal
        title="Check your inbox"
        description="We've sent you a magic link"
        secondaryDescription="Click it to continue"
        isOpen={true}
        onOpenChange={setSuccess}
      />
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(handleSignUpMethod)}>
        <div className="flex flex-col pt-10 min-h-screen">
          <RoomeyText />

          <div className="flex-1 flex flex-col gap-y-4">
            <div className="w-full space-y-2 text-center mb-6">
              <h3 className="tracking-tighter">Create your Roomey account!</h3>
              <p className="max-w-62 tracking-tight text-base mx-auto">
                Let&apos;s set up your profile so you can get started.
              </p>
            </div>

            <div className="space-y-4 w-full">
              <FormField
                control={control}
                name="displayName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Display Name*</FormLabel>
                    <FormControl>
                      <Input
                        icon={<User className="size-5" />}
                        id="identifier"
                        type="text"
                        placeholder="Ben Helper"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This is what people will know you as on Roomey
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email*</FormLabel>
                    <FormControl>
                      <Input
                        icon={<Mail className="size-5" />}
                        id="identifier"
                        type="text"
                        placeholder="Enter your email or phone number"
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

              <FormField
                control={control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number*</FormLabel>
                    <FormControl>
                      <Input
                        icon={<Phone className="size-5" />}
                        id="identifier"
                        type="text"
                        placeholder="Enter your email or phone number"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      We&apos;ll send you a code to verify
                    </FormDescription>
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
                      <Input
                        icon={<LockKeyhole className="size-5" />}
                        id="password"
                        type="password"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Make it strong & secure</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="terms"
              render={({ field }) => (
                <FormItem className="flex flex-row-reverse gap-2 items-center py-6 justify-center">
                  <FormLabel className="font-normal">
                    I agree to the
                    <Link href="/terms" className="underline font-bold">
                      Terms
                    </Link>
                    and
                    <Link href="/privacy" className="underline font-bold">
                      Privacy Policy
                    </Link>
                  </FormLabel>
                  <FormControl>
                    <Checkbox
                      id="terms"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="w-full">
            <Button
              size="lg"
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating account..." : "Create Account"}
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

export default RegisterForm;
