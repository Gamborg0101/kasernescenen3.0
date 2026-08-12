import { expect, test, afterEach } from 'bun:test';
import { prisma } from '@/db';
import { createBooking } from './bookings';
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

  const results = await Promise.allSettled([booking1, booking2]);

  const bookings = await prisma.booking.findMany({
    where: {
      roomId: room.id,
      AND: [{ startTime: { lt: endTime } }, { endTime: { gt: startTime } }],
    },
  });

  const fulfilled = results.filter((r) => r.status === 'fulfilled');
  expect(fulfilled.length).toBe(1);
  expect(bookings.length).toBe(1);
});
