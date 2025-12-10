import bcrypt from "bcrypt"
import prisma from "../lib/prismaClient.ts";

export async function registerUser(
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

export async function saveRefreshToken(
  id: number,
  refreshToken: string
) {
  return await prisma.user.update({
    where: { id },
    data: {
      refreshToken
    }
  });
}
