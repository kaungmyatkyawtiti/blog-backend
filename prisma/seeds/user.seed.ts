import bcrypt from "bcrypt"
import { faker } from "@faker-js/faker"
import prisma from "../../src/lib/prismaClient.ts";

export default async function userSeed() {
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash("password", salt);
  console.log("User seeding started...");

  for (let i = 0; i < 10; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const name = `${firstName} ${lastName}`;
    const username = `${firstName}${lastName[0]}`.toLocaleLowerCase();
    const image = faker.image.avatar();
    const bio = faker.person.bio();
    const refreshToken = faker.string.uuid();

    await prisma.user.upsert({
      where: { username },
      update: {},
      create: {
        name,
        username,
        image,
        bio,
        password,
        refreshToken,
      },
    });
  }

  console.log("User seeding done.");
}
