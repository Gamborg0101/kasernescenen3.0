'use server';

import { prisma } from '@/db';
import { auth } from '@/auth/authSetup';
import { revalidatePath } from 'next/cache';

export async function getUserInfo() {
  const session = await auth();

  if (!session) return { name: '', email: '' };

  const user = session.user;

  return {
    name: user?.name || '',
    email: user?.email || '',
    image: user?.image || '',
    id: user?.id,
  };
}

export async function createBooking(prevState: unknown, formData: FormData) {
  const session = await auth();
  if (!session) throw new Error('Ikke logget ind');

  const roomNumber = Number(formData.get('roomNumber'));

  const date = formData.get('date');
  const startHour = formData.get('startHour');
  const endHour = formData.get('endHour');

  const startFormatted = `${date}T${startHour}`;
  const endFormatted = `${date}T${endHour}`;

  const startTime = new Date(startFormatted);
  const endTime = new Date(endFormatted);

  if (startTime > endTime) {
    return { success: false, error: 'Starttiden må ikke være efter sluttid' };
  }

  await prisma.booking.create({
    data: {
      bookingId: crypto.randomUUID(),
      roomId: roomNumber,
      startTime: startTime,
      endTime: endTime,
      userId: Number(session.user.id),
    },
  });
  revalidatePath('/booking');
  return { success: true, error: null };
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

export async function deleteBooking(roomIdArg: number, bookingIdArg: number) {
  await prisma.booking.delete({
    where: {
      roomId: roomIdArg,
      id: bookingIdArg,
    },
  });
  revalidatePath('/userpage');
}
