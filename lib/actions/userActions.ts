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
  failedToCreateUser,
  failedToDeleteUser,
  userIsNotAdmin,
  failedToUpdateUser,
} from '../errorMessages';
import { prisma } from '@/db';

export async function CreateUser(prevState: unknown, formData: FormData) {
  const session = await auth();

  if (!session) return sessionError;

  const googleId = session.user.googleId as string;

  const phone = Number(formData.get('phone'));
  const studentNumber = Number(formData.get('studentNumber'));
  const cardNumber = Number(formData.get('cardNumber'));

  const existing = await prisma.user.findFirst({
    where: { OR: [{ phone }, { studentNumber }, { cardNumber }] },
    select: { phone: true, studentNumber: true, cardNumber: true },
  });

  if (existing) {
    if (existing.phone === phone) return { success: false, error: 'Dette telefonnummer er allerede brugt' };
    if (existing.studentNumber === studentNumber)
      return { success: false, error: 'Dette studienummer er allerede brugt' };
    return { success: false, error: 'Dette kortnummer er allerede brugt' };
  }

  try {
    await createUser({
      googleId: googleId,
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      role: 'student',
      phone: phone,
      email: formData.get('email') as string,
      studentNumber: studentNumber,
      cardNumber: cardNumber,
      study: formData.get('studie') as string,
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
