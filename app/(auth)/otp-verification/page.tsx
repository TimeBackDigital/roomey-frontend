import OtpVerificationForm from "@/components/OtpVerificationPage/OtpVerificationPage";
import getServerSession from "@/lib/auth/server-session";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getServerSession();

  if (!session || !session.user) {
    return redirect("/auth");
  }

  if (session.user.phoneNumberVerified) {
    return redirect("/onboarding");
  }

  return (
    <div className="flex flex-col gap-4 min-h-screen h-full px-4">
      <div className="flex flex-1">
        <div className="w-full">
          <OtpVerificationForm />
        </div>
      </div>
    </div>
  );
};

export default page;
