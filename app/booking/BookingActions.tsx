'use server';

import { prisma } from '@/db';
import { auth } from '@/auth/authSetup';

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

  const roomNumber = Number(formData.get('roomNumber'));
  console.log('This is it ' + roomNumber);

  const date = formData.get('date');
  const startHour = formData.get('startHour');
  const endHour = formData.get('endHour');

  const startFormatted = `${date}T${startHour}`;
  const endFormatted = `${date}T${endHour}`;

  const startTime = new Date(startFormatted);
  const endTime = new Date(endFormatted);
  console.log('Her er mit id: ' + session?.user?.id);

  if (!session) throw new Error('Ikke logget ind');

  await prisma.booking.create({
    data: {
      bookingId: crypto.randomUUID(),
      roomId: roomNumber,
      startTime: startTime,
      endTime: endTime,
      userId: 1,
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
