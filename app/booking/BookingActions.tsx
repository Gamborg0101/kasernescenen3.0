'use server';

import { prisma } from '@/db';
import { auth } from '@/auth/authSetup';
import { revalidatePath } from 'next/cache';

export async function getUserInfoFromSession() {
  const session = await auth();

  if (!session) return { name: '', email: '' };

  const user = session.user;

  return {
    name: user?.name || '',
    email: user?.email || '',
    image: user?.image || '',
    id: user.id,
  };
}

export async function getUserFromDb() {
  const session = await auth();
  if (!session) throw new Error('Brugeren er ikke fundet');

  return prisma.user.findUnique({
    where: {
      id: Number(session?.user.id),
    },
  });
}

export async function createBooking(prevState: unknown, formData: FormData) {
  const session = await auth();
  if (!session) throw new Error('Ikke logget ind');

  const roomNumber = Number(formData.get('roomNumber'));

  const date = formData.get('date');
  const getStartHour = formData.get('startHour');
  const getEndHour = formData.get('endHour');

  if (!date || !getStartHour || !getEndHour) {
    return { success: false, error: 'Alle felter er påkrævet' };
  }

  const room = await prisma.room.findUnique({
    where: { roomNum: roomNumber },
  });

  if (!room) {
    return { success: false, error: 'Lokalet findes ikke' };
  }

  const startTime = new Date(`${date}T${getStartHour}`);
  const endTime = new Date(`${date}T${getEndHour}`);

  if (startTime > endTime) {
    return { success: false, error: 'Starttiden må ikke være efter sluttid' };
  }

  if (startTime < new Date()) {
    return { success: false, error: 'Du kan ikke booke i fortiden' };
  }

  const conflictBooking = await prisma.booking.findFirst({
    where: {
      roomId: room.id,
      startTime: { lt: endTime },
      endTime: { gt: startTime },
    },
  });

  if (conflictBooking) {
    return {
      success: false,
      error: 'Lokalet er allerede booket i det valgte tidsrum.',
    };
  }

  await prisma.booking.create({
    data: {
      roomId: room.id,
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
    include: {
      room: true,
    },
  });
}

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

export async function deleteBooking(roomIdArg: number, bookingIdArg: number) {
  const session = await auth();
  if (!session) throw new Error('Ikke logget ind');

  if (session) {
    await prisma.booking.delete({
      where: {
        userId: Number(session.user.id),
        roomId: roomIdArg,
        id: bookingIdArg,
      },
    });
    revalidatePath('/userpage');
  }
}
