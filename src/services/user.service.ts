import prisma from "../lib/prismaClient.ts";

export async function getAllProfiles() {
  const data = prisma.user.findMany({
    include: {
      posts: true,
      comments: true,
      followers: true,
      followings: true,
    },
    orderBy: { id: "desc" },
    take: 20,
  });

  return data;
}

export async function getUserById(id: number) {
  return prisma.user.findUnique({
    where: { id },
    include: {
      posts: {
        include: {
          user: true,
          comments: {
            include: {
              user: true,
              likes: true,
            },
          },
          likes: true,
        },
      },
      comments: {
        include: {
          post: true,
          likes: true,
        },
      },
      followers: {
        include: {
          follower: true,
        },
      },
      followings: {
        include: {
          following: true,
        },
      },
    },
  });
}

// export async function getUserById(id: number) {
//   const data = prisma.user.findUnique({
//     where: { id },
//     include: {
//       posts: true,
//       comments: true,
//       followers: true,
//       followings: true,
//     },
//   });
//
//   return data;
// }

export async function findUserByUsername(username: string) {
  return await prisma.user.findUnique({
    where: { username },
  });
};

export async function findUserById(id: number) {
  const data = prisma.user.findUnique({
    where: { id },
  });

  return data;
}

export async function followUser(followerId: number, followingId: number) {
  const data = await prisma.follow.create({
    data: {
      followerId,
      followingId,
    },
  });

  return data;
}

export async function unfollowUser(followerId: number, followingId: number) {
  return await prisma.follow.deleteMany({
    where: {
      followerId,
      followingId,
    },
  });
}

export async function getFollowings(followerId: number) {
  return await prisma.follow.findMany({
    where: {
      followerId,
    },
  });
}

export async function searchUser(q: string) {
  return await prisma.user.findMany({
    where: {
      name: {
        contains: q,
      }
    },
    include: {
      followers: true,
      followings: true
    },
    take: 20
  });
}
