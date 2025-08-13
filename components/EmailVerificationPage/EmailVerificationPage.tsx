"use client";

import { authClient } from "@/lib/auth/auth-client";
import { useQuery } from "@tanstack/react-query";
import { BadgeCheck } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import GreetingModal from "../Modal/GreetingModal";

const EmailVerificationPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const { data: verifyEmail } = useQuery({
    queryKey: ["verify-email", token],
    queryFn: async () => {
      const response = await authClient.verifyEmail({
        query: {
          token: token ?? "",
        },
      });

      if (response.error) {
        toast.error(response.error.message ?? "Failed to verify email");
        return;
      }

      setIsOpen(true);

      return response.data;
    },
  });

  if (verifyEmail?.status) {
    return (
      <GreetingModal
        title="Your email has been verified"
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        Icon={<BadgeCheck className="size-24 text-primary" />}
        cta="Next"
        redirectTo="/callback"
      />
    );
  }

  return null;
};

export default EmailVerificationPage;
