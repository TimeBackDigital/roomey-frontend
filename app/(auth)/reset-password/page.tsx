import ResetPassword from "@/components/ResetPasswordPage/ResetPasswordPage";
import { redirect } from "next/navigation";

type ResetPasswordPageProps = {
  searchParams: Promise<{
    token: string;
  }>;
};

const page = async ({ searchParams }: ResetPasswordPageProps) => {
  const token = (await searchParams).token;

  if (!token) {
    return redirect("/login");
  }

  return (
    <div className="grid min-h-svh">
      <div className="flex flex-col gap-4 min-h-screen h-full px-4">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full">
            <ResetPassword token={token} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
