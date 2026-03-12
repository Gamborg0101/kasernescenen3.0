import { prisma } from '@/db';

export async function getRooms() {
  return await prisma.room.findMany({
    select: {
      id: true,
      name: true,
      roomNum: true,
      capacity: true,
      location: true,
    },
  });
}

export async function getRoomByNum(roomNumber: number) {
  return await prisma.room.findUnique({
    where: { roomNum: roomNumber },
  });
}
