import { authClient } from "@/lib/auth/auth-client";
import { useQuery } from "@tanstack/react-query";

export type Session = Awaited<ReturnType<typeof authClient.getSession>>;

const getSession = () => authClient.getSession();

export const useSessionQuery = () => {
  return useQuery<Session>({
    queryKey: ["session"],
    queryFn: getSession,
    staleTime: 5 * 60_000,
    gcTime: 30 * 60_000,
    refetchOnWindowFocus: false,
  });
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["session"],
    queryFn: getSession,
    select: (session) => session?.data?.user ?? null,
    staleTime: 5 * 60_000,
    gcTime: 30 * 60_000,
    refetchOnWindowFocus: false,
  });
};
