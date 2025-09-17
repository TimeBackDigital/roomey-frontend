"use client";

import { HousePlus, ShieldCheck, UserSearch } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import ProfileCreationHeader from "./OnboardingRolePage/ProfileCreationHeader";

const choices = [
  {
    href: "/onboarding/seeker",
    title: "Find a Room",
    desc: `Create your profile, connect with trusted listers and find a room fast."`,
    subdesc: `Every account confirmed.`,
    Icon: UserSearch,
  },
  {
    href: "/onboarding/lister",
    title: "List a Room",
    desc: "Create your listing, connect with trusted seekers, and fill your room fast.",
    subdesc: `Every account confirmed.`,
    Icon: HousePlus,
  },
];

const OnboardingPage = () => {
  return (
    <>
      <ProfileCreationHeader currentMeta="Create Profile" />
      <div className="container">
        <div role="status" className="text-center pb-4">
          <div className="text-[40px]">🎉</div>
          <h2>You&apos;re all set!</h2>
        </div>

        <header className="mb-6 space-y-2 text-center">
          <h3 className="text-primary">Welcome to the roomey community!</h3>
          <p className="tracking widest">How can we help you today?</p>
        </header>
        <div className="flex flex-col gap-4">
          <Card className="py-3">
            <CardHeader className="flex items-center gap-4">
              <ShieldCheck className="h-10 w-10 text-primary" />
              <div className="flex flex-col text-muted-foreground">
                <h3 className="text-sm ">We care about your safety:</h3>
                <p className="sub-p">
                  Every user has email, phone and location checked Report
                  anything suspicious.
                </p>
              </div>
            </CardHeader>
          </Card>

          <div className="space-y-4">
            {choices.map(({ href, title, desc, subdesc, Icon }) => (
              <Link key={href} href={href} className="block">
                <Card className="hover:shadow-lg transition-shadow duration-200">
                  <CardHeader className="flex items-center gap-3 ">
                    <div className="bg-primary p-1 rounded-md">
                      <Icon stroke="white" className="h-8 w-8" aria-hidden />
                    </div>
                    <CardTitle className="font-semibold text-primary text-xl">
                      {title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p>{desc}</p>
                    <p className="sub-p italic">{subdesc}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default OnboardingPage;
