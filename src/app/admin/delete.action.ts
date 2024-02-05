"use server";

import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/getUser";

export const deletePostAction = async (postId: string) => {
  if (typeof postId !== "string") {
    throw new Error("postId must be a string");
  }

  const session = await getAuthSession();

  if (!session || !session.user.id || session.user.role !== "ADMIN") {
    return {
      error:
        "Vous ne disposez pas des autorisations nécessaires pour supprimer un post",
    };
  }

  await prisma.post.delete({
    where: {
      id: postId,
    },
  });

  return {
    message: "Le post a été supprimer avec succès",
  };
};
