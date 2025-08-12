"use client";

import { authClient, signOut, useSession } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const DashboardPage = () => {
  const router = useRouter();

  const { data: session } = useSession();

  const handleSignOut = async () => {
    await signOut();

    router.refresh();
  };

  const handleChangeRole = async () => {
    await authClient.admin.setRole({
      userId: session?.user?.id ?? "",
      role: "seeker",
    });

    router.refresh();
  };

  const handleCreatePortalSession = async () => {
    const { data: subscriptions } = await authClient.subscription.list();

    await authClient.subscription.upgrade({
      plan: "qweqweqeqwe",
      subscriptionId: subscriptions?.[0]?.stripeSubscriptionId ?? "",
      metadata: {
        userId: session?.user?.id,
        email: session?.user?.email,
      },
      successUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`, // required
      cancelUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`, // required
      returnUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
      disableRedirect: false, // required
    });
  };

  const handleCancelSubscription = async () => {
    await authClient.subscription.cancel({
      returnUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
    });
  };

  const handleReactivateSubscription = async () => {
    await authClient.subscription.restore();
  };

  return (
    <div className="">
      <h1>Dashboard</h1>
      <p>{session?.user?.email}</p>

      <div className="flex gap-2">
        <Button onClick={handleSignOut}>Sign Out</Button>

        <Button onClick={handleCreatePortalSession}>test</Button>
        <Button onClick={handleCancelSubscription}>Cancel Subscription</Button>

        <Button onClick={handleReactivateSubscription}>
          Reactivate Subscription
        </Button>

        <Button onClick={handleChangeRole}>Change Role</Button>
      </div>
    </div>
  );
};

export default DashboardPage;
