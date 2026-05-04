'use client';
import { BookingInfoProps } from '@/lib/types';
import { deleteABooking } from '@/lib/actions/bookingActions';

export default function BookingCard({ booking }: { booking: BookingInfoProps }) {
  const date = booking.startTime.toLocaleDateString('da-DK', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });

  const start = booking.startTime.toLocaleTimeString('da-DK', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const end = booking.endTime.toLocaleTimeString('da-DK', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="h-full bg-white border border-stone-100 shadow-sm rounded-2xl flex flex-col overflow-hidden">
      {/* Gradient top-stribe — matcher profilkortets banner */}

      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Rum */}
        <div>
          <p className="text-xs text-stone-400 uppercase tracking-wider mb-0.5">Lokale</p>
          <p className="font-semibold text-stone-800 text-sm leading-tight">
            {booking.room.roomNum} — {booking.room.name}
          </p>
        </div>

        {/* Dato & tid */}
        <div>
          <p className="text-xs text-stone-400 uppercase tracking-wider mb-0.5">Tidspunkt</p>
          <p className="text-stone-500 text-xs capitalize">{date}</p>
          <p className="font-semibold text-stone-800 text-sm">
            {start} – {end}
          </p>
        </div>

        {/* Aktivitet */}
        {booking.reason && (
          <div>
            <p className="text-xs text-stone-400 uppercase tracking-wider mb-0.5">Aktivitet</p>
            <p className="text-stone-500 text-xs leading-snug">{booking.reason}</p>
          </div>
        )}

        {/* Slet-knap */}
        <div className="mt-auto pt-2">
          <button
            className="w-full text-xs text-stone-400 hover:text-red-500 hover:bg-red-50 border border-stone-100 hover:border-red-100 py-1.5 rounded-xl transition-colors duration-150 font-medium"
            onClick={() => deleteABooking(booking.id)}
          >
            Slet booking
          </button>
        </div>
      </div>
    </div>
  );
}
