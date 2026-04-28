'use server';

import { auth } from '@/auth/authSetup';
import { revalidatePath } from 'next/cache';
import { getRoomByNum } from '../db/rooms';
import { createBooking, findBooking, deleteBooking } from '../db/bookings';

function convertStartAndEndHour(
  startHour: string,
  endHour: number,
  endHourMins: string,
  getDate: string,
): { start: Date; end: Date } {
  const endTimeWithMins = `${endHour}:${endHourMins}`;

  const startFormatted = `${startHour.split('.')[0]}:${startHour.split('.')[1]}`;

  const startTime = new Date(`${getDate} ${startFormatted}`);
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

  const startAndEnd = convertStartAndEndHour(getStartHour, getEndHour, getEndHourMins, getDate);

  const room = await getRoomByNum(roomNumber);

  if (!room) {
    return { success: false, error: 'Lokalet findes ikke' };
  }

  if (typeof getEndHour !== 'number') {
    return { success: false, error: 'Sluttiden skal være et tal' };
  }

  if (getInfo.length >= 35) {
    return {
      success: false,
      error: 'Du må maks bruge 35 bogstaver til beskrivelsen',
    };
  }

  if (startAndEnd.start > startAndEnd.end) {
    return { success: false, error: 'Starttiden må ikke være efter sluttid' };
  }

  if (startAndEnd.start < new Date()) {
    return { success: false, error: 'Du kan ikke booke i fortiden' };
  }

  const conflictBooking = await findBooking({
    roomId: room.id,
    startTime: startAndEnd.start,
    endTime: startAndEnd.end,
  });

  if (conflictBooking) {
    return {
      success: false,
      error: 'Lokalet er allerede booket i det valgte tidsrum.',
    };
  }

  await createBooking({
    roomId: room.id,
    startTime: startAndEnd.start,
    endTime: startAndEnd.end,
    userId: Number(session.user.id),
    reason: getInfo,
  });

  revalidatePath('/booking');
  return { success: true, error: null };
}

export async function deleteABooking(bookingId: number) {
  const session = await auth();
  if (!session) throw new Error('Ikke logget ind');

  if (session) {
    await deleteBooking(bookingId, Number(session.user.id));
    revalidatePath('/userpage');
  }
}
