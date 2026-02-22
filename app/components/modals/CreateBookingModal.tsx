'use client';

import { createBooking } from '@/app/booking/BookingActions';

type UserInfo = {
  name: string;
  email: string;
  id?: string;
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

        <form action={createBooking}>
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
            className={inputClass}
            value={startHour.date}
            readOnly
          />
          <input
            type="text"
            className={inputClass}
            value={startHour.hour}
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
            className={inputClass}
            value={userInfo.name}
            readOnly
          />
          <input
            type="text"
            className={inputClass}
            value={userInfo.email}
            readOnly
          />
          <input type="phone" placeholder="telefon" className={inputClass} />
          <select name="afdelinger" className={inputClass}>
            <option value="æk">Æstetik og kultur</option>
            <option value="musikvidenskab">Musikvidenskab</option>
            <option value="kunsthistorie">Kunsthistorie</option>
          </select>
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
