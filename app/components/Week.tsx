import {
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  addMinutes,
  eachMinuteOfInterval,
} from 'date-fns';
import { step } from 'next/dist/experimental/testmode/playwright/step';

function CurrentWeek() {
  const currentDate = new Date();

  const start = startOfWeek(currentDate, { weekStartsOn: 1 });
  const end = endOfWeek(currentDate, { weekStartsOn: 1 });

  return eachDayOfInterval({ start, end });
}

function createHoursAndMins() {
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const end = new Date();
  end.setHours(23, 45, 0, 0);

  const result = eachMinuteOfInterval({ start, end }, { step: 15 });

  console.log(result);
}

export default function Week() {
  const days = CurrentWeek();
  const hoursAndMins = createHoursAndMins();
  const testObjeckt = {
    days: days,
    hours: hoursAndMins,
  };

  console.log(testObjeckt);

  return (
    <div className="flex gap-10 ">
      {days.map((day, i) => (
        <div key={i} className="bg-gray-400">
          {day.toLocaleDateString('de-DE')}
        </div>
      ))}
    </div>
  );
}
