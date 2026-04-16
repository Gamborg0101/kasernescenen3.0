'use server';

import { auth } from '@/auth/authSetup';
import { revalidatePath } from 'next/cache';
import { getUser } from '../lib/api/users';
import { getRoomByNum } from '../lib/api/rooms';
import { createBooking, findBooking, deleteBooking } from '../lib/api/bookings';

/* Skal ind i api/users.ts og kald fra page. */
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
/* Skal omlokalisere til api/users.ts - og så kaldes fra page når den skal bruges i view. */
export async function getUserFromDb() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error('Brugeren mangler id');
  }

  const user = await getUser(Number(session.user.id));

  if (!user) {
    throw new Error('Bruger ikke fundet');
  }

  return user;
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

export async function makeBooking(prevState: unknown, formData: FormData) {
  const session = await auth();

  if (!session) throw new Error('Du er ikke logget ind');

  const getStartHour = String(formData.get('startHour'));
  const getEndHour = Number(formData.get('endHour'));
  const getEndHourMins = String(formData.get('endHourMins'));
  const roomNumber = Number(formData.get('roomNumber'));
  const getDate = String(formData.get('getDate'));
  const getInfo = String(formData.get('reason') || '');

  if (!getDate || !getStartHour || !getEndHour || !getInfo || !getEndHourMins) {
    return { success: false, error: 'Alle felter er påkrævet' };
  }

  const stardAndEnd = convertStartAndEndHour(getStartHour, getEndHour, getEndHourMins, getDate);

  const room = await getRoomByNum(roomNumber);

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

  const conflictBooking = await findBooking({
    roomId: room.id,
    startTime: stardAndEnd.start,
    endTime: stardAndEnd.end,
  });

  if (conflictBooking) {
    return {
      success: false,
      error: 'Lokalet er allerede booket i det valgte tidsrum.',
    };
  }

  await createBooking({
    roomId: room.id,
    startTime: stardAndEnd.start,
    endTime: stardAndEnd.end,
    userId: Number(session.user.id),
    reason: getInfo,
  });

  revalidatePath('/booking');
  return { success: true, error: null };
}

export async function deleteABooking({
  roomId,
  bookingId,
  userId,
}: {
  roomId: number;
  bookingId: number;
  userId: number;
}) {
  const session = await auth();
  if (!session) throw new Error('Ikke logget ind');

  if (session) {
    await deleteBooking({
      userId: userId,
      roomId: roomId,
      bookingId: bookingId,
    });
    revalidatePath('/userpage');
  }
}
