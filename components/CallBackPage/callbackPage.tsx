"use client";

import { useCurrentUser } from "@/hooks/getUserHook";
import { getRoleSegment } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

const CallbackPage = () => {
  const router = useRouter();

  const { data: session } = useCurrentUser();

  const target = useMemo(() => {
    if (session === undefined) return null;

    if (!session) return "/auth";

    if (!session.phoneNumberVerified) return "/otp-verification";

    const roleSegment = getRoleSegment(session?.role);
    return roleSegment ? `/${roleSegment}/dashboard` : "/dashboard";
  }, [session]);

  useEffect(() => {
    if (!target) return;
    router.replace(target);
  }, [router, target]);

  return null;
};

export default CallbackPage;
