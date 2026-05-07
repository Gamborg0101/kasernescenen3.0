'use client';
import { useState } from 'react';
import { createRoom } from '@/lib/actions/roomActions';
import { useRouter } from 'next/navigation';

type Props = {
  onClose: () => void;
};

export default function CreateRoomModal({ onClose }: Props) {
  const [roomName, setRoomName] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [roomLocation, setRoomLocation] = useState('');
  const [roomCapacity, setRoomCapacity] = useState('');
  const router = useRouter();

  const getClassName =
    'w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent mb-4';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await createRoom({
      name: roomName,
      roomNum: Number(roomNumber),
      location: roomLocation,
      capacity: Number(roomCapacity),
    });
    router.refresh();
    onClose();
  }
  return (
    <div>
      <div className="relative">
        <div
          className="fixed inset-0 bg-black/60 z-1 select-none bg-opacity-10 flex items-center justify-center"
          onClick={onClose}
        >
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
                <h2 className="text-2xl font-semibold mb-2 text-center">Tilføj Rum</h2>

                <form onSubmit={handleSubmit}>
                  <label htmlFor="roomName">Rumnavn</label>
                  <input
                    type="text"
                    name="Rumnavn"
                    className={getClassName}
                    placeholder="Rumnavn"
                    onChange={(e) => {
                      setRoomName(e.target.value);
                    }}
                  />
                  <label htmlFor="roomNumber">Rumnummer</label>
                  <input
                    type="text"
                    name="roomNumber"
                    placeholder="Rumnummer"
                    className={getClassName}
                    onChange={(e) => {
                      setRoomNumber(e.target.value);
                    }}
                  />
                  <label htmlFor="roomLocation">Lokation</label>
                  <input
                    type="text"
                    name="roomLocation"
                    placeholder="Lokation"
                    className={getClassName}
                    onChange={(e) => {
                      setRoomLocation(e.target.value);
                    }}
                  />
                  <label htmlFor="capacity">Kapacitet</label>
                  <input
                    type="text"
                    name="capacity"
                    placeholder="Kapacitet"
                    className={getClassName}
                    onChange={(e) => {
                      setRoomCapacity(e.target.value);
                    }}
                  />

                  <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white rounded-md py-2 hover:bg-indigo-700 transition"
                  >
                    Tilføj rum
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
