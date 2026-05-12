'use server';

import { auth } from '@/auth/authSetup';
import { revalidatePath } from 'next/cache';
import { createBooking, deleteBooking } from '../db/bookings';
import { cleanDbFromOldBookings } from '../db/bookings';
import { ratelimit } from '../ratelimiter';
import bookingConflicts from '../utils/bookingConflicts';
import { sessionError, ratelimitError, failedToCreateBooking } from '../errorMessages';

export async function makeBooking(prevState: unknown, formData: FormData) {
  const session = await auth();
  if (!session) return sessionError;

  const userId = Number(session.user.id);
  const { success } = await ratelimit.limit(`booking:create:${userId}`);

  if (!success) {
    return ratelimitError;
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
  const session = await auth();
  if (!session) {
    return sessionError;
  }

  const userId = Number(session.user.id);
  const { success } = await ratelimit.limit(`booking:delete:${userId}`);

  if (!success) {
    return ratelimitError;
  }

  await deleteBooking(bookingId, Number(session.user.id), session.user.role);
  revalidatePath('/userpage');
  return { success: true, error: null };
}

export async function cleanDbFromOldBookingsAction() {
  const session = await auth();
  if (!session) return sessionError;

  const userId = Number(session?.user.id);

  const { success } = await ratelimit.limit(`booking:delete:${userId}`);
  if (!success) return ratelimitError;
  try {
    return cleanDbFromOldBookings();
  } catch (e) {
    console.error(e);
  }
}
