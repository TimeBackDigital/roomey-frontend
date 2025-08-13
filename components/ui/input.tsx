import { cn } from "@/lib/utils";
import * as React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  icon?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", icon, ...props }, ref) => {
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
            "flex h-10 w-full min-w-0 rounded-md border border-primary bg-transparent px-3 py-1 text-lg md:text-sm",
            "shadow-xs outline-none transition-[color,box-shadow]",
            "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
            "placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground",
            "focus-visible:border-ring focus-visible:ring-[1px] focus-visible:ring-ring/50",
            "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
            "dark:bg-input/30",
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
