'use client';

import { useState } from 'react';
import { startOfWeek } from 'date-fns';

export default function WeekSelector() {
  const [weekCounter, setWeekCounter] = useState(new Date());

  function WeekCounterNext() {
    const newDate = new Date(weekCounter);
    newDate.setDate(newDate.getDate() + 7);
    const firstOfNextWeek = startOfWeek(newDate, { weekStartsOn: 1 });
    setWeekCounter(firstOfNextWeek);
    console.log(firstOfNextWeek);
  }

  function WeekCounterPrev() {
    const newDate = new Date(weekCounter);
    newDate.setDate(newDate.getDate() - 7);
    const firstOfPrevWeek = startOfWeek(newDate, { weekStartsOn: 1 });
    setWeekCounter(firstOfPrevWeek);
    console.log(firstOfPrevWeek);
  }

  return (
    <div className="flex gap-10 bg">
      <button className="bg-gray-400" onClick={WeekCounterNext}>
        +1 week
      </button>
      <button className="bg-gray-400" onClick={WeekCounterPrev}>
        -1 week
      </button>
    </div>
  );
}
