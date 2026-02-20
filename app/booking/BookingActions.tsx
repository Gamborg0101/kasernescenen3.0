'use server';

import { prisma } from '@/db';
import { auth } from '@/auth/authSetup';

export async function getBookings() {
  const bookings = await prisma.booking.findMany();
  return bookings;
}

export async function getUserInfo() {
  const session = await auth();

  if (!session) return { name: '', email: '' };

  const user = session.user;

  return {
    name: user?.name || '',
    email: user?.email || '',
  };
}
