import OnboardingPage from "@/components/OnboardingPage/OnboardingPage";
import getServerSession from "@/lib/auth/server-session";
import { authenticationAction } from "@/lib/helper";
import { BetterUser } from "@/lib/type";

const page = async () => {
  const user = await getServerSession();

  authenticationAction.checkOnboardingAccess(user?.user as BetterUser);

  return <OnboardingPage />;
};

export default page;
