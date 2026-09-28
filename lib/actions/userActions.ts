'use server';
import { auth } from '@/auth/authSetup';
import { createUser } from '../db/users';
import { redirect } from 'next/navigation';
import {
  DeleteUserBookings as DeleteUserBookingDB,
  updateUser as UpdateUserDb,
  DeleteUser as DeleteUserFromDB,
} from '../db/users';
import { ratelimit } from '../ratelimiter';
import {
  sessionError,
  ratelimitError,
  failedToDeleteUser,
  userIsNotAdmin,
  failedToUpdateUser,
  failedToCreateUser,
} from '../errorMessages';
import { prisma } from '@/db';
import * as z from 'zod';

export async function CreateUser(prevState: unknown, formData: FormData) {
  const session = await auth();

  if (!session) return sessionError;

  const formValidation = z.object({
    firstName: z.string().min(1).max(30),
    lastName: z.string().min(1).max(30),
    phone: z.coerce.number().int().min(10000000).max(99999999),
    email: z.email(),
    studentNumber: z.coerce.number().int().min(100000000).max(999999999),
    cardNumber: z.coerce.number().int().min(100000).max(999999),
    studie: z.string().min(6).max(30),
  });

  const result = formValidation.safeParse(Object.fromEntries(formData));
  if (!result.success) {
    return { success: false, error: 'Ugyldige oplysninger' };
  }

  const data = result.data;

  const googleId = session.user.googleId as string;

  const existing = await prisma.user.findFirst({
    where: { OR: [{ phone: data.phone }, { studentNumber: data.studentNumber }, { cardNumber: data.cardNumber }] },
    select: { phone: true, studentNumber: true, cardNumber: true },
  });

  if (existing) {
    if (existing.phone === data.phone) return { success: false, error: 'Dette telefonnummer er allerede brugt' };
    if (existing.studentNumber === data.studentNumber)
      return { success: false, error: 'Dette studienummer er allerede brugt' };
    return { success: false, error: 'Dette kortnummer er allerede brugt' };
  }

  try {
    await createUser({
      googleId: googleId,
      firstName: data.firstName,
      lastName: data.lastName,
      role: 'student',
      phone: data.phone,
      email: data.email,
      studentNumber: data.studentNumber,
      cardNumber: data.cardNumber,
      study: data.studie,
    });
  } catch (e) {
    console.error(e);
    return failedToCreateUser;
  }
  redirect('/booking');
}

export async function DeleteUser(userId: number) {
  const session = await auth();
  if (!session) return sessionError;

  const currentUserId = Number(session.user.id);
  const { success } = await ratelimit.limit(`user:delete:${currentUserId}`);

  if (!success) return ratelimitError;

  if (session.user.role !== 'admin' && Number(session.user.id) !== userId) return failedToDeleteUser;

  try {
    await DeleteUserBookingDB(userId);
    await DeleteUserFromDB(userId);
    return success;
  } catch (e) {
    console.error(e);
    return failedToDeleteUser;
  }
}

export async function UpdateUser(
  userId: number,
  data: {
    firstName?: string;
    lastName?: string;
    phone?: number;
    email?: string;
    studentNumber?: number;
    cardNumber?: number;
    study?: string;
    role: string;
  },
) {
  const session = await auth();
  if (!session) return sessionError;

  const currentUserId = Number(session.user.id);

  const { success } = await ratelimit.limit(`user:update:${currentUserId}`);

  if (!success) return ratelimitError;

  if (session.user.role !== 'admin') return userIsNotAdmin;

  try {
    await UpdateUserDb(userId, data);
    return success;
  } catch (e) {
    console.error(e);
    return failedToUpdateUser;
  }
}
