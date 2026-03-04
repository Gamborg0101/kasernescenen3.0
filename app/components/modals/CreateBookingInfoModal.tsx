import { UserInfoSession } from '@/app/types/types';

type Booking = {
  id: number;
  roomId: number;
  startTime: Date;
  endTime: Date;
};

type Props = {
  booking: Booking;
  userInfoSession: UserInfoSession;
};

export default function CreateBookingInfoModal({
  booking,
  userInfoSession,
}: Props) {
  return (
    <div className="bg-amber-200 w-40 h-50 rounded-2xl fixed">
      <div className="p-2">
        <p>This is the modal</p>
        <p>
          Start: {userInfoSession.name}
          {new Date(booking.startTime).toLocaleTimeString('da-DK', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
        <p>
          End:{' '}
          {new Date(booking.endTime).toLocaleTimeString('da-DK', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
        <p>Room: {booking.id}</p>
      </div>
    </div>
  );
}
