'use server';
import { auth } from '@/auth/authSetup';
import { createUser } from '@/app/register/createUser';
import { redirect } from 'next/navigation';
import { DeleteUserBookings as DeleteUserBookingDB, updateUser as UpdateUserDb } from '../api/users';

export async function OpretBruger(formData: FormData) {
  const session = await auth();
  const googleId = session?.user?.googleId as string;

  await createUser({
    googleId: googleId,
    firstName: formData.get('firstName') as string,
    lastName: formData.get('lastName') as string,
    role: 'student',
    phone: Number(formData.get('phone')),
    email: formData.get('email') as string,
    studentNumber: Number(formData.get('studentNumber')),
    cardNumber: Number(formData.get('cardNumber')),
    category: formData.get('studie') as string,
  });
  redirect('/booking');
}

export async function DeleteUser(userId: number) {
  const session = await auth();

  if (session?.user.role !== 'admin') return;

  DeleteUserBookingDB(userId);
  DeleteUser(userId);
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
    category?: string;
    role: string;
  },
) {
  await UpdateUserDb(userId, data);
}
