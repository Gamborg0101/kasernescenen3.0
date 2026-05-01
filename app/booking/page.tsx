import { getUserInfoFromSession } from '../../lib/db/users';
import { getUserFromDb } from '../../lib/db/users';
import { getRoomsFromDB } from '../../lib/db/rooms';
import { getBookings } from '../../lib/db/bookings';
import BookingCalendar from '../../components/calendar/BookingCalendar';

export default async function BookingPage() {
  const userInfoSession = await getUserInfoFromSession();
  const allBookings = await getBookings();
  const allRooms = await getRoomsFromDB();
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
