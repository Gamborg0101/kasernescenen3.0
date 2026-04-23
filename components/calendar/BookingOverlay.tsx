'use client';

import { differenceInMinutes } from 'date-fns';
import { User, Booking } from '@/generated/prisma';
import { bookingColors } from '@/lib/colors';
import { getBookingColor } from '@/lib/colors';
import { deleteABooking } from '@/lib/actions/bookingActions';

type BookingOverlayProps = {
  bookings: Booking[];
  userInfoDb: User;
};

export default function BookingOverlay({ bookings, userInfoDb }: BookingOverlayProps) {
  function getDivStartPosition(booking: Booking) {
    const divStartPosition = (booking.startTime.getHours() - 7) * 60 + booking.startTime.getMinutes();
    return (divStartPosition / 15) * 20;
  }

  function getDivHeight(booking: Booking) {
    return (differenceInMinutes(booking.endTime, booking.startTime) / 15) * 20;
  }

  function convertToHHMM(time: Date) {
    return time.toLocaleTimeString('da-DK', { hour: 'numeric', minute: 'numeric' });
  }

  function bookingBelongsToUser(user: User, booking: Booking) {
    return booking.userId === user.id;
  }

  return (
    <div className="absolute w-full ltr">
      {bookings?.map((booking, index) => {
        return (
          <div
            key={index}
            style={{
              height: `${getDivHeight(booking)}px`,
              top: `${getDivStartPosition(booking)}px`,
            }}
            className={`absolute w-full ${getBookingColor(userInfoDb.study) ?? bookingColors.unknown1} truncate rounded-sm`}
          >
            <div className="flex justify-between pointer-events-auto">
              <div className="flex items-center gap-1 text-sm">
                <p className="ml-2 font-light ">
                  {`${convertToHHMM(booking.startTime)} - ${convertToHHMM(booking.endTime)}`}
                </p>
                <span className="">-</span>
                <p className="font-bold">{`${userInfoDb.firstName} ${userInfoDb.lastName}`}</p>
              </div>
              <div className="flex items-center pr-2">
                {bookingBelongsToUser(userInfoDb, booking) && (
                  <div
                    onClick={() => deleteABooking(booking.id, userInfoDb.id)}
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
            <p className="ml-2 text-sm font-bold">{booking.reason}</p>
          </div>
        );
      })}
    </div>
  );
}
