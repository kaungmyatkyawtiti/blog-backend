import prisma from "../../src/lib/prismaClient.ts";
import commentSeed from "./comment.seed.ts";
import likeSeed from "./like.seed.ts";
import postSeed from "./post.seed.ts";
import userSeed from "./user.seed.ts";

async function main() {
  try {
    await userSeed();
    await postSeed();
    await commentSeed();
    await likeSeed();
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
