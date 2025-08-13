import AuthForm from "@/components/AuthPage/AuthPage";

const page = () => {
  return (
    <div className="flex flex-col gap-4 min-h-screen h-full container">
      <div className="flex flex-1">
        <div className="w-full">
          <AuthForm />
        </div>
      </div>
    </div>
  );
};

export default page;
