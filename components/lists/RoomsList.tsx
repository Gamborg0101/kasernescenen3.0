import { Room } from '@/generated/prisma';
export default function RoomsList({ rooms }: { rooms: Room[] }) {
  return (
    <div>
      {rooms.map((item, index) => (
        <div key={index}>
          {item.id} {/* or any field */}
        </div>
      ))}
      <p>These are the rooms</p>
    </div>
  );
}

