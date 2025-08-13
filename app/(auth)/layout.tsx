"use client";
import React from "react";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="fixed top-14 -translate-y-1/2">roomey.</h1>
      </div>
      {children}
    </div>
  );
};

export default PublicLayout;
