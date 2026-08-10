'use server';
import { getRoomByNum } from '../db/rooms';
import { findBooking } from '../db/bookings';
import { auth } from '@/auth/authSetup';

export async function validateBookingSlot({
  startHour,
  endTime,
  roomNumber,
  info,
}: {
  startHour: Date;
  endTime: Date;
  roomNumber: string;
  info: string;
}) {
  if (!startHour || !endTime || !info) {
    return { success: false, error: 'Alle felter er påkrævet' };
  }

  const room = await getRoomByNum(roomNumber);

  if (!room) {
    return { success: false, error: 'Lokalet findes ikke' };
  }

  if (info.length >= 35) {
    return {
      success: false,
      error: 'Du må maks bruge 35 bogstaver til beskrivelsen',
    };
  }

  if (startHour > endTime) {
    return { success: false, error: 'Starttiden må ikke være efter sluttid' };
  }

  if (startHour < new Date()) {
    return { success: false, error: 'Du kan ikke booke i fortiden' };
  }

  const conflictBooking = await findBooking({
    roomId: room.id,
    startTime: startHour,
    endTime: endTime,
  });

  if (conflictBooking) {
    return {
      success: false,
      error: 'Lokalet er allerede booket i det valgte tidsrum.',
    };
  }
  return { startHour: startHour, endTime: endTime, roomNumber: roomNumber, info: info };
}

export default async function bookingConflicts({
  startHour,
  endTime,
  roomNumber,
  info,
}: {
  startHour: Date;
  endTime: Date;
  roomNumber: string;
  info: string;
}) {
  const validbooking = await validateBookingSlot({
    startHour: startHour,
    endTime: endTime,
    roomNumber: roomNumber,
    info: info,
  });

  if ('error' in validateBookingSlot) {
    return validbooking;
  }

  const session = await auth();
  if (!session) {
    return { success: false, error: 'Not authenticated' };
  }

  return {
    roomNumber: validbooking.roomNumber,
    startTime: validbooking.startHour,
    endTime: validbooking.endTime,
    userId: Number(session.user.id),
    reason: validbooking.info,
  };
}
