"use client";

import { authenticationAction } from "@/lib/helper";
import { BetterUser } from "@/lib/type";
import { useUser } from "../Providers/AuthProvider";

const CallbackPage = () => {
  const { user } = useUser();

  authenticationAction.authenticated(user as BetterUser);

  return null;
};

export default CallbackPage;
