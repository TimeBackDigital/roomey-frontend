// hooks/useProtectedRoute.ts
"use client";

import { useUser } from "@/components/Providers/AuthProvider";
import { useLoginModalStore } from "@/store/auth-store";
import { useRouter } from "next/navigation";

type NavItem = {
  name: string;
  href: string;
  protected?: boolean;
};

export function useProtectedRoute() {
  const { user } = useUser();
  const router = useRouter();
  const { open } = useLoginModalStore();

  const handleClick = (item: NavItem) => {
    if (!user) {
      open();
    } else {
      router.push(item.href);
    }
  };

  return {
    handleClick,
    user,
  };
}
