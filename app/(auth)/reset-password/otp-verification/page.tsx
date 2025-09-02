import ForgotPasswordOtpVerification from "@/components/ForgotPasswordPage/ForgotPasswordOtpVerification";

type Props = {
  searchParams: Promise<{
    phoneNumber: string;
  }>;
};

const page = async ({ searchParams }: Props) => {
  const phoneNumber = (await searchParams).phoneNumber;
  return (
    <div className="flex flex-col gap-4 min-h-screen h-full px-4">
      <div className="flex flex-1">
        <div className="w-full">
          <ForgotPasswordOtpVerification phoneNumber={phoneNumber} />
        </div>
      </div>
    </div>
  );
};

export default page;
