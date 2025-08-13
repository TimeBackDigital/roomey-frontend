import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-md font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background border-2 border-primary shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/90",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        // add padding tweak if an icon span is present
        default: "h-9 px-4 py-2 has-[>svg]:px-3 has-[>[data-slot=icon]]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5 has-[>[data-slot=icon]]:px-2.5",
        lg: "h-12 rounded-md px-6 has-[>svg]:px-4 has-[>[data-slot=icon]]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// We’ll style any nested SVGs (icon components) nicely
const iconInner =
  "pointer-events-none [&>svg]:shrink-0 [&>svg:not([class*='size-'])]:size-4 text-current";

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    /** Optional icon rendered on the left */
    iconLeft?: React.ReactNode;
    /** Optional icon rendered on the right */
    iconRight?: React.ReactNode;
  };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      iconLeft,
      iconRight,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        data-slot="button"
        className={cn(
          // also keep svg styling at the root so raw <svg> children still look good
          "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 relative",
          buttonVariants({ variant, size, className })
        )}
        {...props}
      >
        {iconLeft && (
          <span
            data-slot="icon"
            className={"absolute left-5 top-1/2 -translate-y-1/2"}
            aria-hidden="true"
          >
            {iconLeft}
          </span>
        )}
        {children}
        {iconRight && (
          <span data-slot="icon" className={iconInner} aria-hidden="true">
            {iconRight}
          </span>
        )}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
