"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient, useSession } from "@/lib/auth/auth-client";
import { UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const UserAvatar = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/auth");
        },
      },
    });
  };

  return (
    <div className="flex gap-2 items-center">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2">
          <Avatar className="border-2 border-primary size-8">
            <AvatarImage className="" src={session?.user.image ?? ""} />
            <AvatarFallback>
              <UserIcon />
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col text-center">
            <p className="text-sm font-bold">{session?.user.name}</p>
            <p className="text-xs text-muted-foreground">
              {session?.user.role}
            </p>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={handleSignOut}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserAvatar;
