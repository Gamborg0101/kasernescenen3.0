'use client';

import { useState } from 'react';

export default function WeekSelector() {
  const [weekCounter, setWeekCounter] = useState(new Date());

  function test() {
    const nextWeek = weekCounter.getDate() + 7;
    const dateTimestamp = weekCounter.setDate(nextWeek);
    console.log(new Date(dateTimestamp));
    setWeekCounter(new Date(dateTimestamp));
  }

  function WeekCounterNext() {
    //  setWeekCounter(weekCounter + 1);
  }

  function WeekCounterPrev() {
    //    setWeekCounter(weekCounter - 1);
  }

  return (
    <div className="flex gap-10">
      <button className="bg-gray-400" onClick={test}>
        +1 week
      </button>
      <button className="bg-gray-400" onClick={WeekCounterPrev}>
        -1 week
      </button>
      <p>Du har trykket gange</p>
    </div>
  );
}
