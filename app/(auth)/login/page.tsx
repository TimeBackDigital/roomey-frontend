import LoginForm from "@/components/LoginPage/LoginForm";

const page = () => {
  return (
    <div className="flex flex-col gap-4 min-h-screen h-full px-4">
      <div className="flex flex-1">
        <div className="w-full">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default page;
