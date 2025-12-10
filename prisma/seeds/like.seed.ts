import { faker } from "@faker-js/faker"
import prisma from "../../src/lib/prismaClient.ts";

export default async function likeSeed() {
  console.log("Post like seeding started...");

  for (let i = 0; i < 5; i++) {
    await prisma.postLike.create({
      data: {
        postId: 20,
        userId: faker.number.int({ min: 1, max: 10 }),
      },
    });
  }
  console.log("Post like seeding done.");
}
