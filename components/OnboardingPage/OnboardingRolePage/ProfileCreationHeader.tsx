"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  currentMeta: string;
  onBack?: () => void;
};

const ProfileCreationHeader = ({ currentMeta, onBack }: Props) => {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      return onBack();
    }
    router.back();
  };

  return (
    <div className="bg-primary h-14 block flex items-center justify-center relative border-2">
      <div className="flex items-center gap-2">
        <div onClick={handleBack} className="absolute left-4 cursor-pointer">
          <ArrowLeft className="size-4 text-white" />
        </div>
        <div className="text-white text-lg font-medium">{currentMeta}</div>
      </div>
    </div>
  );
};

export default ProfileCreationHeader;
