import { auth } from '@/auth/authSetup';
import AdminPanelGrid from '@/components/admin/AdminPanelGrid';
import { adminRoleRequired, sessionError } from '@/lib/errorMessages';
import { redirect } from 'next/navigation';

export default async function AdminPanel() {
  const session = await auth();
  if (!session) {
    console.error(sessionError);
    redirect('/');
  }
  if (session.user.role !== 'admin') {
    console.error(adminRoleRequired);
    redirect('/');
  }

  return (
    <div>
      <AdminPanelGrid />
    </div>
  );
}

/*
 * Make room
 * See all users
 * Delete users
 * Modify users
 * See latest bookings
 * Have access to delete all bookings (update seeding to see bookings from other users)
 * Clean up server (Delete bookings more than 1 year old)
 * Import fra UVAEKA
 */
