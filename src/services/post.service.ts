import prisma from "../lib/prismaClient.ts";

export async function getAllPosts() {
  return await prisma.post.findMany({
    include: {
      user: true,
      comments: {
        include: {
          user: true,
          likes: true,
        }
      },
      likes: true,
      notis: true,
    },
    orderBy: { id: "desc" },
    take: 20,
  });
}

export async function getPost(id: number) {
  return await prisma.post.findUnique({
    where: { id },
  });
}

export async function getPostById(id: number) {
  return prisma.post.findUnique({
    where: { id },
    include: {
      user: true,
      comments: {
        include: {
          user: true,
          likes: true,
        }
      },
      likes: true,
    },
  });
}

export async function createPost(
  content: string,
  userId: number,
) {
  return await prisma.post.create({
    data: {
      content,
      userId,
    },
  });
}

export async function deletePost(id: number) {
  // first delete cmts
  await prisma.comment.deleteMany({ where: { postId: id } })

  // then delete post
  await prisma.post.delete({ where: { id } })

  return true
}

export async function likePost(postId: number, userId: number) {
  return prisma.postLike.create({
    data: {
      postId,
      userId,
    }
  })
}

export async function unlikePost(postId: number, userId: number) {
  return prisma.postLike.deleteMany({
    where: { postId, userId }
  })
}

export async function getPostAllLikes(postId: number) {
  return prisma.postLike.findMany({
    where: { postId },
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

export async function getPostsByUsers(userIds: number[]) {
  return await prisma.post.findMany({
    where: {
      userId: {
        in: userIds,
      },
    },
    include: {
      user: true,
      comments: true,
      likes: true,
    },
    orderBy: { id: "desc" },
    take: 20,
  });
}

export async function searchPosts(q: string) {
  return await prisma.post.findMany({
    where: {
      OR: [
        { content: { contains: q, mode: "insensitive" } },
        { user: { username: { contains: q, mode: "insensitive" } } },
      ],
    },
    include: {
      user: true,
      likes: true,
      comments: true,
    },
    take: 50,
  });
}
