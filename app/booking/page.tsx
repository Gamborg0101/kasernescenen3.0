import { getUserInfoFromSession, getUserFromDb } from '../../lib/db/users';
import { getRoomsFromDB } from '../../lib/db/rooms';
import { getBookings } from '../../lib/db/bookings';
import BookingCalendar from '../../components/calendar/BookingCalendar';
import type { Booking } from '../../lib/types';
export default async function BookingPage() {
  const userInfoSession = await getUserInfoFromSession();
  const allBookings = await getBookings();
  const allRooms = await getRoomsFromDB();
  const userInfoDB = await getUserFromDb();

  const userData: UserData = {
    googleId: userInfoDB.googleId,
    phone: userInfoDB.phone,
    cardNumber: userInfoDB.cardNumber,
    bookings: allBookings,
    name: userInfoDB.firstName,
    email: userInfoDB.email
  }

  return (
    <BookingCalendar
      userData={userData}
    />
  );
}
