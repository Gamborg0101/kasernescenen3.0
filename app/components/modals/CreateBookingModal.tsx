'use client';

import { createBooking } from '@/app/booking/BookingActions';
import { useActionState, useEffect } from 'react';
import { UserInfoSession } from '@/app/types/types';
import { startOfDay } from 'date-fns';

type Props = {
  onClose: () => void;
  roomNumber: number;
  startHour: Date;
  userInfoSession: UserInfoSession;
};

export default function CreateBookingModal({
  onClose,
  roomNumber,
  startHour,
  userInfoSession,
}: Props) {
  const [data, action] = useActionState(createBooking, null);

  useEffect(() => {
    if (data?.success) {
      onClose();
    }
  }, [data, onClose]);

  const inputClass =
    'w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500';

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl w-80 p-6 relative shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-row-reverse">
          <button
            className="w-6 h-6 bg-indigo-600 text-white rounded-md py-2 hover:bg-indigo-700 transition flex justify-center items-center"
            onClick={onClose}
          >
            x
          </button>
        </div>
        <h2 className="text-2xl font-semibold mb-2 text-center">
          Book et lokale
        </h2>

        <form action={action}>
          <input type="hidden" name="roomNumber" value={roomNumber} />
          <input
            type="hidden"
            name="startHour"
            id="startHour"
            value={startHour.toLocaleTimeString('de', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          />
          <input
            type="hidden"
            name="date"
            id="date"
            value={startHour.toDateString()}
          />

          <label
            htmlFor="roomNumber"
            className="text-xs font-bold text-gray-500"
          >
            Rum:
          </label>
          <input
            id="roomNumber"
            type="text"
            className={inputClass + ' bg-gray-300'}
            value={roomNumber}
            readOnly
          />
          <label htmlFor="date" className="text-xs font-bold text-gray-500">
            Dato:
          </label>
          <input
            id="dateShow"
            type="text"
            className={inputClass + ' bg-gray-300'}
            value={startHour.toLocaleDateString()}
            readOnly
          />
          <label
            htmlFor="startHour"
            className="text-xs font-bold text-gray-500"
          >
            Start:
          </label>
          <input
            id="startHourShow"
            type="text"
            className={inputClass + ' bg-gray-300'}
            value={startHour.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
            readOnly
          />
          <label htmlFor="endHour" className="text-xs font-bold text-gray-500">
            Slut:
          </label>
          <input
            id="endHour"
            type="time"
            name="endHour"
            placeholder="sluttid"
            className={inputClass}
            required
          />
          <label htmlFor="name" className="text-xs font-bold text-gray-500">
            Navn:
          </label>
          <input
            id="name"
            type="text"
            className={inputClass + ' bg-gray-300'}
            value={userInfoSession.name}
            readOnly
          />
          <label htmlFor="email" className="text-xs font-bold text-gray-500">
            Email:
          </label>
          <input
            id="email"
            type="text"
            className={inputClass + ' bg-gray-300'}
            value={userInfoSession.email}
            readOnly
          />
          {data?.error && (
            <p className="text-red-500 text-sm mt-1">{data.error}</p>
          )}

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
