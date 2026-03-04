type Booking = {
  id: number;
  roomId: number;
  startTime: Date;
  endTime: Date;
};

type Props = {
  booking: Booking;
};

export default function CreateBookingInfoModal({ booking }: Props) {
  return (
    <div className="bg-amber-200 w-40 h-50 rounded-2xl fixed">
      <div className="p-2">
        <p>This is the modal</p>
        <p>
          Start:{' '}
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
        <p>Room: {booking.roomId}</p>
      </div>
    </div>
  );
}
