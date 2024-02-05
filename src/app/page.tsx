import { PaginationButton } from "@/components/PaginationButton";
import Post from "@/components/post/Post";
import { prisma } from "@/lib/db";
import { getPosts } from "@/query/post.query";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = Number(searchParams.page ?? 1);
  const posts = await getPosts({
    page: page,
  });

  const publisedPosts = await prisma.post.count({
    where: {
      isPublished: true,
    },
  });

  if (posts.length === 0) {
    return (
      <div className="flex justify-center items-center py-20">
        <h3 className="text-xl font-medium">Aucun post disponible.</h3>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-8 place-items-center">
        {posts.map((post, index) => {
          return <Post key={index} post={post} />;
        })}
      </div>
      <div className="flex items-center justify-center">
        <PaginationButton
          baseUrl="/"
          page={page}
          totalPages={Math.ceil(publisedPosts / 4)}
        />
      </div>
    </div>
  );
}
