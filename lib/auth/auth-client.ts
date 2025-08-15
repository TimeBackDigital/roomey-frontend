import { stripeClient } from "@better-auth/stripe/client";
import {
  adminClient,
  emailOTPClient,
  inferAdditionalFields,
  magicLinkClient,
  phoneNumberClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { ac, admin, agency, lister, seeker } from "./permission";

export const authClient = createAuthClient({
  baseURL: `${process.env.NEXT_PUBLIC_APP_URL!}/api/auth`,
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
    phoneNumberClient(),
    emailOTPClient(),
    magicLinkClient(),
    stripeClient({
      subscription: true,
    }),
    inferAdditionalFields({
      user: {
        user_is_onboarded: {
          type: "boolean",
          default: false,
        },
        user_phone_number: {
          type: "string",
          default: null,
          required: false,
        },
        user_phone_number_verified: {
          type: "boolean",
          default: false,
          required: false,
        },
      },
    }),
  ],
});

export const {
  signIn,
  signOut,
  signUp,
  useSession,
  getSession,
  emailOtp,
  stripe,
  subscription,
} = authClient;

export const Session = authClient.$Infer.Session;
