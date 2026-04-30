import Register from '@/components/misc/Register';
import { prisma } from '@/db';

export default async function Opret() {
  const users = await prisma.user.findMany();

  return (
    <div>
      <Register users={users} />
    </div>
  );
}
