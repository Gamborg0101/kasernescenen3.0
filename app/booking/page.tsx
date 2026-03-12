import { getUserInfoFromSession, getUserFromDb } from './BookingActions';
import { getRooms } from '../lib/api/rooms';
import { getBookings } from '../lib/api/bookings';
import BookingCalendar from '../components/calendar/BookingCalendar';

export default async function BookingPage() {
  const userInfoSession = await getUserInfoFromSession();
  const allBookings = await getBookings();
  const allRooms = await getRooms();
  const userInfoDB = await getUserFromDb();

  return (
    <BookingCalendar
      userInfoSession={userInfoSession}
      bookings={allBookings}
      allRooms={allRooms}
      userInfoDb={userInfoDB}
    />
  );
}
