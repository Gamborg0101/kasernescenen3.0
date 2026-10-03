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
    phone: z.coerce.number().min(10000000).max(99999999),
    email: z.email(),
    studentNumber: z.coerce.number().min(100000000).max(999999999),
    cardNumber: z.coerce.number().min(100000).max(999999),
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

  const parsedId = verifyUserId(userId);

  if (!parsedId.success) return failedToDeleteUser;
  const targetId = parsedId.data;
  const currentUserId = Number(session.user.id);

  const { success } = await ratelimit.limit(`user:delete:${currentUserId}`);
  if (!success) return ratelimitError;

  if (session.user.role !== 'admin' && currentUserId !== targetId) return failedToDeleteUser;

  try {
    await DeleteUserBookingDB(targetId);
    await DeleteUserFromDB(targetId);
    return success;
  } catch (e) {
    console.error(e);
    return failedToDeleteUser;
  }
}

function verifyUserId(userId: number) {
  const parsedId = z.number().positive().safeParse(userId);
  return parsedId;
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
    role?: string;
  },
) {
  const session = await auth();
  if (!session) return sessionError;
  if (session.user.role !== 'admin') return userIsNotAdmin;

  const formValidation = z.object({
    firstName: z.string().min(1).max(30).optional(),
    lastName: z.string().min(1).max(30).optional(),
    phone: z.number().min(10000000).max(99999999).optional(),
    email: z.email().optional(),
    studentNumber: z.number().min(100000000).max(999999999).optional(),
    cardNumber: z.number().min(100000).max(999999).optional(),
    study: z.string().min(6).max(30).optional(),
    role: z.enum(['admin', 'student']).optional(),
  });

  const result = formValidation.safeParse(data);
  if (!result.success) return failedToUpdateUser;

  const parsedId = verifyUserId(userId);
  if (!parsedId.success) return failedToUpdateUser;

  const { success } = await ratelimit.limit(`user:update:${session.user.id}`);
  if (!success) return ratelimitError;

  try {
    await UpdateUserDb(parsedId.data, result.data);
    return success;
  } catch (e) {
    console.error(e);
    return failedToUpdateUser;
  }
}
