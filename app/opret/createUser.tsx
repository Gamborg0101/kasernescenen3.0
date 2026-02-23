import { prisma } from '@/db';
import { redirect } from 'next/navigation';

export async function createUser(data: {
  firstName: string;
  lastName: string;
  phone: number;
  email: string;
  studentNumber: number;
  cardNumber: number;
  category: string;
}) {
  await prisma.user.create({
    data,
  });
  redirect('/booking');
}
