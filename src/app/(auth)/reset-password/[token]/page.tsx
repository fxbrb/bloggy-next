import React from "react";
import ResetPasswordForm from "./reset-password-form";

export default function ResetPasswordPage({ params }: any) {
  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Changement du mot de passe
        </h1>
        <p className="text-sm text-muted-foreground">
          Entrez votre nouveau mot de passe
        </p>
      </div>
      <ResetPasswordForm token={params.token} />
    </>
  );
}
