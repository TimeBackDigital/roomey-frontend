"use client";

import { cn } from "@/lib/utils";
import { OTPInput, OTPInputContext } from "input-otp";
import { Asterisk } from "lucide-react";
import * as React from "react";

function InputOTP({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string;
}) {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn(
        // space between individual boxes
        "flex items-center gap-2 has-disabled:opacity-50",
        containerClassName
      )}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  );
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn("flex items-center gap-2", className)}
      {...props}
    />
  );
}

function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<"div"> & { index: number }) {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {};

  // Mask the typed character to look like the screenshot
  const masked = char ? (
    <Asterisk className="size-6 text-primary" strokeWidth={3} />
  ) : (
    ""
  );

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      // square-ish box, rounded corners, subtle border, focus ring
      className={cn(
        "relative flex h-10 w-10 items-center justify-center rounded-md border border-primary bg-background text-base font-medium shadow-xs transition",
        "data-[active=true]:ring-[1px] data-[active=true]:ring-ring/50",
        "aria-invalid:border-destructive data-[active=true]:aria-invalid:ring-destructive/20",
        className
      )}
      {...props}
    >
      <span className="leading-none">{masked}</span>

      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-caret-blink h-4 w-px bg-foreground duration-1000" />
        </div>
      )}
    </div>
  );
}

export { InputOTP, InputOTPGroup, InputOTPSlot };
