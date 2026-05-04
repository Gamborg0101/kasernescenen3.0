'use client';
import { Room } from '@/generated/prisma';
import React from 'react';
import ChangeRoomModal from '../modals/ChangeRoomModal';
import { deleteRoom } from '@/lib/actions/roomActions';

export default function RoomsList({ rooms }: { rooms: Room[] }) {
  const [roomsState, setRooms] = React.useState(rooms);
  const [toggleModal, setToggleModal] = React.useState(false);
  const [selectedRoom, setSelectedRoom] = React.useState<Room | null>(null);

  const handleDelete = async (roomId: number) => {
    await deleteRoom(roomId);
    setRooms(roomsState.filter((room) => room.id !== roomId));
  };

  return (
    <div className="bg-white border border-stone-100 shadow-sm rounded-2xl overflow-hidden">
      {/* Gradient top-stribe — matcher booking- og profilkortet */}

      <table className="w-full">
        <thead>
          <tr className="bg-stone-50 border-b border-stone-100">
            <th className="text-xs text-stone-400 uppercase tracking-wider font-medium px-5 py-3 text-left">ID</th>
            <th className="text-xs text-stone-400 uppercase tracking-wider font-medium px-5 py-3 text-left">Navn</th>
            <th className="text-xs text-stone-400 uppercase tracking-wider font-medium px-5 py-3 text-left">Nummer</th>
            <th className="text-xs text-stone-400 uppercase tracking-wider font-medium px-5 py-3 text-left">
              Lokation
            </th>
            <th className="text-xs text-stone-400 uppercase tracking-wider font-medium px-5 py-3 text-left">
              Kapacitet
            </th>
            <th className="px-5 py-3" />
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-100">
          {roomsState.map((room) => (
            <tr key={room.id} className="hover:bg-stone-50 transition-colors duration-100">
              <td className="px-5 py-3 text-sm text-stone-300 font-mono">{room.id}</td>
              <td className="px-5 py-3 text-sm text-stone-800 font-medium">{room.name}</td>
              <td className="px-5 py-3 text-sm text-stone-600">{room.roomNum}</td>
              <td className="px-5 py-3 text-sm text-stone-600">{room.location}</td>
              <td className="px-5 py-3 text-sm text-stone-600">{room.capacity}</td>
              <td className="px-5 py-3">
                <div className="flex items-center justify-end gap-2">
                  <button
                    className="text-xs text-stone-400 hover:text-stone-800 hover:bg-stone-100 border border-stone-100 px-3 py-1.5 rounded-xl transition-colors duration-150 font-medium"
                    onClick={() => {
                      setSelectedRoom(room);
                      setToggleModal(true);
                    }}
                  >
                    Ændre
                  </button>
                  <button
                    className="text-xs text-stone-400 hover:text-red-500 hover:bg-red-50 border border-stone-100 hover:border-red-100 px-3 py-1.5 rounded-xl transition-colors duration-150 font-medium"
                    onClick={() => handleDelete(room.id)}
                  >
                    Slet
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {toggleModal && selectedRoom && <ChangeRoomModal onClose={() => setToggleModal(false)} room={selectedRoom} />}
    </div>
  );
}
