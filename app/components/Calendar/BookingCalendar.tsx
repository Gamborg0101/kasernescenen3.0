'use client';

import WeekAndHours from './WeekAndHours';
import WeekSelector from './WeekSelector';
import { useState } from 'react';
import { startOfWeek } from 'date-fns';
import RoomSelector from './RoomSelector';
import CreateBookingModal from '../modals/CreateBookingModal';

import { RoomType } from '@/app/types/types';
import CreateBookingInfoModal from '../modals/CreateBookingInfoModal';

type Props = {
  userInfo: { name: string; email: string };
  allRooms: RoomType;
  allBookings: {
    endTime: Date;
    roomId: number;
    startTime: Date;
  }[];
};

export default function BookingCalendar({
  userInfo,
  allBookings,
  allRooms,
}: Props) {
  const [weekCounter, setWeekCounter] = useState(new Date());
  const [roomNumber, setRoomNumber] = useState(126);
  const [showModal, setShowModal] = useState(false);
  const [startHour, setStartHour] = useState({ date: '', hour: '' });
  const [bookingInfoOpen, setBookingInfoOpen] = useState(false);

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

  function handleHover(disable: boolean) {
    return setBookingInfoOpen(disable);
  }

  function handleHourClick(hour: Date, disable: boolean) {
    if (disable === true) {
      setStartHour({
        date: hour.toISOString().split('T')[0],
        hour: hour.toISOString().split('T')[1],
      });
      setShowModal(true);
    } else if (disable === false) {
      setShowModal(false);
    }
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
      {bookingInfoOpen && <CreateBookingInfoModal />}
      <RoomSelector
        roomNumber={roomNumber}
        setRoomNumber={setRoomNumber}
        allRooms={allRooms}
      />
      <WeekSelector nextWeek={WeekCounterNext} prevWeek={WeekCounterPrev} />
      <WeekAndHours
        selectedWeek={weekCounter}
        allRooms={allRooms}
        allBookings={allBookings}
        handleHourClick={handleHourClick}
        handleHover={handleHover}
        roomNumber={roomNumber}
      />
    </div>
  );
}
