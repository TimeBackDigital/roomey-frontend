import getServerSession from "@/lib/auth/server-session";
import { ExtractFirstLetterRole } from "@/lib/utils";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getServerSession();

  if (session?.user.user_is_onboarded) {
    redirect(
      `/${ExtractFirstLetterRole(session?.user.role as string)}/dashboard`
    );
  }

  return <div>OnboardingPage</div>;
};

export default page;
