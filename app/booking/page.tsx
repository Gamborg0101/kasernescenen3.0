import WeekView from '../components/calendar/WeekView';
import { getBookings } from './BookingActions';

export default async function bookingPage() {
  const booking = await getBookings();
  console.log(booking);
  return (
    <div>
      <WeekView />
    </div>
  );
}
