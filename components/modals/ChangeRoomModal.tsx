'use client';
import { Room } from '@/generated/prisma';
import { useState } from 'react';
import { updateRoomAction } from '@/lib/actions/roomActions';
import { useRouter } from 'next/navigation';

type Props = {
  onClose: () => void;
  room: Room;
};

export default function ChangeRoomModal({ onClose, room }: Props) {
  const [name, setRoomName] = useState(room.name);
  const [roomNumber, setRoomNumber] = useState(room.roomNum);
  const [location, setLocation] = useState(room.location);
  const [capacity, setCapacity] = useState(room.capacity);
  const router = useRouter();

  const getClassName =
    'w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent mb-4';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await updateRoomAction(room.id, {
      name: name ?? undefined,
      roomNum: roomNumber ?? undefined,
      location: location ?? undefined,
      capacity: capacity ?? undefined,
    });
    router.refresh();
    onClose();
  }

  return (
    <div className="relative">
      <div className="fixed inset-0 bg-opacity-10 flex items-center justify-center" onClick={onClose}>
        <div className="">
          <div
            className="modal-content"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="bg-white rounded-xl w-80 p-6 relative shadow-lg">
              <div className="flex flex-row-reverse">
                <button
                  className=" w-6 h-6 bg-indigo-600 text-white rounded-md py-2 hover:bg-indigo-700 transition flex justify-center items-center"
                  onClick={onClose}
                >
                  x
                </button>
              </div>
              <h2 className="text-2xl font-semibold mb-2 text-center">Ændre bruger</h2>

              <form onSubmit={handleSubmit}>
                <label htmlFor="id">Id</label>
                <input
                  type="text"
                  name="id"
                  placeholder="Id"
                  defaultValue={room.id}
                  className={getClassName + ' bg-gray-200 cursor-not-allowed'}
                  readOnly
                />
                <label htmlFor="roomName">Rum navn</label>
                <input
                  type="text"
                  name="roomName"
                  className={getClassName}
                  placeholder="Fornavn"
                  defaultValue={room.name}
                  onChange={(e) => {
                    setRoomName(e.target.value);
                  }}
                />
                <label htmlFor="roomNumber">Rum nummer</label>
                <input
                  type="text"
                  name="lastName"
                  className={getClassName}
                  defaultValue={room.roomNum}
                  onChange={(e) => {
                    setRoomNumber(Number(e.target.value));
                  }}
                />
                <label htmlFor="roomLocation">Lokation</label>
                <input
                  type="text"
                  name="roomLocation"
                  placeholder="Lokation"
                  className={getClassName}
                  defaultValue={room.location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                  }}
                />
                <label htmlFor="capacity">Kapacitet</label>
                <input
                  type="text"
                  name="capacity"
                  placeholder="Kapacitet"
                  className={getClassName}
                  defaultValue={room.capacity}
                  onChange={(e) => {
                    setCapacity(Number(e.target.value));
                  }}
                />

                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white rounded-md py-2 hover:bg-indigo-700 transition"
                >
                  Ændre bruger
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
