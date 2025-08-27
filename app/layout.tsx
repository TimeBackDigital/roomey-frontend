import RootLayoutProvider from "@/components/Providers/RootLayoutProvider";
import getServerSession from "@/lib/auth/server-session";
import { BetterUser } from "@/lib/type";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Roomey – Find Your Perfect Home",
  description:
    "Roomey is your trusted real estate platform for finding, renting, or buying properties. Explore listings, compare prices, and connect with verified agents all in one place.",
  keywords: [
    "Roomey",
    "real estate",
    "property listings",
    "buy house",
    "rent apartment",
    "homes for sale",
    "property search",
    "real estate agents",
  ],
  authors: [{ name: "Roomey Team" }],
  creator: "Roomey",
  publisher: "Roomey",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html lang="en" className="light">
      <body className={`${geistSans.variable} antialiased`}>
        <RootLayoutProvider user={session?.user as BetterUser}>
          {children}
        </RootLayoutProvider>
        <Toaster
          toastOptions={{
            duration: 3000,
            position: "top-right",
          }}
        />
      </body>
    </html>
  );
}
