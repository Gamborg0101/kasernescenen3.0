import RoomsList from '@/components/lists/RoomsList';
import { getRoomsFromDB } from '@/lib/db/rooms';
import { auth } from '@/auth/authSetup';
import { sessionError, adminRoleRequired } from '@/lib/errorMessages';
import { redirect } from 'next/navigation';
import { Role } from '@/generated/prisma';

export default async function manageRooms() {
  const session = await auth();
  if (!session) {
    console.error(sessionError);
    redirect('/');
  }
  if (session.user.role !== Role.admin) {
    console.error(adminRoleRequired);
    redirect('/');
  }

  const getRooms = await getRoomsFromDB();

  return (
    <div>
      <RoomsList rooms={getRooms} />
    </div>
  );
}
