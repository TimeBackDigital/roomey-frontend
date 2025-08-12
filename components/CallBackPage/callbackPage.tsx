"use client";

import { useSession } from "@/lib/auth/auth-client";
import { Role } from "@/lib/enum";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const CallbackPage = () => {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }

    const roleKey = session?.user.role as keyof typeof Role;
    router.push(`/${Role[roleKey]}/dashboard`);
  }, [session]);

  return null;
};

export default CallbackPage;
