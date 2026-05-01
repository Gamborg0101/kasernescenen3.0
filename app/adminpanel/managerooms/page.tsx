import RoomsList from '@/components/lists/RoomsList';
import { prisma } from '@/db';
import { getRoomsFromDB } from '@/lib/db/rooms';

export default async function manageRooms() {
  const getRooms = await getRoomsFromDB();

  return (
    <div>
      <RoomsList rooms={getRooms} />
    </div>
  );
}
