'use client';

import WeekAndHours from './WeekAndHours';
import WeekSelector from './WeekSelector';
import { useState } from 'react';
import { startOfWeek } from 'date-fns';
import RoomSelector from './RoomSelector';
import CreateBookingModal from '../modals/CreateBookingModal';
import CreateBookingInfoModal from '../modals/CreateBookingInfoModal';
import { Booking } from '@/lib/types';
import { roles } from '@/lib/enums';


export interface UserData {
  id: number,
  role: roles,
  googleId: string,
  phone: number,
  cardNumber: number,
  bookings: Booking[]
  name: string,
  email: string,
}
export interface RoomData {
  number: string,
  name: string
}

export interface BookingData {
  id: number,
  startTime: Date,
  endTime: Date,
  roomNumber: string,
  reason: string,
  bookedBy: {
    id: number,
    firstName: string,
    lastName: string,
    study: string
  }
}

type Props = {
  userData: UserData
  roomData: RoomData[],
  bookingData: BookingData[]
};

export default function BookingCalendar({ userData, roomData, bookingData }: Props) {
  const [weekCounter, setWeekCounter] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));
  const [roomNumber, setRoomNumber] = useState('126');
  const [showModal, setShowModal] = useState(false);
  const [startHour, setStartHour] = useState(new Date());
  const [bookingInfoOpen, setBookingInfoOpen] = useState(false);
  const [hoveredBooking, setHoveredBooking] = useState<BookingData | null>(null);
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

  function handleHover(isOpen: boolean, booking?: BookingData, pos?: { x: number; y: number }) {
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
          name={userData.name}
          email={userData.email}
        />
      )}
      {bookingInfoOpen && hoveredBooking && <CreateBookingInfoModal booking={hoveredBooking} initialPos={tooltipPos} />}
      <div className="grid grid-cols-3 p-5 bg-gray-200/70">
        <div>
          <RoomSelector currentRoom={roomNumber} setRoomNumber={setRoomNumber} rooms={roomData} />
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
        roomNumbers={roomData.map(room => room.number)}
        bookingData={bookingData}
        handleHourClick={handleHourClick}
        handleHover={handleHover}
        roomNumber={roomNumber}
        user={userData}
        currentRoom={roomNumber}
      />
    </div>
  );
}
