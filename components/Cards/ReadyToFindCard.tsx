import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ReadyToFindCard = () => {
  return (
    <Card className="text-center max-w-sm mx-auto bg-transparent">
      <CardHeader>
        <CardTitle>
          <h3 className="text-primary">Ready to Find Your New Place?</h3>
        </CardTitle>
        <CardDescription>
          <p>
            Your profile&apos;s ready—time to find a room that fits your vibe
            and meet future housemates
          </p>
        </CardDescription>
      </CardHeader>

      <CardFooter>
        <Button className="w-full" size="lg" variant="outline_card">
          Search Available Rooms
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ReadyToFindCard;
