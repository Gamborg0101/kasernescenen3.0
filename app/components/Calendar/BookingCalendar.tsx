'use client';

import WeekAndHours from './WeekAndHours';
import WeekSelector from './WeekSelector';
import { useState } from 'react';
import { startOfWeek } from 'date-fns';
import RoomSelector from './RoomSelector';
import CreateBookingModal from '../modals/CreateBookingModal';

type Props = {
  userInfo: { name: string; email: string };
  allBookings: {
    endTime: Date;
    roomId: number;
    startTime: Date;
  }[];
};

export default function BookingCalendar({ userInfo, allBookings }: Props) {
  const [weekCounter, setWeekCounter] = useState(new Date());
  const [roomNumber, setRoomNumber] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [startHour, setStartHour] = useState({ date: '', hour: '' });

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

  function handleHourClick(hour: Date) {
    setStartHour({
      date: hour.toLocaleDateString('de-DE'),
      hour: hour.toLocaleTimeString('de-DE', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    });
    setShowModal(true);
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
      <WeekSelector nextWeek={WeekCounterNext} prevWeek={WeekCounterPrev} />
      <WeekAndHours
        selectedWeek={weekCounter}
        roomNumber={roomNumber}
        allBookings={allBookings}
        handleHourClick={handleHourClick}
      />
    </div>
  );
}
