'use client';

import { createBooking } from '@/app/booking/BookingActions';
import { useActionState, useEffect } from 'react';

type UserInfo = {
  name: string;
  email: string;
  id?: string;
  phone: number;
};

type Props = {
  onClose: () => void;
  roomNumber: number;
  startHour: { date: string; hour: string };
  userInfo: UserInfo;
};

export default function CreateBookingModal({
  onClose,
  roomNumber,
  startHour,
  userInfo,
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
          <input type="hidden" name="startHour" value={startHour.hour} />

          <input
            type="text"
            className={inputClass + ' bg-gray-300'}
            value={roomNumber}
            readOnly
          />
          <input
            type="text"
            className={inputClass + ' bg-gray-300'}
            name="date"
            value={startHour.date}
            readOnly
          />
          <input
            type="text"
            className={inputClass + ' bg-gray-300'}
            value={
              startHour.hour.split(':')[0] + ':' + startHour.hour.split(':')[1]
            }
            readOnly
          />
          <input
            type="text"
            name="endHour"
            placeholder="sluttid"
            className={inputClass}
          />
          <input
            type="text"
            className={inputClass + ' bg-gray-300'}
            value={userInfo.name}
            readOnly
          />
          <input
            type="text"
            className={inputClass + ' bg-gray-300'}
            value={userInfo.email}
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
