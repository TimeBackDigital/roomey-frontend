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
