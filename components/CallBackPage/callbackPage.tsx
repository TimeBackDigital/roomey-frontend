"use client";

import { useSession } from "@/lib/auth/auth-client";
import { getRoleSegment } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

const CallbackPage = () => {
  const router = useRouter();

  const { data: session } = useSession();

  const target = useMemo(() => {
    if (!session) return "/auth";

    if (!session.user.phoneNumberVerified) return "/otp-verification";

    const roleSegment = getRoleSegment(session?.user?.role as string);
    return roleSegment ? `/${roleSegment}/dashboard` : "/";
  }, [session]);

  useEffect(() => {
    if (!target) return;
    router.replace(target);
  }, [router, target]);

  return null;
};

export default CallbackPage;
