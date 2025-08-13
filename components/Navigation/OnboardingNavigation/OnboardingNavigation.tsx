import OnboardingMenu from "./OnboardingMenu";

const OnboardingNavigation = () => {
  return (
    <nav className="flex justify-between items-center border-b border-2 p-4">
      <div className="flex items-center gap-2">
        <h2>roomey.</h2>
      </div>

      <OnboardingMenu />
    </nav>
  );
};

export default OnboardingNavigation;
