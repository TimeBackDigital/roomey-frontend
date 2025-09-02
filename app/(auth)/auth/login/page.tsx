import LoginForm from "@/components/LoginPage/LoginForm";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login – Roomey",
  description:
    "Access your Roomey account to manage property listings, save favorites, and connect with real estate agents. Secure and easy login for home seekers and sellers.",
  keywords: [
    "Roomey login",
    "real estate login",
    "property account access",
    "manage listings",
    "home seeker login",
    "real estate portal login",
    "Roomey account",
    "login page",
  ],
  authors: [{ name: "Roomey Team" }],
  creator: "Roomey",
  publisher: "Roomey",
};

const page = () => {
  return (
    <div className="px-4">
      <LoginForm />
    </div>
  );
};

export default page;
