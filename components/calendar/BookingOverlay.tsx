import { differenceInMinutes } from 'date-fns';
import { User, Booking } from '@/generated/prisma';
import { bookingColors } from '@/lib/colors';
import { getBookingColor } from '@/lib/colors';

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
            className={`absolute w-full  ${getBookingColor(userInfoDb.study) ?? bookingColors.unknown1} truncate border rounded-sm`}
          >
            <div className="flex items-center gap-1 text-sm">
              <p className=" ml-2 font-lgith">
                {`${convertToHHMM(booking.startTime)} - ${convertToHHMM(booking.endTime)}`}
              </p>
              <span className="">-</span>
              <p className=" font-bold">{`${userInfoDb.firstName} ${userInfoDb.lastName}`}</p>
            </div>
            <p className="  ml-2 text-sm font-bold">{booking.reason}</p>
          </div>
        );
      })}
    </div>
  );
}
