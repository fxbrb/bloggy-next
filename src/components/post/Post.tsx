"use client";

import Image from "next/image";
import React, { FC, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PostsProps } from "@/query/post.query";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader } from "../ui/loader";
import { likePostAction } from "./like.action";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface PostProps {
  post: any;
}

const Post: FC<PostProps> = ({ post }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isLikedByUser = post.likes.some(
    (like: any) => like.userId === session?.user.id
  );

  const likePost = async () => {
    try {
      setIsLoading(true);
      const result = await likePostAction(post.id);

      if (result?.error) {
        toast.error(result.error);
        setIsLoading(false);
        return;
      }
      router.refresh();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-2xl w-full h-full overflow-hidden">
      <div className="h-full w-full flex flex-col">
        <CardHeader
          className="relative h-56 cursor-pointer"
          onClick={() => router.push(`/post/${post.id}`)}
        >
          <Image
            src={post.images[0].url}
            alt="post image"
            className="object-cover object-center"
            fill
          />
        </CardHeader>
        <CardContent className="mt-4 flex flex-col gap-2 flex-1">
          <CardTitle
            onClick={() => router.push(`/post/${post.id}`)}
            className="cursor-pointer"
          >
            {post.title}
          </CardTitle>
          <div
            className="text-sm text-muted-foreground py-2"
            dangerouslySetInnerHTML={{
              __html: `${post.content.slice(0, 150)}...`,
            }}
          ></div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={likePost}
          >
            {isLoading ? (
              <Loader />
            ) : (
              <Heart
                className={isLikedByUser ? "text-red-500 fill-red-500" : ""}
              />
            )}
            <p className="text-sm">{post._count.likes}</p>
          </div>
          <div className="flex justify-end my-2">
            <p className="text-foreground text-sm flex items-center">
              <Avatar className="w-8 h-8 mr-2">
                <AvatarFallback>
                  {post?.user?.firstname?.split("")[0]}
                  {post?.user?.lastname?.split("")[0]}
                </AvatarFallback>
                {post?.user.image && (
                  <AvatarImage src={post?.user.image} alt="user image" />
                )}
              </Avatar>
              {post.user.firstname}
            </p>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
};

export default Post;
