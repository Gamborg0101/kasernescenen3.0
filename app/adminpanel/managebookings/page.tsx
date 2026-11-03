import { auth } from '@/auth/authSetup';
import { sessionError, adminRoleRequired } from '@/lib/errorMessages';
import { redirect } from 'next/navigation';
import { roles } from "@/lib/enums"

export default async function manageBookings() {
  const session = await auth();
  if (!session) {
    console.error(sessionError);
    redirect('/');
  }
  if (session.user.role !== roles.admin) {
    console.error(adminRoleRequired);
    redirect('/');
  }

  return (
    <div>
      <p>Hello from manageBokings</p>
    </div>
  );
}
