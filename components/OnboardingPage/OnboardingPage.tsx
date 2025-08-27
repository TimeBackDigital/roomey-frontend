import { HousePlus, UserSearch } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const choices = [
  {
    href: "/onboarding/seeker",
    title: "Find a Room",
    desc: `Browse rooms, connect with trusted listers, and find your "perfect room sweet room"`,
    Icon: UserSearch,
  },
  {
    href: "/onboarding/lister",
    title: "List a Room",
    desc: "Post your space, chat with seekers, and get that room rented faster than you say 'Do you have Wi-Fi?",
    Icon: HousePlus,
  },
];

const OnboardingPage = () => {
  return (
    <div>
      <div role="status" className="text-center pb-4">
        <h3 className="font-semibold text-[60px]">🎉</h3>
        <h3 className="font-semibold text-2xl">You&apos;re all set!</h3>
      </div>

      <header className="mb-6 text-center space-y-2">
        <h3 className="text-xl text-primary">
          Welcome to the roomey community!
        </h3>
        <p>How can we help you today?</p>
      </header>

      <div className="space-y-4">
        {choices.map(({ href, title, desc, Icon }) => (
          <Link key={href} href={href} className="block">
            <Card className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="flex items-center gap-2">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Icon className="h-8 w-8" aria-hidden />
                </div>
                <CardTitle className="font-semibold text-primary text-2xl">
                  {title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <h3 className="text-md font-semibold text-primary">{desc}</h3>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default OnboardingPage;
