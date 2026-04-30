'use server';
import AdminPanelGrid from '@/components/admin/AdminPanelGrid';

export default async function AdminPanel() {
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
