import {
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  eachMinuteOfInterval,
} from 'date-fns';
import { allowedDisplayValues } from 'next/dist/compiled/@next/font/dist/constants';

function CreateWeek() {
  const currentDate = new Date();

  const start = startOfWeek(currentDate, { weekStartsOn: 1 });
  const end = endOfWeek(currentDate, { weekStartsOn: 1 });

  const days = eachDayOfInterval({ start, end });
  const hours = CreateHoursAndMins();

  const week = days.map((day) => ({
    day,
    hours,
  }));

  console.log(week);
  return week;
}

function CreateHoursAndMins() {
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const end = new Date();
  end.setHours(23, 45, 0, 0);

  let allHours = [];
  allHours = eachMinuteOfInterval({ start, end }, { step: 15 });

  return allHours;
}

export default function Week() {
  const fullWeek = CreateWeek();

  return (
    <div className="flex gap-10 ">
      {fullWeek.map((week, index) => (
        <div key={index}>
          {week.day.toLocaleDateString('de-DE')}
          <div>
            {week.hours.map((hour, index) => (
              <div key={index}>{hour.toLocaleTimeString('de-DE')}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
