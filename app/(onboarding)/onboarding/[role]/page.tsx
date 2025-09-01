import ListerRolePage from "@/components/OnboardingPage/OnboardingRolePage/ListerRolePage";
import SeekerRolePage from "@/components/OnboardingPage/OnboardingRolePage/SeekerRolePage";
import { RoleKey } from "@/lib/type";
import { notFound } from "next/navigation";

type props = {
  params: Promise<{ role: RoleKey }>;
};

const page = async ({ params }: props) => {
  const { role } = await params;

  const roleSchema = role;

  if (!roleSchema) {
    return notFound();
  }

  switch (role) {
    case "seeker":
      return <SeekerRolePage />;
    case "lister":
      return <ListerRolePage />;
  }
};

export default page;
