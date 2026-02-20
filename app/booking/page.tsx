'use server';

import WeekView from '../components/calendar/WeekView';

import { getUserInfo } from './BookingActions';

export default async function BookingPage() {
  const userInfo = await getUserInfo();
  return <WeekView userInfo={userInfo} />;
}
