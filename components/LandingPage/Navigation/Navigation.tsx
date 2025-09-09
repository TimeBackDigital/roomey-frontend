"use client";

import { Button } from "@/components/ui/button";
import { useProtectedRoute } from "@/hooks/use-auth-user";
import { Bell, Home, MessageSquareText, UserCircle } from "lucide-react";

export default function BottomNav() {
  const { handleClick } = useProtectedRoute();

  const navItems = [
    {
      name: "Home",
      icon: <Home className="size-6 text-black" />,
      href: "/",
      protected: false,
    },
    {
      name: "Posts",
      icon: <MessageSquareText className="size-6 text-black" />,
      href: "/posts",
      protected: true,
    },
    {
      name: "Notifications",
      icon: <Bell className="size-6 text-black" />,
      href: "/notifications",
      protected: true,
    },
    {
      name: "Profile",
      icon: <UserCircle className="size-6 text-black" />,
      href: "/profile",
      protected: true,
    },
  ];

  return (
    <>
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 bg-background-secondary shadow-lg w-full py-4 border-t z-20">
        <ul className="flex justify-around items-center">
          {navItems.map((item) => (
            <li key={item.name}>
              <Button
                onClick={() => handleClick(item)}
                variant="ghost"
                className="flex flex-col items-center justify-center"
              >
                {item.icon}
              </Button>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
