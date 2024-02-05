import { prisma } from "@/lib/db";
import { Prisma } from "@prisma/client";

export const getComments = (postId?: string) =>
  prisma.comment.findMany({
    where: {
      postId: postId,
    },
    select: {
      id: true,
      message: true,
      User: {
        select: {
          id: true,
          image: true,
          firstname: true,
          lastname: true,
        },
      },
      Post: {
        select: {
          id: true,
          title: true,
          content: true,
          createdAt: true,
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });

export const getUserComments = (userId?: string) =>
  prisma.comment.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      message: true,
      User: {
        select: {
          id: true,
          image: true,
          firstname: true,
          lastname: true,
        },
      },
      Post: {
        select: {
          id: true,
          title: true,
          content: true,
          createdAt: true,
        },
      },
    },
  });

export type CommentsProps = Prisma.PromiseReturnType<
  typeof getComments
>[number];
export type UserCommentsProps = Prisma.PromiseReturnType<
  typeof getUserComments
>;
