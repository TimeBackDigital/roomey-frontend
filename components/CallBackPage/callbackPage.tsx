"use client";
import { authenticationAction } from "@/lib/helper";
import { BetterUser } from "@/lib/type";
import { useEffect } from "react";
import { useUser } from "../Providers/AuthProvider";
import PageLoader from "../ui/page-loader";
import RoomeyText from "../ui/roomey";

const CallbackPage = () => {
  const { user } = useUser();

  useEffect(() => {
    authenticationAction.authenticated(user as BetterUser);
  }, [user]);

  return (
    <PageLoader
      text="Please wait a moment"
      subtext="We are verifying your account"
      logo={<RoomeyText />}
    />
  );
};

export default CallbackPage;
