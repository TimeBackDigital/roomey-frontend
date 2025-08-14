"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/getUserHook";
import { UserIcon } from "lucide-react";

const UserAvatar = () => {
  const { data: session } = useCurrentUser();

  return (
    <div className="flex gap-2 items-center">
      <Avatar className="border-2 border-primary size-8">
        <AvatarImage className="" src={session?.image ?? ""} />
        <AvatarFallback>
          <UserIcon />
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-col text-center">
        <p className="text-sm font-bold">{session?.name}</p>
        <p className="text-xs text-muted-foreground">{session?.role}</p>
      </div>
    </div>
  );
};

export default UserAvatar;
