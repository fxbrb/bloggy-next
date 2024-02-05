import React from "react";
import SignUpForm from "./sign-up-form";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Inscription</h1>
        <p className="text-sm text-muted-foreground">
          Entrez votre email ci-dessous pour créer votre compte
        </p>
      </div>
      <SignUpForm />
      <p className="px-8 text-center text-sm text-muted-foreground">
        Déja un compte ?{" "}
        <Link
          href="/sign-in"
          className="underline underline-offset-4 hover:text-primary"
        >
          Connexion
        </Link>
        .
      </p>
    </>
  );
}
