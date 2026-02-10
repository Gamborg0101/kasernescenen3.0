'use server';
import { prisma } from '@/db';

export async function DeleteUser(userId: number) {
  await prisma.booking.deleteMany({
    where: {
      userId: userId,
    },
  });

  await prisma.user.delete({
    where: {
      id: userId,
    },
  });
}

export async function UpdateUser(
  userId: number,
  data: {
    firstName?: string;
    lastName?: string;
    phone?: number;
    email?: string;
    studentNumber?: number;
    cardNumber?: number;
    category?: string;
  },
) {
  await prisma.user.update({
    where: {
      id: userId,
    },
    data,
  });
}
