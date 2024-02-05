import { getRequiredAuthSession } from "@/lib/getUser";
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { buttonVariants } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { DataTable } from "./data-table";
import { columns } from "./colums";
import { getAdminPosts, getPosts } from "@/query/post.query";

import { Separator } from "@/components/ui/separator";
import Heading from "@/components/ui/heading";

export default async function AdminPage() {
  const session = await getRequiredAuthSession();

  if (session.user.role !== "ADMIN") {
    return (
      <Alert variant="destructive" className="max-w-2xl mx-auto my-16">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Une erreur est survenue</AlertTitle>
        <AlertDescription>
          <div className="flex flex-col gap-6">
            <p>
              {" "}
              Vous ne disposez pas des autorisations nécessaires pour accéder à
              cette page.
            </p>
            <Link href="/" className={cn(buttonVariants(), "w-fit")}>
              Accueil
            </Link>
          </div>
        </AlertDescription>
      </Alert>
    );
  }

  const posts = await getAdminPosts();

  return (
    <div className="w-full h-full">
      <div className="flex justify-between">
        <Heading
          title="Liste des posts"
          description="Vous pouvez ici gérer tout les posts"
        />

        <Link href="/admin/create-post" className={buttonVariants()}>
          Crée un post
        </Link>
      </div>
      <Separator />
      <DataTable columns={columns} data={posts} />
    </div>
  );
}
