'use client';

import { differenceInMinutes } from 'date-fns';
import { bookingColors } from '@/lib/colors';
import { getBookingColor } from '@/lib/colors';
import { deleteABooking } from '@/lib/actions/bookingActions';
import { Role } from "@/generated/prisma"
import { BookingData, UserData } from './BookingCalendar';

type Props = {
  bookings: BookingData[];
  user: UserData;
};

export default function BookingOverlay({ bookings, user }: Props) {
  function getDivStartPosition(booking: BookingData) {
    const divStartPosition = (booking.startTime.getHours() - 7) * 60 + booking.startTime.getMinutes();

    return (divStartPosition / 15) * 20;
  }

  function getDivHeight(booking: BookingData) {
    return (differenceInMinutes(booking.endTime, booking.startTime) / 15) * 20;
  }

  function convertToHHMM(time: Date) {
    return time.toLocaleTimeString('da-DK', { hour: 'numeric', minute: 'numeric' });
  }

  function bookingBelongsToUser(booking: BookingData) {
    return booking.bookedBy.id === user.id || user.role === Role.admin;
  }

  return (
    <div className="absolute w-full">
      {bookings?.map((booking, index) => {
        return (
          <div
            key={index}
            style={{
              height: `${getDivHeight(booking)}px`,
              top: `${getDivStartPosition(booking)}px`,
            }}
            className={`absolute w-full pointer-events-none overflow-hidden rounded-sm ${getBookingColor(booking.bookedBy.study) ?? bookingColors.unknown1}`}
          >
            <div className="flex justify-between pointer-events-auto ">
              <div className="flex items-center gap-1 text-sm overflow-hidden ">
                <p className="ml-2 font-light select-none shrink-0">
                  {`${convertToHHMM(booking.startTime)} - ${convertToHHMM(booking.endTime)}`}
                </p>
                <span className="select-none shrink-0">-</span>
                <p className="font-bold select-none truncate">{`${booking.bookedBy.firstName} ${booking.bookedBy.lastName}`}</p>
              </div>
              <div className="flex items-center pr-2 shrink-0">
                {bookingBelongsToUser(booking) && (
                  <div
                    onClick={() => deleteABooking(booking.id)}
                    className="group cursor-pointer rounded-full transition-colors duration-200 hover:bg-red-100"
                  >
                    <svg
                      className="w-4 h-4 text-gray-400 transition-colors duration-200 group-hover:text-red-400"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="15" y1="9" x2="9" y2="15" />
                      <line x1="9" y1="9" x2="15" y2="15" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
            <p className="ml-2 text-sm font-bold select-none truncate">{booking.reason}</p>
          </div>
        );
      })}
    </div>
  );
}
