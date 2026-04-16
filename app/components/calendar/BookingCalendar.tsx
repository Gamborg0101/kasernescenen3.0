'use client';

import WeekAndHours from './WeekAndHours';
import WeekSelector from './WeekSelector';
import { useState } from 'react';
import { startOfWeek } from 'date-fns';
import RoomSelector from './RoomSelector';
import CreateBookingModal from '../modals/CreateBookingModal';
import CreateBookingInfoModal from '../modals/CreateBookingInfoModal';
import { User, SessionUser, RoomType, Booking } from '@/app/types/types';

type Props = {
  userInfoSession: SessionUser;
  allRooms: RoomType[];
  bookings: Booking[];
  userInfoDb: User;
};

export default function BookingCalendar({ userInfoSession, bookings, allRooms, userInfoDb }: Props) {
  const [weekCounter, setWeekCounter] = useState(new Date());
  const [roomNumber, setRoomNumber] = useState(126);
  const [showModal, setShowModal] = useState(false);
  const [startHour, setStartHour] = useState(new Date());
  const [bookingInfoOpen, setBookingInfoOpen] = useState(false);
  const [hoveredBooking, setHoveredBooking] = useState<Booking | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

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

  function WeekCounterCurrentWeek() {
    setWeekCounter(new Date());
  }

  function handleHover(isOpen: boolean, booking?: Booking, pos?: { x: number; y: number }) {
    setBookingInfoOpen(isOpen);
    setHoveredBooking(booking || null);
    if (pos) setTooltipPos(pos);
  }

  function handleHourClick(hour: Date, disable: boolean) {
    if (disable) {
      setStartHour(hour);
      setShowModal(true);
    } else {
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
          userInfoSession={userInfoSession}
        />
      )}
      {bookingInfoOpen && hoveredBooking && (
        <CreateBookingInfoModal booking={hoveredBooking} userInfoDb={userInfoDb} initialPos={tooltipPos} />
      )}
      <div className="grid grid-cols-3 p-5">
        <RoomSelector roomNumber={roomNumber} setRoomNumber={setRoomNumber} allRooms={allRooms} />

        <WeekSelector nextWeek={WeekCounterNext} prevWeek={WeekCounterPrev} currentWeek={WeekCounterCurrentWeek} />
      </div>
      <WeekAndHours
        selectedWeek={weekCounter}
        allRooms={allRooms}
        allBookings={bookings}
        handleHourClick={handleHourClick}
        handleHover={handleHover}
        roomNumber={roomNumber}
        userInfoDb={userInfoDb}
      />
    </div>
  );
}
