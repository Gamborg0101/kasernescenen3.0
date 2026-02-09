'use server';
import { prisma } from '@/db';
import BrugerTabel from './BrugerTabel';
import { JSX } from 'react';

// Denne funktion henter alle brugere fra databasen.
export default async function Page(): Promise<JSX.Element> {
  const users = await prisma.user.findMany();

  console.log('Data fetched from database:', users);

  return <BrugerTabel users={users} />;
}
