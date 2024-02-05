import { getAuthSession } from "@/lib/getUser";
import { redirect } from "next/navigation";
import React, { PropsWithChildren } from "react";

export default async function AuthLayout({ children }: PropsWithChildren) {
  const session = await getAuthSession();

  if (session?.user.id) {
    redirect("/");
  }

  return (
    <div className="relative h-fit flex flex-col lg:flex-row gap-20 lg:gap-10 items-center justify-center lg:px-0">
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[420px]">
          {children}
        </div>
      </div>
    </div>
  );
}
