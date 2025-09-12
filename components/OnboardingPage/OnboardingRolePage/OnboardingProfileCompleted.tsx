import PremiumUpgradeCard from "@/components/Cards/PremiumUpgradeCards";
import ReadyToFindCard from "@/components/Cards/ReadyToFindCard";
import { COMPLETE_PROFILE_CARD } from "@/lib/enum";
import ProfileCreationHeader from "./ProfileCreationHeader";

type OnboardingProfileCompletedProps = {
  role: string;
};

const OnboardingProfileCompleted = ({
  role,
}: OnboardingProfileCompletedProps) => {
  const card =
    COMPLETE_PROFILE_CARD[role as keyof typeof COMPLETE_PROFILE_CARD];
  return (
    <>
      <ProfileCreationHeader currentMeta={card.header} />

      <div className="container space-y-4 text-center">
        <div className="flex flex-col items-center justify-center">
          <h2 className="font-semibold">{card.title}</h2>
          <p className="max-w-xs mx-auto"> {card.description}</p>
        </div>

        <PremiumUpgradeCard />
        <ReadyToFindCard href={`/`} role={role} />
      </div>
    </>
  );
};

export default OnboardingProfileCompleted;
