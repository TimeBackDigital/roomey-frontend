import Loguout from "@/components/Logout/Loguout";
import OtpVerificationForm from "@/components/OtpVerificationPage/OtpVerificationPage";
import getServerSession from "@/lib/auth/server-session";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getServerSession();

  if (!session) {
    return redirect("/auth");
  }

  if (session.user.phoneNumberVerified) {
    return redirect("/onboarding");
  }

  return (
    <div className="flex flex-col gap-4 min-h-screen h-full px-4">
      <Loguout />
      <div className="flex flex-1">
        <div className="w-full">
          <OtpVerificationForm />
        </div>
      </div>
    </div>
  );
};

export default page;
