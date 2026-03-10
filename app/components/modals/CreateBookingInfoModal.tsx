import { UserInfoDb } from '@/app/types/types';
import { useEffect, useState } from 'react';

type Booking = {
  id: number;
  roomId: number;
  startTime: Date;
  endTime: Date;
  reason: string;
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
      className="bg-amber-200 min-h-20 rounded-2xl fixed break-word shadow-lg p-2 z-1"
      style={{ top: pos.y, left: pos.x }}
    >
      <div className="p-2">
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
        <p>{booking.reason}</p>
      </div>
    </div>
  );
}
