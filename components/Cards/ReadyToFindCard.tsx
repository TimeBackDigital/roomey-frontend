import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { READY_TO_FIND_CARD } from "@/lib/enum";

type ReadyToFindCardProps = {
  role: string;
};

const ReadyToFindCard = ({ role }: ReadyToFindCardProps) => {
  const card = READY_TO_FIND_CARD[role as keyof typeof READY_TO_FIND_CARD];
  return (
    <Card className="text-center max-w-sm mx-auto bg-transparent">
      <CardHeader>
        <CardTitle>
          <h3 className="text-primary">{card.title}</h3>
        </CardTitle>
        <CardDescription>
          <p>{card.description}</p>
        </CardDescription>
      </CardHeader>

      <CardFooter>
        <Button className="w-full" size="lg" variant="outline_card">
          {card.cta}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ReadyToFindCard;
