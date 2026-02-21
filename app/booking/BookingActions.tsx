'use server';

import { prisma } from '@/db';
import { auth } from '@/auth/authSetup';

export async function getBookings() {
  const bookings = await prisma.booking.findMany();
  return bookings;
}

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
