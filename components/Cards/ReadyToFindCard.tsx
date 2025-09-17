import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { READY_TO_FIND_CARD } from "@/lib/enum";
import Link from "next/link";

type ReadyToFindCardProps = {
  role: string;
  href: string;
};

const ReadyToFindCard = ({ role, href }: ReadyToFindCardProps) => {
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
        <Link href={href} className="w-full">
          <Button className="w-full" size="lg" variant="outline_card">
            {card.cta}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ReadyToFindCard;
