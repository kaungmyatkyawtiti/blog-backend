import bcrypt from "bcrypt"
import prisma from "../lib/prismaClient.ts";

export async function createUser(
  username: string,
  name: string,
  password: string,
) {
  // hash password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  return await prisma.user.create({
    data: {
      username,
      name,
      password: hash,
    },
  });
};

export async function findUserByUsername(username: string) {
  return await prisma.user.findUnique({
    where: { username },
  });
};

export async function saveRefreshToken(
  userId: number,
  refreshToken: string
) {
  return await prisma.user.update({
    where: { id: userId },
    data: {
      refreshToken: refreshToken
    }
  });
}

export async function findUserById(userId: number) {
  return await prisma.user.findUnique({
    where: { id: userId }
  });
}

export async function getAllProfiles() {
  const data = prisma.user.findMany({
    include: {
      posts: true,
      comments: true,
    },
    orderBy: { id: "desc" },
    take: 20,
  });

  return data;
}

export async function getProfileById(userId: string) {
  const data = prisma.user.findFirst({
    where: { id: Number(userId) },
    include: {
      posts: true,
      comments: true,
    },
  });

  return data;
}
