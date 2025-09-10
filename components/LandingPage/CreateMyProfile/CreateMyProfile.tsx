"use client";
import { Button } from "@/components/ui/button";
import { useProtectedRoute } from "@/hooks/use-auth-user";
import Image from "next/image";

const CreateMyProfile = () => {
  const { handleClick } = useProtectedRoute();
  return (
    <section className="w-full space-y-10">
      <div className="relative h-60 w-full">
        <Image
          src="/assets/bg/create_profile.png"
          alt="Couple in their kitchen"
          fill
          className="object-cover"
        />
      </div>

      <div className="space-y-10 text-center">
        <div className="space-y-4">
          <h1 className="leading-tight">
            Trusted by <br />
            Thousands of <br />
            Renters and Hosts
          </h1>

          <ul className="space-y-2 flex flex-col items-start text-lg mx-auto max-w-xs text-left">
            <li className="flex items-start gap-2">
              <span>✓</span>
              <span>Over 10,000 listings reviewed and verified</span>
            </li>
            <li className="flex items-start gap-2">
              <span>✓</span>
              <span>End-to-end encrypted messaging</span>
            </li>
            <li className="flex items-start gap-2">
              <span>✓</span>
              <span>Transparent profiles and community ratings</span>
            </li>
            <li className="flex items-start gap-2">
              <span>✓</span>
              <span>No spam, no bots, no fake listings ever</span>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="font-semibold leading-tight mx-auto max-w-xs">
            Start your Roomey journey
            <br />
            Create your free <br /> Profile today
          </h2>
          <Button
            className="w-full"
            size="lg"
            onClick={() =>
              handleClick({
                name: "Create My Profile",
                href: "/create-profile",
                protected: true,
              })
            }
          >
            Create My Profile
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CreateMyProfile;
