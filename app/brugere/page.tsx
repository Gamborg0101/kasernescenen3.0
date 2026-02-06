import { prisma } from '@/db';
import BrugerTabel from './BrugerTabel';

export default async function Brugere() {
  const users = await prisma.user.findMany();

  console.log('Data fetched from database:', users);

  return <BrugerTabel users={users} />;
}
