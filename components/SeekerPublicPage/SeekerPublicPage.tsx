import { BetterUser } from "@/lib/type";
import PublicPage from "./PublicPage/PublicPage";
import SeekerPage from "./SeekerPage/SeekerPage";

interface Props {
  user: BetterUser;
}

const SeekerPublicPage = ({ user }: Props) => {
  return user ? <SeekerPage /> : <PublicPage />;
};

export default SeekerPublicPage;
