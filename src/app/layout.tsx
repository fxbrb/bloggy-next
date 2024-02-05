import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "@/provider/Providers";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Bloggy",
  description: "FullStack Nextjs Blog",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`h-full ${fontSans.variable}`}
      suppressHydrationWarning
    >
      <body className="h-full bg-background font-sans antialiased">
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <div className="flex-1 container py-16">{children}</div>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
