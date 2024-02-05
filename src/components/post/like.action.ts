"use server";

import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/getUser";

export const likePostAction = async (postId: string) => {
  if (typeof postId !== "string") {
    throw new Error("postId must be a string");
  }
  const session = await getAuthSession();

  if (!session || !session.user.id) {
    return {
      error: "Vous devez être connecter pour liker un post",
    };
  }

  const like = await prisma.like.findFirst({
    where: {
      postId,
      userId: session.user.id,
    },
  });

  if (like) {
    await prisma.like.delete({
      where: {
        id: like.id,
      },
    });
  } else {
    await prisma.like.create({
      data: {
        postId,
        userId: session.user.id,
      },
    });
  }
};
