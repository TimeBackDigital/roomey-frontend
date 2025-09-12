import OnboardingProfileCompleted from "@/components/OnboardingPage/OnboardingRolePage/OnboardingProfileCompleted";
import getServerSession from "@/lib/auth/server-session";
import { authenticationAction } from "@/lib/helper";
import { BetterUser } from "@/lib/type";

const page = async () => {
  const user = await getServerSession();

  authenticationAction.completedOnboarding(user?.user as BetterUser);
  return <OnboardingProfileCompleted role={user?.user.role as string} />;
};

export default page;
