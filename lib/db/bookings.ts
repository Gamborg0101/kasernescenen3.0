import { prisma } from '@/db';
import { CreateBooking } from '@/lib/types/types';

export async function getBookings() {
  return await prisma.booking.findMany({
    include: {
      room: true,
    },
  });
}

export async function findBooking({ roomId, startTime, endTime }: { roomId: number; startTime: Date; endTime: Date }) {
  return await prisma.booking.findFirst({
    where: {
      roomId: roomId,
      startTime: { lt: startTime },
      endTime: { gt: endTime },
    },
  });
}

export async function createBooking({ roomId, startTime, endTime, userId, reason }: CreateBooking) {
  await prisma.booking.create({
    data: {
      roomId: roomId,
      startTime: startTime,
      endTime: endTime,
      userId: userId,
      reason: reason,
    },
  });
}

export async function getThreeBookings(id: number) {
  return await prisma.booking.findMany({
    where: {
      userId: id,
    },
    take: 3,
    orderBy: {
      startTime: 'asc',
    },
    include: { room: true },
  });
}

export async function deleteBooking({
  userId,
  roomId,
  bookingId,
}: {
  userId: number;
  roomId: number;
  bookingId: number;
}) {
  return await prisma.booking.delete({
    where: {
      userId: userId,
      roomId: roomId,
      id: bookingId,
    },
  });
}
