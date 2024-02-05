import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAuthSession } from "@/lib/getUser";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import LogoutButton from "@/components/auth/LogoutButton";
import { getUserComments } from "@/query/comment.query";
import Comment from "@/components/comments/Comment";
import { getPost } from "@/query/post.query";

export default async function ProfilePage() {
  const session = await getAuthSession();

  if (!session) {
    throw new Error("No session found");
  }

  const comments = await getUserComments(session.user.id);

  return (
    <div className="py-6 w-full">
      <Card className="m-auto mt-4 max-w-lg">
        <CardHeader className="flex flex-row gap-4 space-y-0">
          <Avatar>
            <AvatarFallback>
              {session?.user?.firstname?.split("")[0]}
              {session?.user?.lastname?.split("")[0]}
            </AvatarFallback>
            {session?.user.image && (
              <AvatarImage src={session.user.image} alt="user image" />
            )}
          </Avatar>
          <div className="flex flex-col gap-1">
            <CardTitle>
              {session?.user.firstname + " " + session?.user.lastname}
            </CardTitle>
            <CardDescription>{session?.user.email}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {session?.user.role === "ADMIN" && (
            <Link
              href="/admin"
              className={buttonVariants({
                size: "sm",
                variant: "secondary",
              })}
            >
              Tableau d'administration
            </Link>
          )}
        </CardContent>
        <CardFooter>
          <LogoutButton />
        </CardFooter>
      </Card>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-2 mt-16">
        <div className="pr-14">
          <h2 className="text-xl font-bold">Mes derniers commentaires</h2>

          {comments.length > 0 ? (
            <div className="flex flex-col gap-5 py-7">
              {comments.map((comment, index) => (
                <Comment comment={comment} key={index} />
              ))}
            </div>
          ) : (
            <div className="py-7">
              <p className="text-muted-foreground">
                Vous n'avez pas encore ajouté de commentaire
              </p>
            </div>
          )}
        </div>
        <div>
          <h2 className="text-xl font-bold">Mes derniers posts like</h2>
          {session.user.likes && (
            <>
              {session.user.likes?.length > 0 ? (
                <div className="flex flex-col py-7">
                  {session.user.likes?.map(async (like, index) => {
                    const post = await getPost(like.postId);
                    return (
                      <div className="h-full py-2">
                        <Link
                          href={`/post/${like.postId}`}
                          className="text-blue-500 hover:underline underline-offset-4"
                          key={index}
                        >
                          {post?.title}
                        </Link>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="py-7">
                  <p className="text-muted-foreground">
                    Vous n'avez pas encore ajouté de like
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
