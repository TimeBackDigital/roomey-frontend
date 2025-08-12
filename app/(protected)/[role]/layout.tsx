import getServerSession from "@/lib/auth/server-session";
import React from "react";

type LayoutProps = {
  children: React.ReactNode;
};

const AppLayout = async ({ children }: LayoutProps) => {
  const session = await getServerSession();

  return (
    <div className="relative p-10">
      {" "}
      {/* no min-h-screen */}
      <header className="mb-6 text-xl font-bold capitalize">
        {session?.user.role} Dashboard
      </header>
      {children}
    </div>
  );
};

export default AppLayout;
