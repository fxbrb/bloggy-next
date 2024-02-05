"use client"; // Error components must be Client Components

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="h-[80vh] w-full flex items-center flex-col justify-center">
      <div className="flex flex-col gap-4">
        <h2>Une erreur est survenue. Veuillez réessayer plus tard.</h2>
        <Button onClick={() => router.back()}>Revenir en arrière</Button>
      </div>
    </div>
  );
}
