import { prisma } from '@/db';

export async function getBookings() {
  const bookings = await prisma.booking.findMany();
  return bookings;
}
