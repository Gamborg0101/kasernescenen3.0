'use client';

import { BookingInfoProps } from '@/app/types/types';
import { deleteBooking } from '@/app/booking/BookingActions';

export default function BookingCard({ item }: { item: BookingInfoProps }) {
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

/*
'use client';

import { BookingInfoProps } from '@/app/types/types';
import { deleteBooking } from '@/app/booking/BookingActions';
import { useState } from 'react';

export default function BookingCard({ item }: { item: BookingInfoProps }) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const date = item.startTime.toLocaleDateString('da-DK', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
  });

  const startTime = item.startTime.toLocaleTimeString('da-DK', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const endTime = item.endTime.toLocaleTimeString('da-DK', {
    hour: '2-digit',
    minute: '2-digit',
  });

  async function handleDelete() {
    setIsDeleting(true);
    await deleteBooking(item.roomId, item.id);
  }

  return (
    <div className="bg-white border border-[#f0ebe3] rounded text-sm flex flex-col gap-2 p-3 w-44">
      <p className="text-gray-400 text-xs capitalize">{date}</p>
      <p className="font-medium text-gray-800">{`${item.room.roomNum} – ${item.room.name}`}</p>
      <p className="text-gray-600 tabular-nums">{`${startTime} – ${endTime}`}</p>

      {!confirmDelete ? (
        <button
          onClick={() => setConfirmDelete(true)}
          className="mt-1 text-xs text-gray-400 hover:text-red-500 transition-colors text-left"
        >
          Slet booking
        </button>
      ) : (
        <div className="mt-1 flex gap-2">
          <button
            onClick={() => setConfirmDelete(false)}
            className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
          >
            Annuller
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-xs text-red-500 hover:text-red-700 transition-colors disabled:opacity-50"
          >
            {isDeleting ? 'Sletter…' : 'Bekræft'}
          </button>
        </div>
      )}
    </div>
  );
}

*/
