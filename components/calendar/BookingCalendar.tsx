'use client';

import WeekAndHours from './WeekAndHours';
import WeekSelector from './WeekSelector';
import { useState } from 'react';
import { startOfWeek } from 'date-fns';
import RoomSelector from './RoomSelector';
import CreateBookingModal from '../modals/CreateBookingModal';
import CreateBookingInfoModal from '../modals/CreateBookingInfoModal';
import { SessionUser, BookingWithUser } from '@/lib/types';
import { User, Room as RoomType } from '@/generated/prisma';

type Props = {
  userInfoSession: SessionUser;
  allRooms: RoomType[];
  bookings: BookingWithUser[];
  userInfoDb: User;
};

export default function BookingCalendar({ userInfoSession, bookings, allRooms, userInfoDb }: Props) {
  const [weekCounter, setWeekCounter] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));
  const [roomNumber, setRoomNumber] = useState(126);
  const [showModal, setShowModal] = useState(false);
  const [startHour, setStartHour] = useState(new Date());
  const [bookingInfoOpen, setBookingInfoOpen] = useState(false);
  const [hoveredBooking, setHoveredBooking] = useState<BookingWithUser | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  function weekCounterNext() {
    const newDate = new Date(weekCounter);
    newDate.setDate(newDate.getDate() + 7);
    const firstOfNextWeek = startOfWeek(newDate, { weekStartsOn: 1 });
    setWeekCounter(firstOfNextWeek);
  }

  function weekCounterPrev() {
    const newDate = new Date(weekCounter);
    newDate.setDate(newDate.getDate() - 7);
    const firstOfPrevWeek = startOfWeek(newDate, { weekStartsOn: 1 });
    setWeekCounter(firstOfPrevWeek);
  }

  function weekCounterCurrentWeek() {
    setWeekCounter(startOfWeek(new Date(), { weekStartsOn: 1 }));
  }

  function handleHover(isOpen: boolean, booking?: BookingWithUser, pos?: { x: number; y: number }) {
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
        <CreateBookingInfoModal booking={hoveredBooking} initialPos={tooltipPos} />
      )}
      <div className="grid grid-cols-3 p-5 bg-gray-200/70">
        <div>
          <RoomSelector roomNumber={roomNumber} setRoomNumber={setRoomNumber} allRooms={allRooms} />
        </div>
        <div className="flex items-center justify-center">
          <WeekSelector
            nextWeek={weekCounterNext}
            prevWeek={weekCounterPrev}
            currentWeek={weekCounterCurrentWeek}
            weekCounter={weekCounter}
          />
        </div>
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
