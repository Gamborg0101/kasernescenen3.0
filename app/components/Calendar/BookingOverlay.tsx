import { differenceInMinutes } from 'date-fns';

type Booking = {
  id: number;
  roomId: number;
  startTime: Date;
  endTime: Date;
  reason: string;
};

type BookingOverlay = {
  bookings: Booking[];
};

export default function BookingOverlay({ bookings }: BookingOverlay) {
  return (
    <div>
      {bookings.map((item, index) => {
        const duration = differenceInMinutes(item.endTime, item.startTime);
        const divHeight = (duration / 15) * 20;

        const topPoint =
          (item.startTime.getHours() - 7) * 60 + item.startTime.getMinutes(); //60 * 7 = 420
        const topPointDivStart = (topPoint / 15) * 20;

        return (
          <div
            key={index}
            className="absolute w-full bg-blue-400"
            style={{ height: `${divHeight}px`, top: `${topPointDivStart}px` }}
          >
            <p className="relative">{item.id}</p>
          </div>
        );
      })}
    </div>
  );
}
