import { buttonVariants } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { getPost } from "@/query/post.query";
import Link from "next/link";
import React from "react";
import EditPostForm from "./EditPostForm";

export default async function EditPostPage({
  params,
}: {
  params: { postId: string };
}) {
  const post = await getPost(params.postId);

  return (
    <div className="w-full h-full">
      <div className="flex justify-between">
        <Heading
          title="Editer un post"
          description="Mettre a jour un post sur le blog"
        />
        <Link href="/admin" className={buttonVariants()}>
          Retour
        </Link>
      </div>
      <Separator />
      <EditPostForm post={post} />
    </div>
  );
}
