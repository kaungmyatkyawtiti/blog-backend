import prisma from "../lib/prismaClient.ts";

export async function getAllNotis(userId: number) {
  return await prisma.noti.findMany({
    where: {
      post: {
        userId
      }
    },
    include: { user: true },
    orderBy: { id: "desc" },
    take: 20,
  });
}

export async function readAllNotis(userId: number) {
  return await prisma.noti.updateMany({
    where: {
      post: {
        userId
      }
    },
    data: { read: true }
  });
}

export async function readNotiById(id: number) {
  return await prisma.noti.update({
    where: { id },
    data: { read: true }
  });
}

interface AddNotiParams {
  type: string;
  content: string;
  postId: number;
  userId: number;
};

export async function addNoti({
  type,
  content,
  postId,
  userId
}: AddNotiParams) {
  const post = await prisma.post.findUnique({
    where: { id: postId },
  });

  if (post?.userId == userId) return false;

  return await prisma.noti.create({
    data: {
      type,
      content,
      postId,
      userId,
    },
  });
}
