import AuthForm from "@/components/AuthPage/AuthPage";
import Image from "next/image";

const page = () => {
  return (
    <div className="flex flex-col gap-4 min-h-screen h-full container">
      <Image
        src="/assets/bg/auth_bg.webp"
        alt="auth background image"
        quality={100}
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="flex flex-1">
        <div className="w-full">
          <AuthForm />
        </div>
      </div>
    </div>
  );
};

export default page;
