'use client';

import {
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  eachMinuteOfInterval,
} from 'date-fns';

type Props = {
  selectedWeek: Date;
  roomNumber: number;
  onHourClick: (hour: Date) => void;
};

export default function WeekAndHours({
  selectedWeek,
  roomNumber,
  onHourClick,
}: Props) {
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
            <div key={index} onClick={() => onHourClick(hour)} className="my-3">
              {hour.toLocaleTimeString('de-DE')}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
