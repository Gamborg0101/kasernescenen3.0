'use client';
import { Room } from '@/generated/prisma';
import React from 'react';
import ChangeRoomModal from '../modals/ChangeRoomModal';

export default function RoomsList({ rooms }: { rooms: Room[] }) {
  const [toggleModal, setToggleModal] = React.useState(false);
  const [selectedRoom, setSelectedRoom] = React.useState<Room | null>(null);

  return (
    <div>
      <div>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Lokale navn</th>
              <th className="border border-gray-300 px-4 py-2">Lokale nummer</th>
              <th className="border border-gray-300 px-4 py-2">Lokale location</th>
              <th className="border border-gray-300 px-4 py-2">Lokale capacitet</th>
              <th className="border border-gray-300 px-4 py-2">Ændre / slet</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room, index) => (
              <tr key={room.id} className={index % 2 === 0 ? '' : 'bg-gray-100'}>
                <td className="border border-gray-300 px-4 py-2">{room.id}</td>
                <td className="border border-gray-300 px-4 py-2">{room.name}</td>
                <td className="border border-gray-300 px-4 py-2">{room.roomNum}</td>
                <td className="border border-gray-300 px-4 py-2">{room.location}</td>
                <td className="border border-gray-300 px-4 py-2">{room.capacity}</td>
                <td className="border border-gray-300 flex items-center justify-center px-4 py-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                    onClick={() => {
                      setSelectedRoom(room);
                      setToggleModal(true);
                    }}
                  >
                    Ændre
                  </button>
                </td>
                <td className="border border-gray-300 flex items-center justify-center px-4 py-2">
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    onClick={() => null}
                    type="submit"
                  >
                    Slet
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {toggleModal && selectedRoom && <ChangeRoomModal onClose={() => setToggleModal(false)} room={selectedRoom} />}
      </div>
    </div>
  );
}
