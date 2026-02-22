'use client';

import {
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  eachMinuteOfInterval,
  isSameDay,
  isWithinInterval,
} from 'date-fns';

type Booking = {
  roomId: number;
  startTime: Date;
  endTime: Date;
};

type Props = {
  selectedWeek: Date;
  roomNumber: number;
  allBookings: Booking[];
  handleHourClick: (hour: Date) => void;
};

export default function WeekAndHours({
  selectedWeek,
  roomNumber,
  allBookings,
  handleHourClick,
}: Props) {
  function isBooked(hour: Date): boolean {
    return allBookings.some((booking) => {
      const start = new Date(booking.startTime);
      const end = new Date(booking.endTime);

      return (
        booking.roomId === roomNumber &&
        isSameDay(start, hour) &&
        isWithinInterval(hour, { start, end })
      );
    });
  }

  console.log(allBookings);
  function createWeek(selectedWeek: Date) {
    const start = startOfWeek(selectedWeek, { weekStartsOn: 1 });
    const end = endOfWeek(selectedWeek, { weekStartsOn: 1 });

    return eachDayOfInterval({ start, end }).map((day) => ({
      day,
      hours: createHoursForDay(day),
    }));
  }

  function createHoursForDay(day: Date) {
    const start = new Date(day);
    start.setHours(0, 0, 0, 0);
    const end = new Date(day);
    end.setHours(23, 45, 0, 0);
    return eachMinuteOfInterval({ start, end }, { step: 60 });
  }

  function hoursInDay() {
    const hours = Array.from({ length: 24 }, (_, i) => i);
    return (
      <div>
        <div>&nbsp;</div>
        {hours.map((item, index) => (
          <div key={index} className="my-3 px-10 flex justify-center">
            {item}
          </div>
        ))}
      </div>
    );
  }

  const fullWeek = createWeek(selectedWeek);

  return (
    <div className="flex gap-10">
      <div>{hoursInDay()}</div>
      {fullWeek.map((week, index) => (
        <div key={index}>
          {week.day.toLocaleDateString('de-DE')}
          {week.hours.map((hour, index) => (
            <div
              key={index}
              onClick={() => handleHourClick(hour)}
              className={`my-3 ${isBooked(hour) ? 'text-red-500 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              {hour.toLocaleTimeString('de-DE')}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
