import { prisma } from '@/db';
import { User } from '@/app/types/types';

export async function getUser(userId: number) {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
}

export async function DeleteUserBookings(userId: number) {
  await prisma.booking.deleteMany({
    where: {
      userId: userId,
    },
  });
}

export async function DeleteUser(userId: number) {
  await prisma.user.delete({
    where: {
      id: userId,
    },
  });
}

export async function updateUser(userId: number, data: Partial<User>) {
  await prisma.user.update({
    where: {
      id: userId,
    },
    data,
  });
}
