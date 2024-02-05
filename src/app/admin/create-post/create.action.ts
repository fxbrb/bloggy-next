"use server";

import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/getUser";

export const createPostAction = async (values: any) => {
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

  await prisma.post.create({
    data: {
      title,
      content,
      images: {
        createMany: {
          data: [...images.map((image: { url: string }) => image)],
        },
      },
      userId: session.user.id,
      isPublished,
    },
  });
};
