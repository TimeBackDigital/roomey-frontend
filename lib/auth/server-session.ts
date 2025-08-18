import { cookies } from "next/headers";
import { Session as SessionResponse } from "./auth-client";

const getServerSession = async (): Promise<typeof SessionResponse | null> => {
  try {
    const cookieHeader = (await cookies()).toString();

    const res = await fetch(`${process.env.API_URL}/api/auth/get-session`, {
      credentials: "include",
      headers: {
        Cookie: cookieHeader,
      },
    });

    return res.json() as Promise<typeof SessionResponse | null>;
  } catch (error) {
    return null;
  }
};

export default getServerSession;
