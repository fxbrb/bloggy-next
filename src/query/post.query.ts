import { prisma } from "@/lib/db";
import { Prisma } from "@prisma/client";

export const getPosts = async ({
  userId,
  page,
}: {
  userId?: string;
  page?: number;
}) => {
  let skip;
  let take;

  if (page !== undefined) {
    take = 4;
    skip = Math.max(0, (page - 1) * 4);
  }
  const posts = await prisma.post.findMany({
    where: {
      userId: userId,
      isPublished: true,
    },
    select: {
      id: true,
      title: true,
      content: true,
      images: true,
      createdAt: true,
      isPublished: true,
      user: {
        select: {
          id: true,
          image: true,
          firstname: true,
          lastname: true,
        },
      },
      likes: {
        select: {
          userId: true,
        },
      },
      _count: {
        select: {
          likes: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take,
    skip,
  });

  return posts;
};

export const getAdminPosts = async () => {
  const posts = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      images: true,
      createdAt: true,
      isPublished: true,
      user: {
        select: {
          id: true,
          image: true,
          firstname: true,
          lastname: true,
        },
      },
      likes: {
        select: {
          userId: true,
        },
      },
      _count: {
        select: {
          likes: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return posts;
};

export const getPost = (postId: string) => {
  const post = prisma.post.findUnique({
    where: {
      id: postId,
    },
    select: {
      id: true,
      title: true,
      content: true,
      images: true,
      createdAt: true,
      isPublished: true,
      user: {
        select: {
          id: true,
          image: true,
          firstname: true,
          lastname: true,
        },
      },
      likes: {
        select: {
          userId: true,
        },
      },
      _count: {
        select: {
          likes: true,
        },
      },
    },
  });

  return post;
};

export type PostsProps = Prisma.PromiseReturnType<typeof getPosts>[number];
export type PostProps = Prisma.PromiseReturnType<typeof getPost>;
