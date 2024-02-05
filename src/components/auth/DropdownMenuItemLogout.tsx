"use client";

import React, { useTransition } from "react";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import { Loader } from "../ui/loader";
import { LogOut } from "lucide-react";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { toast } from "sonner";

const DropdownMenuItemLogout = () => {
  const [isPending, startTransition] = useTransition();
  return (
    <DropdownMenuItem
      onClick={() => {
        startTransition(() => {
          signOut({
            callbackUrl: "/sign-in",
          });
        });
      }}
    >
      {isPending ? (
        <Loader className="mr-2 w-4 h-4" />
      ) : (
        <LogOut className="mr-2 w-4 h-4" />
      )}
      Se déconnecter
    </DropdownMenuItem>
  );
};

export default DropdownMenuItemLogout;
