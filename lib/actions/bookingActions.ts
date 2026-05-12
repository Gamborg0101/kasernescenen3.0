'use server';

import { auth } from '@/auth/authSetup';
import { revalidatePath } from 'next/cache';
import { createBooking, deleteBooking } from '../db/bookings';
import { deleteOldBooking } from '../db/bookings';
import { ratelimit } from '../ratelimiter';
import bookingConflicts from '../utils/bookingConflicts';
import { validateHeaderName } from 'node:http';

export async function makeBooking(prevState: unknown, formData: FormData) {
  const session = await auth();
  if (!session) throw new Error('Du er ikke logget ind');

  const userId = Number(session.user.id);

  const success = ratelimit.limit(`booking:create:${userId}`);

  if (!success) {
    return {
      success: false,
      error: 'Ratelimit reached',
    };
  }

  const getStartHour = String(formData.get('startHour'));
  const getEndHour = Number(formData.get('endHour'));
  const getEndHourMins = String(formData.get('endHourMins'));
  const getRoomNumber = Number(formData.get('roomNumber'));
  const getDate = String(formData.get('getDate'));
  const getInfo = String(formData.get('reason') || '');

  const bookingInfo = {
    startHour: getStartHour,
    endHour: getEndHour,
    endMins: getEndHourMins,
    roomNumber: getRoomNumber,
    date: getDate,
    info: getInfo,
  };

  const validBooking = await bookingConflicts(bookingInfo);

  if ('error' in validBooking) {
    return { success: false, error: validBooking.error };
  }

  await createBooking(validBooking);

  revalidatePath('/booking');
  return { success: true, error: null };
}

export async function deleteABooking(bookingId: number) {
  const session = await auth();

  if (!session) throw new Error('Du er ikke logget ind');

  const userId = Number(session?.user.id);

  const success = ratelimit.limit(`booking:delete:${userId}`);

  if (!success) {
    return {
      success: false,
      error: 'Ratelimit reached',
    };
  }

  await deleteBooking(bookingId, Number(session.user.id), session.user.role);
  revalidatePath('/userpage');
}

export async function deleteOldBookings() {
  const session = await auth();

  if (!session) throw new Error('Du er ikke logget ind');

  const userId = Number(session?.user.id);

  const success = ratelimit.limit(`booking:delete:${userId}`);

  if (!success) {
    return {
      success: false,
      error: 'Ratelimit reached',
    };
  }
  return deleteOldBooking();
}
