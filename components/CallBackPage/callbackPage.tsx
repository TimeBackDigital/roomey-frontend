"use client";

import { getRoleSegment } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

import { useSession } from "@/lib/auth/auth-client";

const CallbackPage = () => {
  const router = useRouter();

  const { data: session } = useSession();

  const target = useMemo(() => {
    if (!session) return "/auth";

    if (!session.user.phoneNumberVerified) return "/otp-verification";

    if (!session.user.user_is_onboarded) return "/onboarding";

    const roleSegment = getRoleSegment(session.user?.role as string);
    return roleSegment ? `/${roleSegment}/dashboard` : "/";
  }, [session]);

  useEffect(() => {
    if (!target) return;

    router.replace(target);
  }, [router, target]);

  return null;
};

export default CallbackPage;
