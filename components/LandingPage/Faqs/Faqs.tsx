"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useProtectedRoute } from "@/hooks/use-auth-user";

const Faqs = () => {
  const { handleClick } = useProtectedRoute();
  const items = [
    {
      id: "1",
      title: "What is Roomey?",
      content: "test",
    },
    {
      id: "2",
      title: "Is Roomey free to use? ",
      content: "test",
    },
    {
      id: "3",
      title: "Do I need an account to browse?",
      content: "test",
    },
    {
      id: "4",
      title: "What’s the difference between Seeker and Lister accounts?",
      content: "test",
    },
    {
      id: "5",
      title: "How do I know the listings are real?",
      content: "test",
    },
    {
      id: "6",
      title: "Can I message someone right away?",
      content: "test",
    },
    {
      id: "7",
      title: "What makes Roomey secure?",
      content: "test",
    },
  ];

  return (
    <section>
      <div className="text-center pb-10">
        <h1 className="leading-tight">Frequently Asked Questions</h1>
        <h2 className="text-muted-foreground font-normal">
          Everything You Need to Know
        </h2>
      </div>
      <div className="max-w-xs mx-auto">
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="3"
        >
          {items.map((item) => (
            <AccordionItem value={item.id} key={item.id}>
              <AccordionTrigger className="font-bold ">
                {item.id}. {item.title}
              </AccordionTrigger>
              <AccordionContent className="text-secondary pb-2">
                {item.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <Button
        className="w-full"
        size="lg"
        variant="outline"
        onClick={() =>
          handleClick({
            name: "See More",
            href: "/faqs",
            protected: true,
          })
        }
      >
        See More
      </Button>
    </section>
  );
};

export default Faqs;
