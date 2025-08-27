"use client";

import { signOut } from "@/lib/auth/auth-client";
import { XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const Loguout = () => {
  const router = useRouter();
  const handleSignOut = async () => {
    await signOut();

    router.push("/auth");
  };

  return (
    <Button
      className="absolute right-0 top-4"
      variant="ghost"
      onClick={handleSignOut}
    >
      <XIcon className="size-6" />
    </Button>
  );
};

export default Loguout;
