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

export async function getCommentById(id: number) {
  return await prisma.comment.findUnique({
    where: { id },
    include: {
      post: true,
    },
  });
}

export async function getPostId(id: number) {
  const select = await prisma.comment.findUnique({
    where: { id },
    select: { postId: true },
  });
  if (!select) throw new Error("Comment not found")

  return select.postId;
}

export async function createComment(
  content: string,
  userId: number,
  postId: number,
) {
  return await prisma.comment.create({
    data: {
      content,
      userId: +userId,
      postId: +postId,
    },
  });
}

export async function deleteComment(id: number) {
  return await prisma.comment.delete({
    where: { id }
  })
}

export async function likeComment(commentId: number, userId: number) {
  return prisma.commentLike.create({
    data: {
      commentId,
      userId,
    }
  })
}

export async function unlikeComment(commentId: number, userId: number) {
  return prisma.commentLike.deleteMany({
    where: { commentId, userId }
  })
}

export async function getCommentAllLikes(commentId: number) {
  return prisma.commentLike.findMany({
    where: { commentId },
    include: {
      user: {
        include: {
          followers: true,
          followings: true,
        },
      },
    },
  });
}
