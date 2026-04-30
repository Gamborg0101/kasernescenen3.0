import RoomsList from '@/components/lists/RoomsList';
import { prisma } from '@/db';

export default async function manageRooms() {
  const getRooms = await prisma.room.findMany();

  return (
    <div>
      <RoomsList rooms={getRooms} />
    </div>
  );
}
