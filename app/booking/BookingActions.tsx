import { prisma } from '@/db';

export async function getBookings() {
  const bookings = prisma.booking.findMany();
  return bookings;
}
