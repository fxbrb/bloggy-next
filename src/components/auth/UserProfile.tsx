import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { getAuthSession } from "@/lib/getUser";
import Link from "next/link";
import { Lock, User2 } from "lucide-react";

import DropdownMenuItemLogout from "./DropdownMenuItemLogout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserProfile = async () => {
  const session = await getAuthSession();

  console.log(session);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Avatar className="w-6 h-6 mr-2">
            <AvatarFallback>
              {session?.user?.firstname?.split("")[0]}
              {session?.user?.lastname?.split("")[0]}
            </AvatarFallback>
            {session?.user.image && (
              <AvatarImage src={session?.user.image} alt="user image" />
            )}
          </Avatar>
          {session?.user.firstname ?? ""}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href="/profile">
            <User2 className="mr-2 h-4 w-4" />
            Profile
          </Link>
        </DropdownMenuItem>
        {session?.user.role === "ADMIN" && (
          <DropdownMenuItem asChild>
            <Link href="/admin">
              <Lock className="mr-2 h-4 w-4" />
              Admin
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItemLogout />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfile;
