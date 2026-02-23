'use server';
import { auth } from '@/auth/authSetup';
import { createUser } from './createUser';
import { redirect } from 'next/navigation';

export async function OpretActions(formData: FormData) {
  const session = await auth();
  const googleId = session?.user?.googleId as string;

  await createUser({
    googleId: googleId,
    firstName: formData.get('firstName') as string,
    lastName: formData.get('lastName') as string,
    phone: Number(formData.get('phone')),
    email: formData.get('email') as string,
    studentNumber: Number(formData.get('studentNumber')),
    cardNumber: Number(formData.get('cardNumber')),
    category: formData.get('studie') as string,
  });

  redirect('/booking');
}
