"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/lib/auth/auth-client";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type LoginFormInputs = {
  email: string;
  password: string;
  type: "email" | "magic-link";
};

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    defaultValues: {
      email: "",
      password: "",
      type: "email",
    },
  });

  const type = watch("type");

  const handleSignInMethod = async (formData: LoginFormInputs) => {
    if (type === "email") {
      return await signIn.email(formData);
    }

    await signIn.magicLink({
      email: formData.email,
      callbackURL: `${process.env.NEXT_PUBLIC_APP_URL}/callback`,
    });
  };

  const onSubmit = async (formData: LoginFormInputs) => {
    try {
      await handleSignInMethod(formData);

      router.push("/callback");
    } catch (err) {
    } finally {
    }
  };

  const handleSignInWithGoogle = async () => {
    await signIn.social({
      provider: "google",
      callbackURL: `${process.env.NEXT_PUBLIC_APP_URL}/callback`,
    });
  };

  const handleSwitchLoginMethod = (type: "email" | "magic-link") => {
    setValue("type", type);
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        {type === "email" ? (
          <>
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="grid gap-3">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="/forgot-password"
                  className="ml-auto text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="********"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
          </>
        )}

        <Button type="submit" className="w-full">
          Login
        </Button>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>
        <Button
          variant="outline"
          type="button"
          className="w-full"
          onClick={handleSignInWithGoogle}
        >
          Login with Google
        </Button>

        <Button
          variant="outline"
          type="button"
          className="w-full"
          onClick={() =>
            handleSwitchLoginMethod(type === "email" ? "magic-link" : "email")
          }
        >
          {type === "email" ? "Login with Magic Link" : "Login with Email"}
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <a href="/register" className="underline underline-offset-4">
          Sign up
        </a>
      </div>
    </form>
  );
}
