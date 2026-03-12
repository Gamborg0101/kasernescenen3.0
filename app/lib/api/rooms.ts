import { prisma } from '@/db';

export async function getRoom(roomNumber: number) {
  return await prisma.room.findUnique({
    where: { roomNum: roomNumber },
  });
}
