"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <section className="bg-background">
      <div className="container flex items-center h-[calc(100vh-5rem)] px-6 py-12 mx-auto">
        <div className="flex flex-col items-center max-w-sm mx-auto text-center">
          <p className="p-3 text-sm font-medium bg-secondary rounded-full text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-primary md:text-3xl">
            Page non trouvee
          </h1>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            La page que vous recherchez nexiste pas. Voici quelques liens utiles
            :
          </p>

          <div className="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
            <Button
              variant="outline"
              onClick={() => {
                router.back();
              }}
            >
              <ArrowLeft className="w-6 h-6 mr-2" />
              Retour
            </Button>

            <Button
              onClick={() => {
                router.push("/");
              }}
            >
              Page dacceuil
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
