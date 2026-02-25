'use client';

import { BookingCardProps } from '@/app/types/types';
import { deleteBooking } from '@/app/booking/BookingActions';

export default function BookingCard({ item }: { item: BookingCardProps }) {
  return (
    <div className="bg-amber-500 p-1 w-30 text-sm">
      <div>
        {`Tidspunkt: ${item.startTime.toLocaleTimeString('da-DK', {
          hour: '2-digit',
          minute: '2-digit',
        })} - ${item.endTime.toLocaleTimeString('da-DK', { hour: '2-digit', minute: '2-digit' })} - ${item.startTime.toLocaleDateString('da-DK', { day: '2-digit', month: '2-digit' })}`}

        <button
          className="bg-red-400 hover:bg-red-300 w-full h-full"
          onClick={() => deleteBooking(item.roomId, item.id)}
        >
          Slet booking
        </button>
      </div>
    </div>
  );
}
