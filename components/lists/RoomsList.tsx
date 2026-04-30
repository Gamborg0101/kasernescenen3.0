import { Room } from '@/generated/prisma';
export default function RoomsList({ rooms }: { rooms: Room }) {
  console.log(rooms);
  return (
    <div>
      {/* {rooms.map((item, index) => {
        <div key={index}>
            {item.}
        </div>;
      })}
      <p>These are the rooms</p> */}
    </div>
  );
}
