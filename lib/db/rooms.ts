import 'server-only';
import { prisma } from '@/db';
import { Room } from '@/generated/prisma';

export async function getRoomsFromDB() {
  return await prisma.room.findMany({
    orderBy: { id: 'asc' },

    select: {
      id: true,
      name: true,
      roomNumber: true,
      capacity: true,
      location: true,
    },
  });
}

export async function getRoomByNum(roomNumber: string) {
  return await prisma.room.findUnique({
    where: { roomNumber: String(roomNumber) },
  });
}

export async function updateRoom(roomId: number, data: Partial<Omit<Room, 'id'>>) {
  return await prisma.room.update({
    where: {
      id: roomId,
    },
    data,
  });
}


export async function createRoomDB(room: Omit<Room, 'id'>) {
  return await prisma.room.create({ data: room });
}

export async function deleteRoomWithBookings(roomId: number) {
  return await prisma.$transaction([
    prisma.booking.deleteMany({
      where: {
        roomId: roomId
      }
    }),
    prisma.room.delete({
      where: {
        id: roomId
      }
    })
  ])
}
