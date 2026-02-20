'use client';

import WeekAndHours from './WeekAndHours';

import WeekSelector from './WeekSelector';
import { useState } from 'react';
import { startOfWeek } from 'date-fns';
import RoomSelector from './RoomSelector';

type UserInfo = {
  name: string;
  email: string;
};

export type WeekViewProps = {
  userInfo: UserInfo;
};

export default function WeekView({ userInfo }: WeekViewProps) {
  const [weekCounter, setWeekCounter] = useState(new Date());
  const [roomNumber, setRoomNumber] = useState(114);

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
      <RoomSelector roomNumber={roomNumber} setRoomNumber={setRoomNumber} />
      <WeekSelector nextWeek={WeekCounterNext} prevWeek={WeekCounterPrev} />
      <WeekAndHours
        selectedWeek={weekCounter}
        roomNumber={roomNumber}
        userInfo={userInfo}
      />
    </div>
  );
}
