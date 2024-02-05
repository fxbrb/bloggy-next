import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const main = async () => {
  const users = await prisma.user.findMany();

  for (let i = 0; i < 20; i++) {
    const randomIndex = Math.floor(Math.random() * users.length);
    const randomUserId = users[randomIndex].id;
    const isPublished = Math.random() < 0.5;
    await prisma.post.create({
      data: {
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraph({ min: 3, max: 6 }),
        images: {
          create: [
            {
              url: faker.image.url(),
            },
            {
              url: faker.image.url(),
            },
          ],
        },
        userId: randomUserId,
        isPublished: isPublished,
      },
    });
  }

  // for (let i = 0; i < 100; i++) {
  //   const posts = await prisma.post.findMany();
  //   const randomLikeUserId = users[Math.floor(Math.random() * users.length)].id;
  //   const randomIndexPost = Math.floor(Math.random() * posts.length);
  //   const randomPostId = posts[randomIndexPost].id;

  //   await prisma.like.create({
  //     data: {
  //       userId: randomLikeUserId,
  //       postId: randomPostId,
  //     },
  //   });
  // }
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
