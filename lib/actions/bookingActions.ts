'use server';

import { auth } from '@/auth/authSetup';
import { revalidatePath } from 'next/cache';
import { createBooking, deleteBooking } from '../db/bookings';
import { cleanDbFromOldBookings } from '../db/bookings';
import { ratelimit } from '../ratelimiter';
import bookingConflicts from '../utils/bookingConflicts';
import * as z from 'zod';
import {
  sessionError,
  ratelimitError,
  failedToCreateBooking,
  failedToDeleteBooking,
  failedToCleanupDb,
  unauthorizedAccess,
} from '../errorMessages';

export async function makeBooking(prevState: unknown, formData: FormData) {
  const session = await auth();
  if (!session) return sessionError;

  const userId = Number(session.user.id);
  const { success } = await ratelimit.limit(`booking:create:${userId}`);

  if (!success) {
    return ratelimitError;
  }

  const getStartHour = formData.get('startHour');
  const getEndHour = formData.get('endTime');
  const getRoomNumber = formData.get('roomNumber');
  const getInfo = formData.get('reason');

  const rawBooking = {
    startHour: getStartHour,
    endTime: getEndHour,
    roomNumber: getRoomNumber,
    info: getInfo,
  };

  const bookingSchema = z.object({
    startHour: z.iso.datetime(),
    endTime: z.iso.datetime(),
    roomNumber: z.string().nonempty(),
    info: z.string().min(1).max(100),
  });

  const data = bookingSchema.safeParse(rawBooking);

  if (!data.success) {
    console.log(data.error);
    return failedToCreateBooking;
  }

  const startHourDate = new Date(data.data.startHour);
  const endTimeDate = new Date(data.data.endTime);

  const bookingInfo = {
    startHour: startHourDate,
    endTime: endTimeDate,
    roomNumber: data.data.roomNumber,
    info: data.data.info,
  };

  try {
    const validBooking = await bookingConflicts(bookingInfo);

    if (!validBooking.success) {
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

  if (session.user.role !== 'admin') return unauthorizedAccess;
  try {
    await cleanDbFromOldBookings();
    return { success: true, error: null };
  } catch (e) {
    console.error(e);
    return failedToCleanupDb;
  }
}
