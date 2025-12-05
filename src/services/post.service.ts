import prisma from "../lib/prismaClient.ts";

export async function getAllPosts() {
  return await prisma.post.findMany({
    include: {
      user: true,
      comments: true,
    },
    orderBy: { id: "desc" },
    take: 20,
  });
}

export async function getPostById(id: string) {
  return prisma.post.findFirst({
    where: { id: Number(id) },
    include: {
      user: true,
      comments: {
        include: { user: true }
      }
    },
  });
}

export async function deletePost(postId: string) {
  const id = Number(postId);

  // first delete cmts
  await prisma.comment.deleteMany({ where: { postId: id } })

  // then delete post
  await prisma.post.delete({ where: { id } })

  return true
}
