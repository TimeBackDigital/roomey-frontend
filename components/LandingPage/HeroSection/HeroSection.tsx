"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useProtectedRoute } from "@/hooks/use-auth-user";
import { Search } from "lucide-react";
import Image from "next/image";

const HeroSection = () => {
  const { handleClick } = useProtectedRoute();
  return (
    <Card className="relative overflow-hidden rounded-2xl">
      <Image
        src="/assets/bg/hero_section.webp"
        alt="Hero Section"
        fill
        priority
        className="object-cover object-top"
      />

      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-black/20 via-black/30 to-transparent" />

      <div className="relative z-20 flex min-h-[80vh] flex-col justify-between">
        <CardHeader className="w-full text-center">
          <CardTitle>
            <h1 className="text-4xl font-bold leading-tight text-shadow-lg/20  text-background">
              Find a Room <br />
              in a Share House
            </h1>
          </CardTitle>
          <CardDescription>
            <h3 className=" font-normal drop-shadow text-background/90 text-shadow-lg px-6">
              Discover Your Perfect Room: Choose From Our Fully Furnished,
              Modern, and Stylish Shared <br />
              Houses Today!
            </h3>
          </CardDescription>
        </CardHeader>

        <CardContent className="w-full space-y-4">
          <Input
            variant="outline"
            icon={<Search className="w-4 h-4 text-background" />}
            placeholder="Search City, Suburb"
            className="w-full bg-background/20 border-border h-10"
          />
          <Button
            size="lg"
            className="w-full text-center"
            onClick={() =>
              handleClick({
                name: "Find a Room",
                href: "/posts",
                icon: <Search className="w-4 h-4" />,
              })
            }
          >
            <Search className="w-4 h-4" />
            Find a Room
          </Button>
        </CardContent>
      </div>
    </Card>
  );
};

export default HeroSection;
