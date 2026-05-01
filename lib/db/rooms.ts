import { prisma } from '@/db';
import { Room } from '@/generated/prisma';

export async function getRoomsFromDB() {
  return await prisma.room.findMany({
    orderBy: { id: 'asc' },

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

export async function updateRoom(roomId: number, data: Partial<Omit<Room, 'id'>>) {
  return await prisma.room.update({
    where: {
      id: roomId,
    },
    data,
  });
}

export async function DeleteRoomBookings(roomId: number) {
  return await prisma.booking.deleteMany({
    where: {
      roomId: roomId,
    },
  });
}

export async function deleteRoomFromDb(roomId: number) {
  return await prisma.room.delete({
    where: {
      id: roomId,
    },
  });
}
