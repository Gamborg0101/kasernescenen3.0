import { Room as RoomType } from '@/generated/prisma';

type Props = {
  roomNumber: string;
  setRoomNumber: (room: string) => void;
  allRooms: RoomType[];
};

export default function RoomSelector({ roomNumber, setRoomNumber, allRooms }: Props) {
  return (
    <div className="w-64 flex justify-center items-center">
      <select
        id="room"
        name="room"
        className="w-full rounded-lg border border-gray-300 bg-white  py-2 text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 select-none"
        value={roomNumber}
        onChange={(e) => setRoomNumber(e.target.value)}
      >
        {allRooms.map((room, index) => (
          <option key={index} value={room.roomNumber}>
            {`${room.roomNumber} - ${room.name}`}
          </option>
        ))}
      </select>
    </div>
  );
}
