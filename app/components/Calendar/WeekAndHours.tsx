import {
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  eachMinuteOfInterval,
} from 'date-fns';
import React, { useState } from 'react';
import CreateBookingModal from '../modals/CreateBookingModal';
import { WeekProps } from '@/app/types/types';

export default function WeekAndHours({
  selectedWeek,
  roomNumber,
  userInfo,
}: WeekProps) {
  const [showModal, setShowModal] = useState(false);
  const [startHour, setStartHour] = useState('null');

  function handleHourClick(event: React.MouseEvent<HTMLElement>, hour: Date) {
    event.stopPropagation();
    console.log('Rum:', roomNumber, 'Tid:', createID(hour));
    setStartHour(createID(hour));
    setShowModal(true);
  }

  function createWeek(selectedWeek: Date) {
    const start = startOfWeek(selectedWeek, { weekStartsOn: 1 });
    const end = endOfWeek(selectedWeek, { weekStartsOn: 1 });

    const days = eachDayOfInterval({ start, end });
    return days.map((day) => ({
      day,
      hours: createHoursForDay(day),
    }));
  }

  function createHoursForDay(day: Date) {
    const start = new Date(day);
    start.setHours(0, 0, 0, 0);

    const end = new Date(day);
    end.setHours(23, 45, 0, 0);

    return eachMinuteOfInterval({ start, end }, { step: 60 });
  }

  function createID(currentDate: Date) {
    const date = currentDate.toLocaleDateString('de-DE');
    const time = currentDate.toLocaleTimeString('de-DE', {
      hour: '2-digit',
      minute: '2-digit',
    });
    return `${date}-${time}`;
  }

  function hoursInDay() {
    const hours = [];
    for (let i = 0; i < 24; i++) {
      hours[i] = i;
    }
    return (
      <div>
        <div>&nbsp;</div> {/* tom element for alignment */}
        {hours.map((item, index) => (
          <div
            key={index}
            className="my-3 px-10 flex justify-center center-items"
          >
            {item}
          </div>
        ))}
      </div>
    );
  }
  const fullWeek = createWeek(selectedWeek);

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
      <div className="flex gap-10">
        <div>{hoursInDay()}</div>
        {fullWeek.map((week, index) => (
          <div key={index}>
            {week.day.toLocaleDateString('de-DE')}
            {week.hours.map((hour, index) => (
              <div
                key={index}
                onClick={(e) => handleHourClick(e, hour)}
                className="my-3"
              >
                {hour.toLocaleTimeString('de-DE')}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
