"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Calendar, Heart, MessageSquare, Receipt } from "lucide-react";
import Image from "next/image";
import * as React from "react";

// shadcn carousel
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useProtectedRoute } from "@/hooks/use-auth-user";
import type { EmblaCarouselType } from "embla-carousel";

interface Amenity {
  label: string;
  icon: React.ReactNode;
}

interface ListingCardProps {
  images: string[];
  location: string;
  title: string;
  price: string;
  amenities: Amenity[];
  tags: string[];
  className?: string;
}

const ListingCard = ({
  images,
  location,
  title,
  price,
  amenities,
  tags,
  className,
}: ListingCardProps) => {
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(images?.length ?? 0);
  const { handleClick } = useProtectedRoute();

  const onApi = (api?: EmblaCarouselType) => {
    if (!api) return;
    setCount(api.slideNodes().length);
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  };

  return (
    <Card className={cn("w-full max-w-sm overflow-hidden p-0", className)}>
      <div className="relative">
        <div className="absolute top-4 left-4 z-10 bg-background/90 backdrop-blur-sm rounded-full px-3 py-1">
          <span className="text-sm font-medium text-primary">{location}</span>
        </div>

        <Button
          size="icon"
          variant="ghost"
          onClick={() =>
            handleClick({
              name: "Save",
              href: "/save",
            })
          }
          className="absolute top-4 right-4 z-10 bg-background/90 backdrop-blur-sm rounded-full h-9 w-9 hover:bg-background"
        >
          <Heart className="size-6 text-primary" />
        </Button>

        <div className="relative h-64">
          <Carousel className="h-full" setApi={onApi}>
            <CarouselContent className="h-full -ml-0">
              {images.map((src, idx) => (
                <CarouselItem key={idx} className="h-full basis-full pl-0">
                  <div className="relative h-64 w-full">
                    <Image
                      src={src}
                      alt={`${title} - image ${idx + 1}`}
                      fill
                      className="object-cover"
                      sizes="400px"
                      priority={idx === 0}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full border-0" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full border-0" />
          </Carousel>

          {count > 1 && (
            <div className="absolute inset-x-0 bottom-4 flex items-center justify-center gap-1">
              {Array.from({ length: count }).map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    "h-1.5 w-1.5 rounded-full transition-all",
                    i === current ? "bg-background w-4" : "bg-background/60"
                  )}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <CardContent className="p-6 space-y-4">
        <h3 className="text-xl font-bold text-secondary leading-tight">
          {title}
        </h3>

        <div className="grid grid-cols-2 gap-3">
          {amenities.map((amenity, idx) => (
            <div key={idx} className="flex items-center gap-2 text-primary">
              <span className="text-primary">{amenity.icon}</span>
              <span className="text-md font-medium">{amenity.label}</span>
            </div>
          ))}
        </div>

        <hr className="border-gray-200" />

        <div>
          <div className="flex items-start justify-between">
            <div className="flex-1 text-2xl font-bold text-secondary">
              {price}
              <span className="text-md font-normal text-primary">
                {" "}
                / per week
              </span>
            </div>
            <Button
              size="lg"
              className="flex-0 bg-primary w-full"
              onClick={() =>
                handleClick({
                  name: "Message",
                  href: "/message",
                })
              }
            >
              <MessageSquare className="size-6" /> Message
            </Button>
          </div>

          <div className="space-y-2">
            {tags.map((tag, i) => (
              <div key={i} className="flex items-center gap-2 text-primary">
                <span>
                  {i === 0 && <Receipt className="size-6" />}
                  {i === 1 && <Calendar className="size-6" />}
                </span>
                <span className="text-sm font-medium">{tag}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ListingCard;
