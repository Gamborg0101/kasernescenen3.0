import { prisma } from '@/db';

export async function getUser(userId: number) {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
}
