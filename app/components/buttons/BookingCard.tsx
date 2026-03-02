'use client';

import { BookingCardProps } from '@/app/types/types';
import { deleteBooking } from '@/app/booking/BookingActions';

export default function BookingCard({ item }: { item: BookingCardProps }) {
  return (
    <div className="h-full bg-stone-200 text-sm flex flex-col place-content-between ">
      <div className="p-1 text-gray-500">
        {item.startTime.toLocaleDateString('da-DK', {
          day: '2-digit',
          month: 'short',
        })}
      </div>

      <p className="p-1">{`${item.room.roomNum} - ${item.room.name}`}</p>
      <div className="font-bold p-1">
        {` ${item.startTime.toLocaleTimeString('da-DK', {
          hour: '2-digit',
          minute: '2-digit',
        })} - ${item.endTime.toLocaleTimeString('da-DK', {
          hour: '2-digit',
          minute: '2-digit',
        })}`}
      </div>
      <button
        className="bg-red-200 hover:bg-red-100"
        onClick={() => deleteBooking(item.roomId, item.id)}
      >
        Slet booking
      </button>
    </div>
  );
}
