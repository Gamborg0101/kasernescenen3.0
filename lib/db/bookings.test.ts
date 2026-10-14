import { expect, test, afterEach } from 'bun:test';
import { prisma } from '@/db';
import { createBooking, deleteBooking } from './bookings';
import { getRoomByNum } from './rooms';

afterEach(async () => {
  await prisma.booking.deleteMany({
    where: {
      reason: 'testbookings',
    },
  });
});

const room = await getRoomByNum('126');
if (!room) throw 'Der var ikke noget rum id på dette rumnummer';

test('Two users can not make the same booking', async () => {
  const startTime = new Date('August 19, 2026, 12:00:00');
  const endTime = new Date('August 19, 2026, 13:30:00');
  //No need for await, since we are testing a race condition.
  const booking1 = createBooking({
    roomNumber: room.roomNumber,
    startTime: startTime,
    endTime: endTime,
    userId: 1,
    reason: 'testbookings',
  });

  const booking2 = createBooking({
    roomNumber: room.roomNumber,
    startTime: startTime,
    endTime: endTime,
    userId: 1,
    reason: 'testbookings',
  });

  await Promise.allSettled([booking1, booking2]);
  const bookings = await prisma.booking.findMany({
    where: {
      roomId: room.id,
      AND: [{ startTime: { lt: endTime } }, { endTime: { gt: startTime } }],
    },
  });
  expect(bookings.length).toBe(1);
});

test('A student cannot delete another user booking ', async () => {
  const startTime = new Date('August 19, 2026, 12:00:00');
  const endTime = new Date('August 19, 2026, 13:30:00');
  const booking = await createBooking({
    roomNumber: room.roomNumber,
    startTime: startTime,
    endTime: endTime,
    userId: 1,
    reason: 'testbookings',
  });

  expect(booking.success).toBe(true);

  const findBooking = await prisma.booking.findFirstOrThrow({
    where: {
      userId: 1,
      reason: 'testbookings',
    },
  });
  expect(deleteBooking(findBooking.id, 2, 'student')).rejects.toThrow();

  const findBookingAfterAttempt = await prisma.booking.findUnique({
    where: {
      id: findBooking.id,
    },
  });

  expect(findBookingAfterAttempt).not.toBeNull();
});

test('An admin can delete another user booking', async () => {
  const startTime = new Date('August 19, 2026, 12:00:00');
  const endTime = new Date('August 19, 2026, 13:30:00');
  const booking = await createBooking({
    roomNumber: room.roomNumber,
    startTime: startTime,
    endTime: endTime,
    userId: 1,
    reason: 'testbookings',
  });

  expect(booking.success).toBe(true);

  const findBooking = await prisma.booking.findFirstOrThrow({
    where: {
      userId: 1,
      reason: 'testbookings',
    },
  });
  await deleteBooking(findBooking.id, 2, 'admin');

  const findBookingAfterAttempt = await prisma.booking.findUnique({
    where: {
      id: findBooking.id,
    },
  });
  expect(findBookingAfterAttempt).toBeNull();
});

test('A student can delete their own booking', async () => {
  const startTime = new Date('August 19, 2026, 12:00:00');
  const endTime = new Date('August 19, 2026, 13:30:00');
  const booking = await createBooking({
    roomNumber: room.roomNumber,
    startTime: startTime,
    endTime: endTime,
    userId: 1,
    reason: 'testbookings',
  });

  expect(booking.success).toBe(true);

  const findBooking = await prisma.booking.findFirstOrThrow({
    where: {
      userId: 1,
      reason: 'testbookings',
    },
  });
  await deleteBooking(findBooking.id, 1, 'student');

  const findBookingAfterAttempt = await prisma.booking.findUnique({
    where: {
      id: findBooking.id,
    },
  });
  expect(findBookingAfterAttempt).toBeNull();
});
