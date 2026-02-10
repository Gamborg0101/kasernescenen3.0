type Props = {
  roomNumber: number;
  setRoomNumber: (room: number) => void;
};

export default function RoomSelector({ roomNumber, setRoomNumber }: Props) {
  return (
    <div className="w-64">
      <select
        id="room"
        name="room"
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={roomNumber}
        onChange={(e) => setRoomNumber(Number(e.target.value))}
      >
        <option value="114">Rum 114</option>
        <option value="116">Rum 116</option>
        <option value="118">Rum 118</option>
        <option value="120">Rum 120</option>
      </select>
    </div>
  );
}
