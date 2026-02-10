import {
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  eachMinuteOfInterval,
} from 'date-fns';
import React, { useState } from 'react';
import Modal from '../modals/CreateBookingModal';

type WeekProps = {
  selectedWeek: Date;
  roomNumber: number;
};

function CreateWeek(selectedWeek: Date) {
  const start = startOfWeek(selectedWeek, { weekStartsOn: 1 });
  const end = endOfWeek(selectedWeek, { weekStartsOn: 1 });

  const days = eachDayOfInterval({ start, end });
  return days.map((day) => ({
    day,
    hours: CreateHoursForDay(day),
  }));
}

function CreateHoursForDay(day: Date) {
  const start = new Date(day);
  start.setHours(0, 0, 0, 0);

  const end = new Date(day);
  end.setHours(23, 45, 0, 0);

  return eachMinuteOfInterval({ start, end }, { step: 15 });
}

function createID(currentDate: Date) {
  const date = currentDate.toLocaleDateString('de-DE');
  const time = currentDate.toLocaleTimeString('de-DE', {
    hour: '2-digit',
    minute: '2-digit',
  });
  return `${date}-${time}`;
}

export default function WeekAndHours({ selectedWeek, roomNumber }: WeekProps) {
  const [showModal, setShowModal] = useState(false);

  function handleHourClick(event: React.MouseEvent<HTMLElement>, hour: Date) {
    event.stopPropagation();
    console.log('Rum:', roomNumber, 'Tid:', createID(hour));
    setShowModal(true);
  }

  const fullWeek = CreateWeek(selectedWeek);

  return (
    <div>
      {showModal && <Modal onClose={() => setShowModal(false)} />}

      <div className="flex gap-10">
        {fullWeek.map((week, index) => (
          <div key={index}>
            {week.day.toLocaleDateString('de-DE')}
            {week.hours.map((hour, index) => (
              <div key={index} onClick={(e) => handleHourClick(e, hour)}>
                {hour.toLocaleTimeString('de-DE')}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
