import { buttonVariants } from "@/components/ui/button";
import { getRequiredAuthSession } from "@/lib/getUser";
import { cn } from "@/lib/utils";
import Link from "next/link";
import CreatePostForm from "./CreatePostForm";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

export default async function CreatePostPage() {
  return (
    <div className="w-full h-full">
      <div className="flex justify-between">
        <Heading
          title="Crée un post"
          description="Ajouter un nouveau post sur le blog"
        />
        <Link href="/admin" className={buttonVariants()}>
          Retour
        </Link>
      </div>
      <Separator />
      <CreatePostForm />
    </div>
  );
}
