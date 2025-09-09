"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
// Start of Selection
import * as React from "react";

export interface CardWrapperProps
  extends React.ComponentPropsWithoutRef<typeof Card> {
  /** Main title shown in the header */
  title?: string;
  /** Optional description under the title */
  description?: React.ReactNode;
  /** Right-aligned header actions (buttons, menus, etc.) */
  actions?: React.ReactNode;
  /** Optional leading icon/badge in the header */
  icon?: React.ReactNode;
  /** Footer content (buttons, meta, pagination, etc.) */
  footer?: React.ReactNode;
  /** Custom class names for internal sections */
  headerClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
  titleClassName?: string;
  /** Media (image) support */
  image?: React.ReactNode; // fully custom media node (e.g., <Image />)
  imageSrc?: string; // quick path using <img>
  imageAlt?: string;
  imagePosition?: "top" | "left" | "right" | "background"; // default: top
  imageClassName?: string; // applied to <img> or image wrapper
  imageContainerClassName?: string; // outer container around media
  /** Show a loading overlay */
  isLoading?: boolean;
  /** Hover shadow + focus ring */
  hoverable?: boolean;
  /** Shadow intensity */
  elevation?: "none" | "sm" | "md" | "lg";
}

const elevationMap: Record<
  NonNullable<CardWrapperProps["elevation"]>,
  string
> = {
  none: "",
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
};

function Media({
  image,
  imageSrc,
  imageAlt,
  imageClassName,
}: Pick<
  CardWrapperProps,
  "image" | "imageSrc" | "imageAlt" | "imageClassName"
>) {
  if (image) return <>{image}</>;
  if (!imageSrc) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={imageSrc}
      alt={imageAlt ?? ""}
      className={cn("h-full w-full object-cover", imageClassName)}
      loading="lazy"
    />
  );
}

const CardWrapper = React.forwardRef<HTMLDivElement, CardWrapperProps>(
  (
    {
      title,
      description,
      actions,
      icon,
      footer,
      headerClassName,
      contentClassName,
      footerClassName,
      titleClassName,
      className,
      image,
      imageSrc,
      imageAlt,
      imagePosition = "top",
      imageClassName,
      imageContainerClassName,
      isLoading = false,
      hoverable = false,
      elevation = "none",
      children,
      ...props
    },
    ref
  ) => {
    const hasMedia = Boolean(image || imageSrc);

    const HeaderBlock = (title || description || actions || icon) && (
      <CardHeader className={cn("space-y-1", headerClassName)}>
        <div className="flex items-start justify-between gap-2">
          <div className="flex min-w-0 items-start gap-3">
            {icon ? (
              <div className="mt-0.5 shrink-0 rounded-lg bg-muted p-2">
                {icon}
              </div>
            ) : null}
            <div className="min-w-0">
              {title ? (
                <CardTitle className={cn("truncate text-xl", titleClassName)}>
                  {title}
                </CardTitle>
              ) : null}
              {description ? (
                <CardDescription className="line-clamp-2">
                  {description}
                </CardDescription>
              ) : null}
            </div>
          </div>
          {actions ? (
            <div className="flex shrink-0 items-center gap-2">{actions}</div>
          ) : null}
        </div>
      </CardHeader>
    );

    return (
      <Card
        ref={ref}
        className={cn(
          "relative overflow-hidden border bg-card text-card-foreground",
          elevationMap[elevation],
          hoverable &&
            "transition-shadow focus-within:ring-2 focus-within:ring-ring/70 hover:shadow-md",
          className
        )}
        {...props}
      >
        {hasMedia && imagePosition === "background" && (
          <>
            <div className="pointer-events-none absolute inset-0 -z-10">
              <Media
                image={image}
                imageSrc={imageSrc}
                imageAlt={imageAlt}
                imageClassName={cn("h-full w-full", imageClassName)}
              />
            </div>

            <div className="pointer-events-none absolute inset-0 -z-0 bg-gradient-to-b from-background/40 to-background/80" />
          </>
        )}

        {hasMedia && (imagePosition === "left" || imagePosition === "right") ? (
          <div
            className={cn(
              "flex flex-col md:flex-row",
              imagePosition === "right" && "md:flex-row-reverse"
            )}
          >
            <div
              className={cn(
                "md:w-1/3 max-md:h-48",
                "overflow-hidden",
                imageContainerClassName
              )}
            >
              <Media
                image={image}
                imageSrc={imageSrc}
                imageAlt={imageAlt}
                imageClassName={imageClassName}
              />
            </div>
            <div className="flex-1">
              {HeaderBlock}
              <CardContent className={cn(contentClassName)}>
                {children}
              </CardContent>
              {footer ? (
                <CardFooter
                  className={cn(
                    "flex items-center justify-between",
                    footerClassName
                  )}
                >
                  {footer}
                </CardFooter>
              ) : null}
            </div>
          </div>
        ) : (
          // TOP (DEFAULT) LAYOUT
          <>
            {hasMedia && (
              <div
                className={cn(
                  "aspect-video w-full overflow-hidden",
                  imageContainerClassName
                )}
              >
                <Media
                  image={image}
                  imageSrc={imageSrc}
                  imageAlt={imageAlt}
                  imageClassName={imageClassName}
                />
              </div>
            )}
            {HeaderBlock}
            <CardContent className={cn(contentClassName)}>
              {children}
            </CardContent>
            {footer ? (
              <CardFooter
                className={cn(
                  "flex items-center justify-between",
                  footerClassName
                )}
              >
                {footer}
              </CardFooter>
            ) : null}
          </>
        )}

        {isLoading && (
          <div className="absolute inset-0 grid place-items-center bg-background/60 backdrop-blur-sm">
            <Loader2 className="h-5 w-5 animate-spin" />
          </div>
        )}
      </Card>
    );
  }
);

CardWrapper.displayName = "CardWrapper";

export default CardWrapper;
