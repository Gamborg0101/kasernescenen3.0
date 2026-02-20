// app/booking/page.tsx
import WeekView from '../components/calendar/WeekView';

import { getUserInfo } from './BookingActions';

export default async function BookingPage() {
  const userInfo = await getUserInfo(); // Kører på server
  return <WeekView userInfo={userInfo} />; // sender videre til client
}
