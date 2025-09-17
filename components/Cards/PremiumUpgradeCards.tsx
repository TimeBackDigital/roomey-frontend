import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const PremiumUpgradeCard = () => {
  const plans: {
    name: string;
    price: string;
    pricePerMonth: string;
    pricePerYear: string;
  }[] = [
    {
      name: "Premium",
      price: "$29.95",
      pricePerMonth: "$29.95",
      pricePerYear: "$299",
    },

    {
      name: "Premium Plus",
      price: "$29.95",
      pricePerMonth: "$29.95",
      pricePerYear: "$299",
    },
  ];
  return (
    <Card className="text-center max-w-sm mx-auto bg-card-foreground">
      <CardHeader>
        <CardTitle>
          <h3 className="text-primary">Unlock Premium</h3>
        </CardTitle>
        <CardDescription>
          <p className="font-semibold">
            Get seen first and reply without limits. Your profile shows a
            Premium badge, so people know you&apos;re serious.
          </p>
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-2">
        <ul className="text-sm text-muted-foreground space-y-1 text-start w-fit list-disc list-inside">
          <li>Premium badge on your profile & chats</li>
          <li>Unlimited messages (free plan: 3 per day)</li>
          <li>Higher placement in search results</li>
        </ul>

        <div className="flex gap-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="border rounded-lg px-4 py-4 text-sm flex-1 space-y-1 bg-accent text-primary"
            >
              <div className="font-semibold">{plan.price}</div>
              <div className="text-xs">per month</div>
            </div>
          ))}
        </div>

        <p className="text-xs text-muted-foreground italic">(Cancel Anytime)</p>
      </CardContent>

      <CardFooter>
        <Button className="w-full" size="lg">
          Upgrade to Premium
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PremiumUpgradeCard;
