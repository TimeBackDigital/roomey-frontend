import { cookies } from "next/headers";
import { BetterUser } from "../type";
import { Session as SessionResponse } from "./auth-client";

const getServerSession = async (): Promise<typeof SessionResponse | null> => {
  try {
    const cookieHeader = (await cookies()).toString();

    const res = await fetch(
      `${process.env.API_URL}/api/auth-roomey/get-session`,
      {
        credentials: "include",
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
          Expires: "0",
          Cookie: cookieHeader,
        },
      }
    );
    const response = (await res.json()) as Promise<
      typeof SessionResponse & {
        user: BetterUser;
      }
    >;
    return response;
  } catch {
    return null;
  }
};

export default getServerSession;
