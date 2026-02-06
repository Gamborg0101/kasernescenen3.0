import { prisma } from '@/db';
import BrugerTabel from './BrugerTabel';
import { JSX } from 'react';

export default async function Brugere(): Promise<JSX.Element> {
  const users = await prisma.user.findMany();

  console.log('Data fetched from database:', users);

  return <BrugerTabel users={users} />;
}
