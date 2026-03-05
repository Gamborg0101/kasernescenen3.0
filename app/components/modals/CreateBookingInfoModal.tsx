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
  initialPos: { x: number; y: number };
};

export default function CreateBookingInfoModal({
  booking,
  userInfoDb,
  initialPos,
}: Props) {
  const [pos, setPos] = useState(initialPos);

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
        <p>Booking {booking.id}</p>
        <p>{userInfoDb?.firstName}</p>
        <p>{userInfoDb?.email}</p>
        <p>
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
        </p>
        <p>{booking.startTime.toLocaleDateString()}</p>
      </div>
    </div>
  );
}
