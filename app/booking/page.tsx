import { getUserInfo } from './BookingActions';
import BookingCalendar from '../components/calendar/BookingCalendar';
export default async function BookingPage() {
  const userInfo = await getUserInfo();
  return <BookingCalendar userInfo={userInfo} />;
}
