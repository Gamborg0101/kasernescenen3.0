'use server';

import { prisma } from '@/db';
import { auth } from '@/auth/authSetup';
import { revalidatePath } from 'next/cache';
import { convertToObject } from 'typescript';

export async function getUserInfoFromSession() {
  const session = await auth();

  if (!session) return { name: '', email: '' };

  return {
    name: session.user?.name || '',
    email: session.user?.email || '',
    image: session.user?.image || '',
    id: session.user.id,
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

function convertStartAndEndHour(
  startHour: string,
  endHour: number,
  endHourMins: string,
  getDate: string,
): { start: Date; end: Date } {
  const endTimeWithMins = `${endHour}:${endHourMins}`;

  const startTime = new Date(`${getDate} ${startHour}`);
  const endTime = new Date(`${getDate} ${endTimeWithMins}`);

  return { start: startTime, end: endTime };
}

export async function createBooking(prevState: unknown, formData: FormData) {
  const session = await auth();

  if (!session) throw new Error('Ikke logget ind');

  const roomNumber = Number(formData.get('roomNumber'));

  const getDate = String(formData.get('getDate'));
  const getStartHour = String(formData.get('startHour'));
  const getEndHour = Number(formData.get('endHour'));
  const getEndHourMins = String(formData.get('endHourMins'));
  const getInfo = String(formData.get('reason') || '');

  if (!getDate || !getStartHour || !getEndHour || !getInfo || !getEndHourMins) {
    return { success: false, error: 'Alle felter er påkrævet' };
  }
  console.log(typeof getDate);

  const stardAndEnd = convertStartAndEndHour(
    getStartHour,
    getEndHour,
    getEndHourMins,
    getDate,
  );

  const room = await prisma.room.findUnique({
    where: { roomNum: roomNumber },
  });

  if (!room) {
    return { success: false, error: 'Lokalet findes ikke' };
  }

  if (typeof getEndHour !== 'number') {
    return { success: false, error: 'Sluttiden skal være et tal' };
  }

  if (getInfo.length >= 35) {
    return {
      succes: false,
      error: 'Du må maks bruge 35 bogstaver til beskrivelsen',
    };
  }

  if (stardAndEnd.start > stardAndEnd.end) {
    return { success: false, error: 'Starttiden må ikke være efter sluttid' };
  }

  if (stardAndEnd.start < new Date()) {
    return { success: false, error: 'Du kan ikke booke i fortiden' };
  }

  const conflictBooking = await prisma.booking.findFirst({
    where: {
      roomId: room.id,
      startTime: { lt: stardAndEnd.end },
      endTime: { gt: stardAndEnd.start },
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
      startTime: stardAndEnd.start,
      endTime: stardAndEnd.end,
      userId: Number(session.user.id),
      reason: getInfo,
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
