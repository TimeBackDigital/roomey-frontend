import { stripeClient } from "@better-auth/stripe/client";
import {
  adminClient,
  emailOTPClient,
  magicLinkClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { ac, admin, agency, lister, seeker } from "./permission";

export const authClient = createAuthClient({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL!}/api/auth`,
  fetchOptions: {
    credentials: "include",
    redirect: "follow",
  },
  plugins: [
    adminClient({
      ac,
      roles: {
        admin,
        agency,
        seeker,
        lister,
      },
    }),
    emailOTPClient(),
    magicLinkClient(),
    stripeClient({
      subscription: true,
    }),
  ],
});

export const {
  signIn,
  signOut,
  signUp,
  useSession,
  emailOtp,
  stripe,
  subscription,
} = authClient;

export const Session = authClient.$Infer.Session;
