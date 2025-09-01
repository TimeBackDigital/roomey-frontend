import RegisterForm from "@/components/RegisterPage/RegisterForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register – Roomey",
  description:
    "Create your Roomey account to start exploring properties for rent or sale. Register now to save your favorite listings, receive alerts, and connect with trusted real estate agents.",
  keywords: [
    "Roomey register",
    "real estate signup",
    "create account",
    "property registration",
    "join Roomey",
    "sign up for property search",
    "home buyer registration",
    "real estate platform sign up",
  ],
  authors: [{ name: "Roomey Team" }],
  creator: "Roomey",
  publisher: "Roomey",
};

const page = () => {
  return (
    <div className="px-4">
      <RegisterForm />
    </div>
  );
};

export default page;
