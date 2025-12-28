import {
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  eachMinuteOfInterval,
} from 'date-fns';

type Props = {
  selectedWeek: Date;
};

function CreateWeek({ selectedWeek }: Props) {
  const currentDate = selectedWeek;

  const start = startOfWeek(currentDate, { weekStartsOn: 1 });
  const end = endOfWeek(currentDate, { weekStartsOn: 1 });

  const days = eachDayOfInterval({ start, end });
  const week = days.map((day) => ({
    day,
    hours: CreateHoursForDay(day),
  }));
  return week;
}

function CreateHoursForDay(day: Date) {
  const start = new Date(day);
  start.setHours(0, 0, 0, 0);

  const end = new Date(day);
  end.setHours(23, 45, 0, 0);

  return eachMinuteOfInterval({ start, end }, { step: 15 });
}

function createID(currentDate: Date) {
  const date = currentDate.toLocaleDateString('de-DE');
  const time = currentDate.toLocaleTimeString('de-DE', {
    hour: '2-digit',
    minute: '2-digit',
  });
  return `${date}-${time}`;
}

export default function WeekAndHours(selectedWeek: Props) {
  const fullWeek = CreateWeek(selectedWeek);

  return (
    <div className="flex gap-10 ">
      {fullWeek.map((week, index) => (
        <div key={index}>
          {week.day.toLocaleDateString('de-DE')}
          <div>
            {week.hours.map((hour, index) => (
              <div key={index} id={createID(hour)}>
                {hour.toLocaleTimeString('de-DE')}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
