"use client";

import React, { useTransition } from "react";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { Loader } from "../ui/loader";
import { toast } from "sonner";

const LogoutButton = () => {
  const [isPending, startTransition] = useTransition();
  return (
    <Button
      onClick={() => {
        startTransition(() => {
          signOut({
            callbackUrl: "/sign-in",
          });
        });
      }}
      className="w-full"
      variant="destructive"
    >
      {isPending ? (
        <Loader className="mr-2 w-4 h-4" />
      ) : (
        <LogOut className="mr-2 w-4 h-4" />
      )}
      Se déconnecter
    </Button>
  );
};

export default LogoutButton;
