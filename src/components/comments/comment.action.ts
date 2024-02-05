"use server";

import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/getUser";

export const createCommentAction = async (postId: string, values: any) => {
  const session = await getAuthSession();

  if (!session || !session.user.id) {
    return {
      error: "Vous devez être connecté pour ajouter un commentaire",
    };
  }

  const { message } = values;

  if (!message) {
    return {
      error: "Le champ message est requis",
    };
  }

  await prisma.comment.create({
    data: {
      message,
      postId,
      userId: session.user.id,
    },
  });
};

export const deleteCommentAction = async (commentId: string) => {
  const session = await getAuthSession();

  if (!session || !session.user.id) {
    return {
      error: "Vous devez être connecté pour supprimer un commentaire",
    };
  }

  await prisma.comment.delete({
    where: {
      id: commentId,
    },
  });

  return {
    message: "Le commentaire a été supprimer avec succès",
  };
};

export const editCommentAction = async (commentId: string, message: string) => {
  const session = await getAuthSession();

  if (!session || !session.user.id) {
    return {
      error: "Vous devez être connecté pour ajouter un commentaire",
    };
  }

  if (!message || !message.trim().length) {
    return {
      error: "Le champ message est requis",
    };
  }

  await prisma.comment.update({
    where: {
      id: commentId,
    },
    data: {
      message,
    },
  });
};
