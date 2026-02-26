'use server';
import { prisma } from '@/db';
import BrugerTabel from './BrugerTabel';
import { JSX } from 'react';
import { auth } from '@/auth/authSetup';
import { redirect } from 'next/navigation';

// Denne funktion henter alle brugere fra databasen.
export default async function Page(): Promise<JSX.Element> {
  const users = await prisma.user.findMany();

  const session = await auth();

  if (session?.user.role !== 'admin') {
    redirect('/booking');
  }

  return <BrugerTabel users={users} />;
}
