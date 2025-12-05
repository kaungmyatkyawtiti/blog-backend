import prisma from "../lib/prismaClient.ts";

export async function getAllComments() {
  return prisma.comment.findMany({
    include: {
      user: true,
      post: true,
    },
    orderBy: { id: "desc" },
  });
}

export async function deleteComment(id: string) {
  return await prisma.comment.delete({
    where: { id: Number(id) }
  })
}
