import SeekerPublicPage from "@/components/SeekerPublicPage/SeekerPublicPage";
import getServerSession from "@/lib/auth/server-session";
import { BetterUser } from "@/lib/type";

const page = async () => {
  const session = await getServerSession();

  return <SeekerPublicPage user={session?.user as BetterUser} />;
};

export default page;
