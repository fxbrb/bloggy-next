import { getPost } from "@/query/post.query";
import React from "react";
import Image from "next/image";
import { Loader } from "@/components/ui/loader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAuthSession } from "@/lib/getUser";
import CommentForm from "./CommentForm";
import { CommentsProps, getComments } from "@/query/comment.query";
import Comment from "@/components/comments/Comment";

// async function getPostById(postId: string) {
//   const response = await fetch(`http://localhost:3000/api/posts/${postId}`, {
//     method: "GET",
//   });

//   // https://bloggy-next-eight.vercel.app/api/posts/${postId}

//   if (!response.ok) {
//     throw new Error("La récupération du post est impossible");
//   }

//   return response.json();
// }

export default async function SinglePostPage({
  params,
}: {
  params: { postId: string };
}) {
  const post = await getPost(params.postId);
  const session = await getAuthSession();
  const comments: CommentsProps[] = await getComments(params.postId);

  if (!post) {
    return <Loader />;
  }

  if (!post.isPublished && session?.user.role !== "ADMIN") {
    throw new Error("Impossible d'accèder a ce contenu");
  }

  return (
    <div className=" h-full w-full">
      <div className="grid grid-cols-2">
        <div className="w-full h-auto flex flex-col gap-4">
          {post.images.map((image, idx) => (
            <div className="h-[400px] relative">
              <Image
                key={idx}
                src={image.url}
                alt={`${post.title} image`}
                fill
                className="object-cover object-center w-full h-[400px]"
              />
            </div>
          ))}
        </div>

        <div className="px-4 sticky top-36 h-fit">
          <div className="space-y-6">
            <h1 className="font-bold text-xl underline underline-offset-4">
              {post.title}
            </h1>
            <div
              className="leading-6"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          <div className="flex space-x-2 items-center py-5 justify-end text-sm">
            <span>Ecrit par:</span>
            <div className="flex gap-1 items-center">
              <Avatar className="w-8 h-8 mr-2">
                <AvatarFallback>
                  {post?.user?.firstname?.split("")[0]}
                  {post?.user?.lastname?.split("")[0]}
                </AvatarFallback>
                {post?.user.image && (
                  <AvatarImage src={post?.user.image} alt="user image" />
                )}
              </Avatar>
              <span>{post.user.firstname}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-16">
        <h3 className="text-2xl font-bold">Liste des commentaires</h3>
        <div className="py-5">
          <CommentForm postId={post.id} />
        </div>
        {comments.length > 0 ? (
          <div className="flex flex-col gap-5 mt-10">
            {comments.map((comment) => (
              <Comment comment={comment} />
            ))}
          </div>
        ) : (
          <div className="py-7">
            <p className="text-muted-foreground">
              Aucun commentaire a été posté
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
