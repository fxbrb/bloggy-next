import React from "react";
import ForgotPasswordForm from "./forgot-password-form";

export default function ForgotPasswordPage() {
  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Changement du mot de passe
        </h1>
        <p className="text-sm text-muted-foreground">
          Entrez votre email ci-dessous nous vous enverrons un lien pour changer
          le mot de passe
        </p>
      </div>
      <ForgotPasswordForm />
    </>
  );
}
