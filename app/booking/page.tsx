import WeekView from '../components/calendar/WeekView';
import { getBookings } from './BookingActions';

export default function bookingPage() {
  return (
    <div>
      {JSON.stringify(getBookings())}
      <WeekView />
    </div>
  );
}
