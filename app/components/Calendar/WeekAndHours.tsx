'use client';
import { RoomType } from '@/app/types/types';

import {
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  eachMinuteOfInterval,
  isSameDay,
  isWithinInterval,
} from 'date-fns';

type Booking = {
  id: number;
  roomId: number;
  startTime: Date;
  endTime: Date;
};

type Props = {
  selectedWeek: Date;
  roomNumber: number;
  allBookings: Booking[];
  handleHourClick: (hour: Date, disable: boolean) => void;
  handleHover: (
    disable: boolean,
    booking?: { id: number; startTime: Date; endTime: Date; roomId: number },
    pos?: { x: number; y: number },
  ) => void;

  allRooms: RoomType;
};

export default function WeekAndHours({
  selectedWeek,
  allRooms,
  roomNumber,
  allBookings,
  handleHourClick,
  handleHover,
}: Props) {
  const currentRoom = allRooms.find((room) => room.roomNum === roomNumber);

  function getBookingForHour(hour: Date): Booking | undefined {
    return allBookings.find((booking) => {
      const start = new Date(booking.startTime);
      const end = new Date(booking.endTime);

      return (
        booking.roomId === currentRoom?.id &&
        isSameDay(start, hour) &&
        isWithinInterval(hour, { start, end })
      );
    });
  }

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
    start.setHours(6, 0, 0, 0);
    const end = new Date(day);
    end.setHours(23, 0, 0, 0);
    return eachMinuteOfInterval({ start, end }, { step: 60 });
  }

  function hoursInDay() {
    const day = new Date();
    const hours = createHoursForDay(day);

    return (
      <div>
        <div className="h-10">&nbsp;</div>
        {hours.map((hour) => (
          <div
            key={hour.toISOString()}
            className="h-10 px-4 flex justify-center"
          >
            {hour.getHours()}
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
              onMouseEnter={(e) => {
                const booking = getBookingForHour(hour);
                if (booking)
                  handleHover(true, booking, {
                    x: e.clientX + 12,
                    y: e.clientY + 12,
                  });
              }}
              onMouseLeave={() => handleHover(false)}
              key={index}
              onClick={() => {
                handleHourClick(hour, !getBookingForHour(hour));
              }}
              className={`h-10 border-b border-r border-[#f0ebe3] hover:bg-black transition-colors duration-100 ${getBookingForHour(hour) ? `bg-red-500 hover:bg-red-400 ` : 'cursor-pointer hover:bg-black'}`}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
}
