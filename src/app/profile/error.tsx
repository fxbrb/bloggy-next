"use client"; // Error components must be Client Components

import { useEffect } from "react";
import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <Alert variant="destructive" className="max-w-2xl mx-auto my-16">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        <div className="flex flex-col gap-6">
          Vous devez avoir un compte pour accéder à cette page.
          <Button asChild className="w-fit">
            <Link href="/sign-in">Se connecter</Link>
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
}
