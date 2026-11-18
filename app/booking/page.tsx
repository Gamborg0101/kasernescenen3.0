import { getUserFromDb } from '../../lib/db/users';
import { getBookings } from '../../lib/db/bookings';
import BookingCalendar from '../../components/calendar/BookingCalendar';
import type { UserData, BookingData, RoomData } from '../../components/calendar/BookingCalendar';
import { getRoomsFromDB } from '@/lib/db/rooms';

export default async function BookingPage() {
  const allBookings = await getBookings();
  const userInfoDB = await getUserFromDb();
  const allRooms = await getRoomsFromDB();

  const userData: UserData = {
    id: userInfoDB.id,
    role: userInfoDB.role,
    name: userInfoDB.firstName,
    email: userInfoDB.email,
  }
  const bookings: BookingData[] = allBookings.map(booking => ({
    id: booking.id,
    startTime: booking.startTime,
    endTime: booking.endTime,
    roomNumber: booking.room.roomNumber,
    reason: booking.reason,
    bookedBy: {
      id: booking.userId,
      firstName: booking.user.firstName,
      lastName: booking.user.lastName,
      study: booking.user.study
    }
  })
  )
  const rooms: RoomData[] = allRooms.map(room => ({
    number: room.roomNumber,
    name: room.name
  }))

  return (
    <BookingCalendar
      userData={userData}
      bookingData={bookings}
      roomData={rooms}

    />
  );
}
