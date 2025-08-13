"use client";

import { useSessionQuery } from "@/hooks/getUserHook";
import React from "react";

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  useSessionQuery();

  return children;
};

export default UserProvider;
