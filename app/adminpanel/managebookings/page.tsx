import { auth } from '@/auth/authSetup';
import { sessionError, adminRoleRequired } from '@/lib/errorMessages';
import { redirect } from 'next/navigation';
import { Role } from "@/generated/prisma";

export default async function manageBookings() {
  const session = await auth();
  if (!session) {
    console.error(sessionError);
    redirect('/');
  }
  if (session.user.role !== Role.admin) {
    console.error(adminRoleRequired);
    redirect('/');
  }

  return (
    <div>
      <p>Hello from manageBokings</p>
    </div>
  );
}
