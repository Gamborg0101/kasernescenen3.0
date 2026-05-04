import RoomsList from '@/components/lists/RoomsList';
import { getRoomsFromDB } from '@/lib/db/rooms';

export default async function manageRooms() {
  const getRooms = await getRoomsFromDB();

  return (
    <div>
      <RoomsList rooms={getRooms} />
    </div>
  );
}
