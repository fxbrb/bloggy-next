import Image from "next/image";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "../ui/button";
import { ThemeToggle } from "../theme/ThemeToggle";
import LogoutButton from "../auth/DropdownMenuItemLogout";
import { getAuthSession } from "@/lib/getUser";
import UserProfile from "../auth/UserProfile";
import { Bird } from "lucide-react";

export default async function Header() {
  const session = await getAuthSession();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-20 items-center justify-between">
        <div className="flex">
          <Link
            href="/"
            className="-m-1.5 p-1.5 text-xl font-semibold flex items-center"
          >
            <Image
              src="/logo.svg"
              alt="app logo"
              className="mr-2"
              width={45}
              height={45}
            />
            Bloggy
          </Link>
        </div>
        {/* <div className="flex lg:hidden">
        <button
          type="button"
          className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          onClick={() => setMobileMenuOpen(true)}
        >
          <span className="sr-only">Open main menu</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div> */}

        <div className="lg:flex lg:flex-1 lg:justify-end space-x-3">
          {!session?.user ? (
            <Link
              href="/sign-in"
              className={buttonVariants({
                size: "sm",
                variant: "outline",
              })}
            >
              Connexion
            </Link>
          ) : (
            <UserProfile />
          )}
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
