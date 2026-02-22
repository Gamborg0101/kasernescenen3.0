'use server';

import { prisma } from '@/db';
import { auth } from '@/auth/authSetup';
import { isSameDay, isWithinInterval } from 'date-fns';

export async function getUserInfo() {
  const session = await auth();

  if (!session) return { name: '', email: '' };

  const user = session.user;

  return {
    name: user?.name || '',
    email: user?.email || '',
    id: user?.id,
  };
}

export async function createBooking(formData: FormData) {
  const session = await auth();

  if (!session) throw new Error('Ikke logget ind');

  await prisma.booking.create({
    data: {
      bookingId: crypto.randomUUID(),
      roomId: Number(formData.get('roomNumber')),
      startTime: new Date(formData.get('startHour') as string),
      endTime: new Date(formData.get('endHour') as string),
      userId: Number(session.user?.id || 0),
    },
  });
}

export async function getBookings() {
  return await prisma.booking.findMany({
    select: {
      roomId: true,
      startTime: true,
      endTime: true,
    },
  });
}

export async function checkBookingForOverlap(
  roomNumber: number,
  hour: Date,
): Promise<boolean> {
  const allBookings = await prisma.booking.findMany();

  return allBookings.some((booking) => {
    const start = new Date(booking.startTime);
    const end = new Date(booking.endTime);

    return (
      booking.roomId === roomNumber &&
      isSameDay(start, hour) &&
      isWithinInterval(hour, { start, end })
    );
  });
}
