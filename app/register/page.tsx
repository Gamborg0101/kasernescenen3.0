import Register from '@/components/misc/Register';
import { prisma } from '@/db';

export default async function Opret({ searchParams }: { searchParams: Promise<{ message?: string }> }) {
  const { message } = await searchParams;
  const users = await prisma.user.findMany();

  return (
    <div>
      {message && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 text-sm px-4 py-3 rounded-sm mb-6">
          {message}
        </div>
      )}
      <Register users={users} />
    </div>
  );
}
