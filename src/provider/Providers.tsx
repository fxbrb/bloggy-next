"use client";

import { ThemeProvider } from "next-themes";
import { PropsWithChildren } from "react";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Toaster position="top-right" richColors duration={3000} />
        <SessionProvider refetchInterval={5 * 60}>{children}</SessionProvider>
      </ThemeProvider>
    </>
  );
};
