'use client';

import WeekAndHours from './WeekAndHours';
import WeekSelector from './WeekSelector';
import { useState } from 'react';
import { startOfWeek } from 'date-fns';

export default function WeekView() {
  const [weekCounter, setWeekCounter] = useState(new Date());

  function WeekCounterNext() {
    const newDate = new Date(weekCounter);
    newDate.setDate(newDate.getDate() + 7);
    const firstOfNextWeek = startOfWeek(newDate, { weekStartsOn: 1 });
    setWeekCounter(firstOfNextWeek);
  }

  function WeekCounterPrev() {
    const newDate = new Date(weekCounter);
    newDate.setDate(newDate.getDate() - 7);
    const firstOfPrevWeek = startOfWeek(newDate, { weekStartsOn: 1 });
    setWeekCounter(firstOfPrevWeek);
  }

  return (
    <div>
      <WeekSelector nextWeek={WeekCounterNext} prevWeek={WeekCounterPrev} />
      <WeekAndHours selectedWeek={weekCounter} />
    </div>
  );
}
