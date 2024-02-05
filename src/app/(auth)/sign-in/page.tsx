import Link from "next/link";
import React from "react";
import SignInForm from "./sign-in-form";

export default function SignInPage() {
  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Connexion</h1>
        <p className="text-sm text-muted-foreground">
          Entrez votre email ci-dessous pour vous connecter a votre compte
        </p>
      </div>
      <SignInForm />

      <p className="px-8 text-center text-sm text-muted-foreground">
        Pas encore de compte ?{" "}
        <Link
          href="/sign-up"
          className="underline underline-offset-4 hover:text-primary"
        >
          Inscription
        </Link>
        .
      </p>
    </>
  );
}
