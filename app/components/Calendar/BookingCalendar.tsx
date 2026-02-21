'use client';

import { useState } from 'react';
import { startOfWeek } from 'date-fns';
import WeekSelector from './WeekSelector';
import RoomSelector from './RoomSelector';
import WeekAndHours from './WeekAndHours';
import CreateBookingModal from '../modals/CreateBookingModal';

type UserInfo = {
  name: string;
  email: string;
  id?: string;
};

type Props = {
  userInfo: UserInfo;
};

export default function BookingCalendar({ userInfo }: Props) {
  const [weekCounter, setWeekCounter] = useState(new Date());
  const [roomNumber, setRoomNumber] = useState(114);
  const [showModal, setShowModal] = useState(false);
  const [startHour, setStartHour] = useState('');

  function nextWeek() {
    const newDate = new Date(weekCounter);
    newDate.setDate(newDate.getDate() + 7);
    setWeekCounter(startOfWeek(newDate, { weekStartsOn: 1 }));
  }

  function prevWeek() {
    const newDate = new Date(weekCounter);
    newDate.setDate(newDate.getDate() - 7);
    setWeekCounter(startOfWeek(newDate, { weekStartsOn: 1 }));
  }

  function handleHourClick(hour: Date) {
    setStartHour(createID(hour));
    setShowModal(true);
  }

  function createID(currentDate: Date) {
    const date = currentDate.toLocaleDateString('de-DE');
    const time = currentDate.toLocaleTimeString('de-DE', {
      hour: '2-digit',
      minute: '2-digit',
    });
    return `${date}-${time}`;
  }

  return (
    <div>
      {showModal && (
        <CreateBookingModal
          onClose={() => setShowModal(false)}
          roomNumber={roomNumber}
          startHour={startHour}
          userInfo={userInfo}
        />
      )}
      <RoomSelector roomNumber={roomNumber} setRoomNumber={setRoomNumber} />
      <WeekSelector nextWeek={nextWeek} prevWeek={prevWeek} />
      <WeekAndHours
        selectedWeek={weekCounter}
        roomNumber={roomNumber}
        onHourClick={handleHourClick}
      />
    </div>
  );
}
