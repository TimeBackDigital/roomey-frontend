"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { authenticationAction } from "@/lib/helper";
import { useUser } from "../Providers/AuthProvider";

const CallbackPage = () => {
  const router = useRouter();

  const { user } = useUser();

  useEffect(() => {
    if (!user) return;

    const route = authenticationAction.authenticated(user);

    router.replace(route);
  }, [router, user]);

  return null;
};

export default CallbackPage;
