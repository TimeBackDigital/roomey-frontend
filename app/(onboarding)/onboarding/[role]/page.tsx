import OnboardingRolePage from "@/components/OnboardingPage/OnboardingRolePage/OnboardingRolePage";
import { onboardingSchemas } from "@/lib/constant";
import { RoleKey } from "@/lib/type";
import { notFound } from "next/navigation";

type props = {
  params: Promise<{ role: RoleKey }>;
};

const page = async ({ params }: props) => {
  const { role } = await params;

  const roleSchema = onboardingSchemas.find((schema) => schema.role === role);

  if (!roleSchema) {
    return notFound();
  }

  return <OnboardingRolePage role={role} />;
};

export default page;
