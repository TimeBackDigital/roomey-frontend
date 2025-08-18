"use client";

import { useUser } from "@/components/Providers/AuthProvider";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();

  if (user) {
    return redirect("/");
  }

  return (
    <div className="relative">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="fixed z-50 top-1/2 -translate-y-1/2 text-background">
          roomey.
        </h1>
      </div>

      <Image
        src="/assets/bg/auth_bg.webp"
        alt="auth background image"
        quality={100}
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/40"></div>
      {children}
    </div>
  );
};

export default AuthLayout;
