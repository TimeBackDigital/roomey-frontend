// AuthenticatedLayout.tsx
import getServerSession from "@/lib/auth/server-session";
import { authenticationAction } from "@/lib/helper";
import { redirect } from "next/navigation";
import React from "react";

const AuthenticatedLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const session = await getServerSession();

  if (!session) {
    return redirect("/auth");
  }

  const { role, phoneNumberVerified, user_is_onboarded } = session.user;

  if (phoneNumberVerified) {
    return redirect(
      authenticationAction.isPhoneNotVerified(phoneNumberVerified)
    );
  }

  if (!user_is_onboarded) {
    return redirect(
      authenticationAction.isOnboarded(user_is_onboarded, role ?? undefined)
    );
  }

  authenticationAction.authenticated(role ?? "");

  return <>{children}</>;
};

export default AuthenticatedLayout;
