"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const AuthForm = ({ className }: { className?: string }) => {
  const router = useRouter();

  return (
    <div className={cn("flex flex-col justify-center gap-6 h-full", className)}>
      <div className="flex justify-center items-center h-full gap-2 text-center z-50">
        <h1 className="text-background z-50">roomey.</h1>
      </div>

      <div className="mt-auto my-10 space-y-4">
        <Button
          type="button"
          size="lg"
          className="w-full text-lg"
          onClick={() => router.push("/auth/register")}
        >
          Join Roomey Today
        </Button>

        <Button
          size="lg"
          variant="outline_white"
          type="button"
          className="w-full text-lg"
          onClick={() => router.push("/auth/login")}
        >
          Already with us? Log In
        </Button>
      </div>
    </div>
  );
};

export default AuthForm;
