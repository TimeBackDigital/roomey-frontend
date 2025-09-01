import OnboardingProfileCompleted from "@/components/OnboardingPage/OnboardingRolePage/OnboardingProfileCompleted";

const page = async (params: { params: Promise<{ role: string }> }) => {
  const { role } = await params.params;
  return <OnboardingProfileCompleted role={role} />;
};

export default page;
