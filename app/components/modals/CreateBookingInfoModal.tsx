import { UserInfoDb } from '@/app/types/types';
import { useEffect, useState } from 'react';

type Booking = {
  id: number;
  roomId: number;
  startTime: Date;
  endTime: Date;
};

type Props = {
  booking: Booking;
  userInfoDb: UserInfoDb | null;
};

export default function CreateBookingInfoModal({ booking, userInfoDb }: Props) {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) =>
      setPos({ x: e.clientX + 12, y: e.clientY + 12 });
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div
      className="bg-amber-200 w-40 h-50 rounded-2xl fixed top-100"
      style={{ top: pos.y, left: pos.x }}
    >
      <div className="p-2">
        <ul>
          <li>Booking {booking.id}</li>
          <li>{userInfoDb?.firstName}</li>
          <li>{userInfoDb?.email}</li>
          <li>
            {`
          ${new Date(booking.startTime).toLocaleTimeString('da-DK', {
            hour: '2-digit',
            minute: '2-digit',
          })}
            -
          ${new Date(booking.endTime).toLocaleTimeString('da-DK', {
            hour: '2-digit',
            minute: '2-digit',
          })}`}
          </li>
          <li>{booking.startTime.toLocaleDateString()}</li>
        </ul>
      </div>
    </div>
  );
}
