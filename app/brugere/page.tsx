'use server';
import BrugerTabel from './BrugerTabel';
import { JSX } from 'react';
import { auth } from '@/auth/authSetup';
import { redirect } from 'next/navigation';
import { getUsers } from '@/lib/db/users';

export default async function Page(): Promise<JSX.Element> {
  const session = await auth();

  if (session?.user.role !== 'admin') {
    redirect('/booking');
  }

  const users = await getUsers();

  return <BrugerTabel users={users} />;
}