import RoomeyText from "@/components/ui/roomey";
import { Separator } from "@/components/ui/separator";
import { Facebook, Instagram, Linkedin, X } from "lucide-react";
import Image from "next/image";

export default function RoomeyLanding() {
  const cities = {
    Sydney: ["Bondi", "Parramatta", "Surry Hills"],
    Melbourne: ["St Kilda", "Fitzroy", "Richmond"],
    Brisbane: ["South Bank", "Fortitude Valley", "West End"],
    Perth: ["Subiaco", "Fremantle", "Leederville"],
    Adelaide: ["CBD", "Glenelg", "Norwood"],
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-background ">
      {/* Top Section */}
      <div className="bg-primary px-6 pt-10 h-[60vh]">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between h-full">
          <div className="text-start space-y-4 max-w-md">
            <h2 className="text-background-secondary text-2xl font-semibold">
              Know Someone Looking for a Room?
            </h2>
            <p className="text-background-secondary text-sm">
              Even if you&apos;re not searching, someone you know might be. Help
              them find their next home by sharing Roomey.
            </p>
          </div>

          <div className="mt-6 md:mt-0">
            <Image
              src="/assets/avatar/onboarding_avatar.webp"
              width={300}
              height={300}
              alt="Woman holding phone"
              className="mx-auto"
              priority
              quality={100}
            />
          </div>
        </div>
      </div>

      <div className="max-w-6xl sm:max-w-none mx-auto px-6  w-full bg-background-tertiary pb-24">
        <RoomeyText className="text-background-secondary text-center pt-8" />
        <Separator className="my-4 bg-muted" />

        <div className="flex justify-center items-center gap-4 py-8">
          <span className="text-background-secondary text-sm font-medium">
            Follow us
          </span>

          <div className="flex gap-4">
            {[
              {
                name: "Facebook",
                icon: <Facebook className="size-5 text-white" fill="white" />,
                href: "# ",
              },
              {
                name: "X",
                icon: <X className="size-5 text-white" fill="white" />,
                href: "#",
              },
              {
                name: "LinkedIn",
                icon: <Linkedin className="size-5 text-white" fill="white" />,
                href: "#",
              },
              {
                name: "Instagram",
                icon: <Instagram className="size-5 text-white" />,
                href: "#",
              },
            ].map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-white hover:bg-white/10 transition"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        <Separator className="my-4 bg-muted" />

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {Object.entries(cities).map(([city, suburbs]) => (
            <div key={city} className="text-start">
              <h3 className="text-xl font-bold mb-4 text-white">{city}</h3>
              <ul className="space-y-2">
                {suburbs.map((suburb) => (
                  <li
                    key={suburb}
                    className="text-gray-300 hover:text-white cursor-pointer transition-colors"
                  >
                    {suburb}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center text-background-secondary space-y-2">
          <p className="text-background-secondary">
            © 2025{" "}
            <span className="text-background-secondary font-bold">roomey.</span>
          </p>
          <p className="text-background-secondary">
            Designed & Developed by TnmeStock Digital
          </p>
        </div>
      </div>
    </div>
  );
}
