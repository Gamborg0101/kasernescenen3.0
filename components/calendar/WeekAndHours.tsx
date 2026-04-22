'use client';
import { RoomType, Booking } from '@/lib/types/types';
import { User } from '@/generated/prisma';
import BookingOverlay from './BookingOverlay';
import { eachDayOfInterval, startOfWeek, endOfWeek, eachMinuteOfInterval, isSameDay } from 'date-fns';

type Props = {
  selectedWeek: Date;
  roomNumber: number;
  allBookings: Booking[];
  handleHourClick: (hour: Date, disable: boolean) => void;
  handleHover: (disable: boolean, booking?: Booking, pos?: { x: number; y: number }) => void;
  allRooms: RoomType[];
  userInfoDb: User;
};

export default function WeekAndHours({
  selectedWeek,
  allRooms,
  roomNumber,
  allBookings,
  handleHourClick,
  handleHover,
  userInfoDb,
}: Props) {
  const currentRoom = allRooms?.find((room) => room.roomNum === roomNumber);

  function getBookingForHour(hour: Date): Booking | undefined {
    return allBookings?.find((booking) => {
      const start = booking.startTime;
      const end = booking.endTime;

      return booking.roomId === currentRoom?.id && hour >= start && hour < end;
    });
  }

  function createWeek(selectedWeek: Date) {
    const start = startOfWeek(selectedWeek, { weekStartsOn: 1 });
    const end = endOfWeek(selectedWeek, { weekStartsOn: 1 });

    return eachDayOfInterval({ start, end })?.map((day) => ({
      day,
      hours: createHoursForDay(day),
    }));
  }

  function createHoursForDay(day: Date) {
    const start = new Date(day);
    start.setHours(7, 0, 0, 0);

    const end = new Date(day);
    end.setHours(22, 0, 0, 0);

    return eachMinuteOfInterval({ start, end }, { step: 15 });
  }

  function hoursInDay() {
    const day = new Date();
    const hours = createHoursForDay(day);

    return (
      <div className="">
        <div className="mt-5">&nbsp;</div>
        {hours.map((hour, index) => (
          <div
            key={index}
            className={`h-5 px-4  flex justify-center border border-gray-200 font-semibold items-center ${index % 4 == 0 ? '' : 'bg-white'}`}
          >
            {index % 4 == 0
              ? hour.toLocaleTimeString('da-DK', {
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : ''}
          </div>
        ))}
      </div>
    );
  }

  const fullWeek = createWeek(selectedWeek);

  return (
    <div className="flex gap-10 relative">
      <div className="grid  grid-cols-[1fr_12fr] w-full relative">
        <div className="">{hoursInDay()}</div>
        <div className="grid grid-cols-7 ">
          {fullWeek.map((week, index) => (
            <div key={index} className="relative">
              <p className="flex center-items justify-center h-11 items-center border-l border-gray-200 shadow">
                {week.day.toLocaleDateString('da-DK')}
              </p>

              <BookingOverlay
                bookings={allBookings?.filter(
                  (booking) => booking.roomId === currentRoom?.id && isSameDay(booking.startTime, week.day),
                )}
                userInfoDb={userInfoDb}
              />
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
                  onClick={() => {
                    handleHourClick(hour, !getBookingForHour(hour));
                  }}
                  className={`h-5 border-b border-t border-r border-[#f0ebe3] hover:bg-gray-400 transition-colors duration-100 ${getBookingForHour(hour) ? `` : 'cursor-pointer hover:bg-black'}`}
                  key={index}
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
