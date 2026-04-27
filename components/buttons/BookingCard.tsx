'use client';
import { BookingInfoProps } from '@/lib/types';
import { deleteABooking } from '@/lib/actions/bookingActions';

export default function BookingCard({ booking }: { booking: BookingInfoProps }) {
  return (
    <div className="h-full bg-stone-200 text-sm flex flex-col place-content-between  border border-white shadow shadow-white rounded-xl ">
      <p className="p-1 text-lg">{`${booking.room.roomNum} - ${booking.room.name}`}</p>

      <div className="p-1 text-gray-500">
        {booking.startTime.toLocaleDateString('da-DK', {
          weekday: 'short',
          day: 'numeric',
          month: 'short',
        })}
      </div>
      <div className="font-bold p-1">
        {` ${booking.startTime.toLocaleTimeString('da-DK', {
          hour: '2-digit',
          minute: '2-digit',
        })} - ${booking.endTime.toLocaleTimeString('da-DK', {
          hour: '2-digit',
          minute: '2-digit',
        })}`}
      </div>
      <p className="p-1 text-gray-500">{booking.reason}</p>
      <div className="flex justify-center items-center">
        <button
          className="bg-red-200 hover:bg-red-100 p-2 rounded-xl mb-2 font-bold"
          onClick={() => deleteABooking(booking.id, booking.userId)}
        >
          Slet booking
        </button>
      </div>
    </div>
  );
}
