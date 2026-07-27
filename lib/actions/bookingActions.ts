'use server';

import { auth } from '@/auth/authSetup';
import { revalidatePath } from 'next/cache';
import { createBooking, deleteBooking } from '../db/bookings';
import { cleanDbFromOldBookings } from '../db/bookings';
import { ratelimit } from '../ratelimiter';
import bookingConflicts from '../utils/bookingConflicts';
import {
  sessionError,
  ratelimitError,
  failedToCreateBooking,
  failedToDeleteBooking,
  failedToCleanupDb,
} from '../errorMessages';

export async function makeBooking(prevState: unknown, formData: FormData) {
  const session = await auth();
  if (!session) return sessionError;

  const userId = Number(session.user.id);
  const { success } = await ratelimit.limit(`booking:create:${userId}`);

  if (!success) {
    return ratelimitError;
  }

  const getStartHour = new Date(String(formData.get('startHour')));
  const getEndHour = new Date(String(formData.get('endTime')));
  const getRoomNumber = Number(formData.get('roomNumber'));
  const getInfo = String(formData.get('reason') || '');


  const bookingInfo = {
    startHour: getStartHour,
    endTime: getEndHour,
    roomNumber: getRoomNumber,
    info: getInfo,
  };

  if (isNaN(getStartHour.getTime()) || isNaN(getEndHour.getTime())) {
  return failedToCreateBooking;
}

  try {
    const validBooking = await bookingConflicts(bookingInfo);
    if ('error' in validBooking) {
      return { success: false, error: validBooking.error };
    }
    await createBooking(validBooking);
    revalidatePath('/booking');
    return { success: true, error: null };
  } catch (e) {
    console.error(e);
    return failedToCreateBooking;
  }
}

export async function deleteABooking(bookingId: number) {
  let session;
  try {
    session = await auth();
  } catch (e) {
    console.error(e);
    return sessionError;
  }
  if (!session) return sessionError;

  const userId = Number(session.user.id);
  const { success } = await ratelimit.limit(`booking:delete:${userId}`);

  if (!success) {
    return ratelimitError;
  }
  try {
    await deleteBooking(bookingId, Number(session.user.id), session.user.role);
    revalidatePath('/userpage');
    return { success: true, error: null };
  } catch (e) {
    console.error(e);
    return failedToDeleteBooking;
  }
}

export async function cleanDbFromOldBookingsAction() {
  const session = await auth();
  if (!session) return sessionError;

  const userId = Number(session.user.id);

  const { success } = await ratelimit.limit(`booking:delete:${userId}`);
  if (!success) return ratelimitError;
  try {
    await cleanDbFromOldBookings();
    return { success: true, error: null };
  } catch (e) {
    console.error(e);
    return failedToCleanupDb;
  }
}
