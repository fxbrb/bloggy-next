"use server";

import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/getUser";

export const editPostAction = async (postId: string, values: any) => {
  const session = await getAuthSession();

  if (!session || !session.user.id || session.user.role !== "ADMIN") {
    return {
      error:
        "Vous ne disposez pas des autorisations nécessaires pour crée un post",
    };
  }

  const { title, content, images, isPublished } = values;

  if (!title || !content || !images || !images.length) {
    return {
      error: "Tous les champs sont requis",
    };
  }

  await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      title,
      content,
      images: {
        deleteMany: {},
        createMany: {
          data: [...images.map((image: { url: string }) => image)],
        },
      },
      isPublished,
    },
  });
};
