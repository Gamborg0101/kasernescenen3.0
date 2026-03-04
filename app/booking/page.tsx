import { getUserInfoFromSession, getRooms } from './BookingActions';
import BookingCalendar from '../components/calendar/BookingCalendar';
import { getBookings } from './BookingActions';
import { getUserFromDb } from './BookingActions';

export default async function BookingPage() {
  const userInfoSession = await getUserInfoFromSession();
  const allBookings = await getBookings();
  const allRooms = await getRooms();
  const userInfoDB = await getUserFromDb();

  return (
    <BookingCalendar
      userInfoSession={userInfoSession}
      allBookings={allBookings}
      allRooms={allRooms}
      userInfoDb={userInfoDB}
    />
  );
}
