import { prisma } from '@/db';
import { CreateBooking } from '@/lib/types';

export async function getBookings() {
  return await prisma.booking.findMany({
    include: {
      room: true,
      user: true,
    },
  });
}

export async function deleteOldBooking() {
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  return await prisma.booking.deleteMany({
    where: {
      startTime: {
        lt: oneYearAgo,
      },
    },
  });
}

export async function findBooking({ roomId, startTime, endTime }: { roomId: number; startTime: Date; endTime: Date }) {
  return await prisma.booking.findFirst({
    where: {
      roomId,
      AND: [{ startTime: { lt: endTime } }, { endTime: { gt: startTime } }],
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

export async function deleteBooking(bookingId: number, userId: number, role: string) {
  if (role === 'admin') {
    return await prisma.booking.delete({
      where: { id: bookingId },
    });
  }
  return await prisma.booking.delete({
    where: { id: bookingId, userId: userId },
  });
}

function deleteOldBookings() {}
