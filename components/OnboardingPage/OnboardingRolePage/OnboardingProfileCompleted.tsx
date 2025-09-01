import PremiumUpgradeCard from "@/components/Cards/PremiumUpgradeCards";
import ReadyToFindCard from "@/components/Cards/ReadyToFindCard";
import ProfileCreationHeader from "./ProfileCreationHeader";

const OnboardingProfileCompleted = () => {
  return (
    <>
      <ProfileCreationHeader currentMeta={"Profile Completed"} />

      <div className="container space-y-4">
        <div className="flex flex-col items-center justify-center">
          <h2 className="font-semibold">Profile Complete!</h2>
          <p>You&apos;re all set to start your search.</p>
        </div>

        <PremiumUpgradeCard />
        <ReadyToFindCard />
      </div>
    </>
  );
};

export default OnboardingProfileCompleted;
