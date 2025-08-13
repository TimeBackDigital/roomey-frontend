"use client";

import { cn } from "@/lib/utils";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import * as React from "react";

type SeparatorProps = React.ComponentProps<typeof SeparatorPrimitive.Root> & {
  /** Optional centered text/content */
  label?: React.ReactNode;
  /** Extra classes for the label span */
  labelClassName?: string;
};

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  SeparatorProps
>(
  (
    {
      className,
      orientation = "horizontal",
      decorative = true,
      label,
      labelClassName,
      ...props
    },
    ref
  ) => {
    // No label? behave like a normal Radix separator
    if (!label) {
      return (
        <SeparatorPrimitive.Root
          ref={ref}
          data-slot="separator"
          decorative={decorative}
          orientation={orientation}
          className={cn(
            "bg-border shrink-0",
            "data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full",
            "data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
            className
          )}
          {...props}
        />
      );
    }

    // With label: render two lines with centered text
    if (orientation === "vertical") {
      return (
        <div className={cn("flex h-full flex-col items-center", className)}>
          <SeparatorPrimitive.Root
            decorative={decorative}
            orientation="vertical"
            className="bg-border w-px flex-1 border-2 border-primary"
          />
          <span
            className={cn(
              "my-2 select-none text-sm text-muted-foreground",
              labelClassName
            )}
          >
            {label}
          </span>
          <SeparatorPrimitive.Root
            decorative={decorative}
            orientation="vertical"
            className="bg-border w-px flex-1"
          />
        </div>
      );
    }

    // horizontal (default)
    return (
      <div className={cn("flex w-full items-center", className)}>
        <SeparatorPrimitive.Root
          decorative={decorative}
          orientation="horizontal"
          className="bg-border h-px flex-1 border border-primary/50"
        />
        <span
          className={cn(
            "mx-3 select-none text-sm text-muted-foreground font-bold",
            labelClassName
          )}
        >
          {label}
        </span>
        <SeparatorPrimitive.Root
          decorative={decorative}
          orientation="horizontal"
          className="bg-border h-px flex-1 border border-primary/50"
        />
      </div>
    );
  }
);

Separator.displayName = "Separator";

export { Separator };
