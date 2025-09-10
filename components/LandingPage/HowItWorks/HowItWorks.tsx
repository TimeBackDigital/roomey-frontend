import CardWrapper from "@/components/Card/CardWrapper";
import { MapPinHouse, MessagesSquare, User } from "lucide-react";

const HowItWorks = () => {
  const howItWorks = [
    {
      title: "Search",
      description:
        "Browse verified listings across \nAustralia — from cozy city studios to \nfull house shares.",
      icon: <User className="text-primary size-10" />,
    },
    {
      title: "Chat",
      description:
        "Create a free profile to securely \nmessage with trusted hosts \nor housemates.",
      icon: <MessagesSquare className="text-primary size-10" />,
    },
    {
      title: "Move in.",
      description:
        "Arrange viewings, finalize details, and \nstart your next chapter — confidently.",
      icon: <MapPinHouse className="text-primary size-10" />,
    },
  ];

  return (
    <section className="space-y-10">
      <div className="text-center">
        <h1>How It Works</h1>
        <h2 className="text-muted-foreground font-normal">
          It&apos;s free and easy.
          <br />
          Here&apos;s what you do:
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {howItWorks.map((item) => (
          <CardWrapper
            key={item.title}
            className="bg-primary text-white px-2"
            title={item.title}
            titleClassName="text-3xl pt-2 pl-5"
            icon={item.icon}
          >
            {item.description.split("\n").map((line, index) => (
              <p
                key={index}
                className="text-background-secondary leading-relaxed"
              >
                {line}
              </p>
            ))}
          </CardWrapper>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
