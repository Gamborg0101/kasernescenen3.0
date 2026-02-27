'use client';

import { BookingCardProps } from '@/app/types/types';
import { deleteBooking } from '@/app/booking/BookingActions';

export default function BookingCard({ item }: { item: BookingCardProps }) {
  return (
    //Fornavn
    //Mail
    //Studie
    //Studienummer
    //Rolle
    //3 næste bookinger
    //.  Start
    //.  Slut
    //.  Lokale
    //.  <btn> Slet booking </btn>

    <div className="flex flex-col h-full p-4 bg-amber-500  text-xs">
      <div className="h-full">
        <p>Booking: </p>

        {item.startTime.toLocaleDateString('da-DK', {
          day: '2-digit',
          month: '2-digit',
        })}
        {` ${item.startTime.toLocaleTimeString('da-DK', {
          hour: '2-digit',
          minute: '2-digit',
        })} - ${item.endTime.toLocaleTimeString('da-DK', {
          hour: '2-digit',
          minute: '2-digit',
        })}`}
        <br />
        <button
          className="bg-red-400 hover:bg-red-300 w-full"
          onClick={() => deleteBooking(item.roomId, item.id)}
        >
          Slet booking
        </button>
      </div>
    </div>
  );
}
