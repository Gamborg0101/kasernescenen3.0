import { eachDayOfInterval, getWeek } from 'date-fns';

function CurrentWeek() {
  const start = new Date();
  const end = new Date().setDate(start.getDate() + 6);

  return eachDayOfInterval({
    start,
    end,
  });
}

export default function Week() {
  const days = CurrentWeek();

  return (
    <div>
      {days.map((day: Date) => (
        <li key={day.toISOString()}>{day.toDateString()}</li>
      ))}
    </div>
  );
}
