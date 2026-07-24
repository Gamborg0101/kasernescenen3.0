'use server';
import { convertStartAndEndHour } from './convertStartAndEndHour';
import { getRoomByNum } from '../db/rooms';
import { findBooking } from '../db/bookings';
import { auth } from '@/auth/authSetup';

export default async function bookingConflicts({
  startHour,
  endHour,
  endMins,
  roomNumber,
  date,
  info,
}: {
  startHour: string;
  endHour: number;
  endMins: string;
  roomNumber: number;
  date: string;
  info: string;
}) {
  const session = await auth();
  if (!session) {
    return { success: false, error: 'Not authenticated' };
  }
  if (!date || !startHour || !endHour || !info || !endMins) {
    return { success: false, error: 'Alle felter er påkrævet' };
  }

  const startAndEnd = convertStartAndEndHour(startHour, endHour, endMins);

  const room = await getRoomByNum(roomNumber);

  if (!room) {
    return { success: false, error: 'Lokalet findes ikke' };
  }

  if (typeof endHour !== 'number') {
    return { success: false, error: 'Sluttiden skal være et tal' };
  }

  if (info.length >= 35) {
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
  return {
    roomId: room.id,
    startTime: startAndEnd.start,
    endTime: startAndEnd.end,
    userId: Number(session.user.id),
    reason: info,
  };
}
