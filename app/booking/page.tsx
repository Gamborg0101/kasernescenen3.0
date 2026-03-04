import { getUserInfoFromSession, getRooms } from './BookingActions';
import BookingCalendar from '../components/calendar/BookingCalendar';
import { getBookings } from './BookingActions';

export default async function BookingPage() {
  const userInfoSession = await getUserInfoFromSession();
  const allBookings = await getBookings();
  const allRooms = await getRooms();

  return (
    <BookingCalendar
      userInfoSession={userInfoSession}
      allBookings={allBookings}
      allRooms={allRooms}
    />
  );
}
