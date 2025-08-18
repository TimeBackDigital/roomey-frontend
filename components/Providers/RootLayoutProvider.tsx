// In Next.js, this file would be called: app/providers.tsx
"use client";

// Since QueryClientProvider relies on useContext under the hood, we have to put 'use client' on top
import { BetterUser } from "@/lib/type";
import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { UserProvider } from "./AuthProvider";

const makeQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
};

let browserQueryClient: QueryClient | undefined = undefined;

const getQueryClient = () => {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
};

const RootLayoutProvider = ({
  children,
  user,
}: {
  children: React.ReactNode;
  user: BetterUser;
}) => {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider user={user}>
        <main>{children}</main>
      </UserProvider>
    </QueryClientProvider>
  );
};

export default RootLayoutProvider;
