import { Building2, Home, Search } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const choices = [
  {
    href: "/onboarding/seeker",
    title: "Looking for a Room",
    desc: "Sign up as a seeker to browse available properties, connect with trusted listers, and find your next home.",
    Icon: Search,
  },
  {
    href: "/onboarding/lister",
    title: "List a Room",
    desc: "Create a lister profile to publish your property, manage inquiries, and reach interested seekers.",
    Icon: Home,
  },
  {
    href: "/onboarding/agency",
    title: "List Multiple Properties",
    desc: "Register as an agency to list multiple properties, manage your team, and streamline your operations in one place.",
    Icon: Building2,
  },
];

const OnboardingPage = () => {
  return (
    <div>
      <div role="status" className="text-center pb-4">
        <h3 className="font-semibold">Your number has been verified!</h3>
      </div>

      <header className="mb-6 text-center">
        <h3 className="font-semibold">Welcome to roomey.</h3>
        <p>Choose how you&apos;d like to get started</p>
      </header>

      <div className="space-y-4">
        {choices.map(({ href, title, desc, Icon }) => (
          <Link key={href} href={href} className="block">
            <Card className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Icon className="h-6 w-6" aria-hidden />
                </div>
                <CardTitle className="font-semibold">{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-6 text-muted-foreground">
                  {desc}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default OnboardingPage;
