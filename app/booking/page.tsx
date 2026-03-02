import { getUserInfo, getRooms } from './BookingActions';
import BookingCalendar from '../components/calendar/BookingCalendar';

import { getBookings } from './BookingActions';

export default async function BookingPage() {
  const userInfo = await getUserInfo();
  const allBookings = await getBookings();
  const allRooms = await getRooms();

  return (
    <BookingCalendar
      userInfo={userInfo}
      allBookings={allBookings}
      allRooms={allRooms}
    />
  );
}
