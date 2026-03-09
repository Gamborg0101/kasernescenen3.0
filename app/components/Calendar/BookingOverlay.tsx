type Booking = {
  id: number;
  roomId: number;
  startTime: Date;
  endTime: Date;
  reason: string;
};

import { differenceInMinutes } from 'date-fns';

type BookingOverlay = {
  bookings: Booking[];
};

export default function BookingOverlay({ bookings }: BookingOverlay) {
  return (
    <div className="absolute w-full">
      {bookings.map((booking, index) => {
        const divHeight =
          (differenceInMinutes(booking.endTime, booking.startTime) / 15) * 20;

        const divStartPosition =
          (booking.startTime.getHours() - 7) * 60 +
          booking.startTime.getMinutes();

        const divStartPixels = (divStartPosition / 15) * 20;

        return (
          <div
            key={index}
            style={{ height: `${divHeight}px`, top: `${divStartPixels}px` }}
            className="absolute w-full bg-blue-500"
          >
            <p> Hi there</p>
          </div>
        );
      })}
    </div>
  );
}
