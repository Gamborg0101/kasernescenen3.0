'use client';

import { makeBooking } from '@/lib/actions/bookingActions';
import { useActionState, useEffect } from 'react';
import { SessionUser } from '@/lib/types';
import { addHours } from 'date-fns';

type Props = {
  onClose: () => void;
  roomNumber: number;
  startHour: Date;
  userInfoSession: SessionUser;
};

export default function CreateBookingModal({ onClose, roomNumber, startHour, userInfoSession }: Props) {
  const [data, action] = useActionState(makeBooking, null);

  useEffect(() => {
    if (data?.success) {
      onClose();
    }
  }, [data, onClose]);

  const inputClass =
    'w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500';

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-1 select-none" onClick={onClose}>
      <div className="bg-white rounded-xl w-80 p-6 relative shadow-lg" onClick={(e) => e.stopPropagation()}>
        <div className="flex flex-row-reverse">
          <button
            className="w-6 h-6 bg-indigo-600 text-white rounded-md py-2 hover:bg-indigo-700 transition flex justify-center items-center"
            onClick={onClose}
          >
            <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"
                fill="#ffffff"
              />
            </svg>
          </button>
        </div>
        <h2 className="text-2xl font-semibold mb-2 text-center">Book et lokale</h2>

        <form action={action}>
          <input type="hidden" name="roomNumber" value={roomNumber} />
          <input
            type="hidden"
            name="startHour"
            id="startHour"
            value={startHour.toLocaleTimeString('dk', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          />
          <input type="hidden" name="getDate" id="getDate" value={startHour.toDateString()} />
          <label htmlFor="roomNumber" className="text-xs font-bold text-gray-500">
            Rum:
          </label>
          <input
            id="roomNumber"
            type="text"
            className={inputClass + ' bg-gray-300 pointer-events-none'}
            value={roomNumber}
            readOnly
          />
          <label htmlFor="date" className="text-xs font-bold text-gray-500">
            Dato:
          </label>
          <input
            type="text"
            className={inputClass + ' bg-gray-300 pointer-events-none'}
            value={startHour.toLocaleDateString()}
            readOnly
          />
          <label htmlFor="startHour" className="text-xs font-bold text-gray-500">
            Start:
          </label>

          <input
            id="startHourShow"
            type="text"
            className={inputClass + ' bg-gray-300 pointer-events-none'}
            value={startHour.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
            readOnly
          />
          <label htmlFor="endHour" className="text-xs font-bold text-gray-500">
            Slut:
          </label>

          <div className="flex">
            <input
              type="text"
              minLength={1}
              maxLength={2}
              name="endHour"
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              defaultValue={addHours(startHour, 1).toLocaleTimeString('da-DK', { hour: '2-digit', minute: '2-digit' })}
            />
            <select
              name="endHourMins"
              id="endHourMins"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              defaultValue={'00'}
            >
              <option value="00">00</option>
              <option value="15">15</option>
              <option value="30">30</option>
              <option value="45">45</option>
            </select>
          </div>

          <label htmlFor="name" className="text-xs font-bold text-gray-500">
            Navn:
          </label>
          <input
            id="name"
            type="text"
            className={inputClass + ' bg-gray-300 pointer-events-none'}
            value={userInfoSession.name}
            readOnly
          />
          <label htmlFor="email" className="text-xs font-bold text-gray-500">
            Email:
          </label>
          <input
            id="email"
            type="text"
            className={inputClass + ' bg-gray-300 pointer-events-none'}
            value={userInfoSession.email}
            readOnly
          />
          <label htmlFor="reason" className="text-xs font-bold text-gray-500">
            Aktivitet:
          </label>
          <input
            type="text"
            name="reason"
            id="reason"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {data?.error && <p className="text-red-500 text-sm mt-1">{data.error}</p>}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white rounded-md py-2 hover:bg-indigo-700 transition mt-2"
          >
            Book
          </button>
        </form>
      </div>
    </div>
  );
}
