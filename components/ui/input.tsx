import { cn } from "@/lib/utils";
import * as React from "react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  icon?: React.ReactNode;
  variant?: "default" | "outline" | "filter";
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", icon, variant = "default", ...props }, ref) => {
    const variantType = {
      default: {
        className: cn(
          "flex h-10 w-full min-w-0 rounded-sm border border-border bg-background-secondary px-3 py-1 text-lg md:text-sm",
          "shadow-xs outline-none transition-[color,box-shadow]",
          "file:inline-flex file:h-7 file:border-0 file:bg-background-secondary file:text-sm file:font-medium",
          "placeholder:text-primary/40 selection:bg-background-secondary selection:text-background-secondary",
          "focus-visible:border-ring focus-visible:ring-[1px] focus-visible:ring-ring/50",
          "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
          "dark:bg-input/30"
        ),
      },
      filter: {
        className: cn(
          "flex h-9 w-full min-w-0 rounded-md border border-primary bg-transparent px-3 py-1 text-lg md:text-sm",
          "shadow-xs outline-none transition-[color,box-shadow]",
          "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
          "placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground",
          "focus-visible:border-ring focus-visible:ring-[1px] focus-visible:ring-ring/50",
          "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
          "dark:bg-input/30"
        ),
      },
      outline: {
        className: cn(
          "flex h-10 w-full min-w-0 text-background rounded-md border border-background bg-transparent px-3 py-1 text-lg md:text-sm",
          "shadow-xs outline-none transition-[color,box-shadow]",
          "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
          "placeholder:text-background selection:bg-background selection:text-background",
          "focus-visible:border-white focus-visible:ring-[1px] focus-visible:ring-background/50",
          "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
          "dark:bg-input/30"
        ),
      },
    };
    return (
      <div className="relative">
        {icon && (
          <span
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          >
            {icon}
          </span>
        )}
        <input
          ref={ref}
          type={type}
          data-slot="input"
          className={cn(
            variantType[variant].className,
            icon && "pl-10", // <- add left padding when icon is present
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
