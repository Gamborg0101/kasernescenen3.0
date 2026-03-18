import { differenceInMinutes } from 'date-fns';
import { Booking } from '@/app/types/types';

type BookingOverlayProps = {
  bookings: Booking[];
};

export default function BookingOverlay({ bookings }: BookingOverlayProps) {
  function getDivStartPosition(booking: Booking) {
    const divStartPosition =
      (booking.startTime.getHours() - 7) * 60 + booking.startTime.getMinutes();
    return (divStartPosition / 15) * 20;
  }

  function getDivHeight(booking: Booking) {
    return (differenceInMinutes(booking.endTime, booking.startTime) / 15) * 20;
  }

  return (
    <div className="absolute w-full pointer-events-none">
      {bookings?.map((booking, index) => {
        return (
          <div
            key={index}
            style={{
              height: `${getDivHeight(booking)}px`,
              top: `${getDivStartPosition(booking)}px`,
            }}
            className="absolute w-full bg-blue-500  font-semibold border rounded-sm  "
          >
            <p className="p-1 text-white">{booking.reason}</p>
          </div>
        );
      })}
    </div>
  );
}
