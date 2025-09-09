"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useLoginModalStore } from "@/store/auth-store";
import Link from "next/link";

type LoginRequiredModalProps = {
  redirectTo?: string;
};

export function LoginRequiredModal({ redirectTo }: LoginRequiredModalProps) {
  const { close, isOpen } = useLoginModalStore();
  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Login required</DialogTitle>
          <DialogDescription>
            Login first to access full features.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => close()}>
            Not now
          </Button>

          <Link
            href={redirectTo || "/auth/login"}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            Go to Login
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
