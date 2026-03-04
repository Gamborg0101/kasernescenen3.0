import { UserInfoDb } from '@/app/types/types';
import { userInfo } from 'node:os';

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
  return (
    <div className="bg-amber-200 w-40 h-50 rounded-2xl fixed">
      <div className="p-2">
        <p>Booking {booking.id}</p>

        {userInfoDb?.firstName}
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
          <p>{booking.startTime.toLocaleDateString()}</p>
        </p>
      </div>
    </div>
  );
}
