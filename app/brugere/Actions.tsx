'use server';
import { prisma } from '@/db';

export async function DeleteUser(userId: number) {
  await prisma.booking.deleteMany({
    // Slet alle bookinger for brugeren
    where: {
      userId: userId,
    },
  });

  await prisma.user.delete({
    //slet brugeren
    where: {
      id: userId,
    },
  });
}
