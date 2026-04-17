import { differenceInMinutes } from 'date-fns';
import { Booking, User } from '@/lib/types/types';

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
            className="absolute w-full bg-blue-500  truncate font-semibold border rounded-sm"
          >
            <p className=" text-white ml-2 ">{`${userInfoDb.firstName} ${userInfoDb.lastName}`}</p>
            <p className=" text-white ml-2">{`${convertToHHMM(booking.startTime)} - ${convertToHHMM(booking.endTime)} `}</p>
            <p className=" text-white ml-2">{booking.reason}</p>
          </div>
        );
      })}
    </div>
  );
}
