import { RoomData } from './BookingCalendar';

type Props = {
  rooms: RoomData[];
  setRoomNumber: (room: string) => void;
  currentRoom: string;
};

export default function RoomSelector({ setRoomNumber, rooms, currentRoom }: Props) {
  return (
    <div className="w-64 flex justify-center items-center">
      <select
        id="room"
        name="room"
        className="w-full rounded-lg border border-gray-300 bg-white  py-2 text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 select-none"
        value={currentRoom}
        onChange={(e) => setRoomNumber(e.target.value)}
      >
        {rooms.map((room, index) => (
          <option key={index} value={room.number}>
            {`${room.number} - ${room.name}`}
          </option>
        ))}
      </select>
    </div>
  );
}
