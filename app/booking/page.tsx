import { getUserInfo } from './BookingActions';
import BookingCalendar from '../components/calendar/BookingCalendar';

import { getBookings } from './BookingActions';

export default async function BookingPage() {
  const userInfo = await getUserInfo();
  const allBookings = await getBookings();

  return <BookingCalendar userInfo={userInfo} allBookings={allBookings} />;
}
