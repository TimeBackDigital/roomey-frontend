// context/UserContext.tsx
"use client";

import { BetterUser } from "@/lib/type";
import { createContext, ReactNode, useContext, useState } from "react";

type UserContextType = {
  user: BetterUser | null;
  setUser: (user: BetterUser | null) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({
  children,
  user,
}: {
  children: ReactNode;
  user: BetterUser | null;
}) => {
  const [userState, setUserState] = useState<BetterUser | null>(user);

  return (
    <UserContext.Provider value={{ user: userState, setUser: setUserState }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
