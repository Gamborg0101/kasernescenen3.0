import { expect, test, afterEach } from 'bun:test';
import { convertStartAndEndHour } from './lib/utils/convertStartAndEndHour';
import { prisma } from './db';
import { createBooking } from './lib/db/bookings';
import { getRoomByNum } from './lib/db/rooms';

afterEach(async () => {
  await prisma.booking.deleteMany({
    where: {
      reason: 'testbookings',
    },
  });
});

const room = await getRoomByNum(126);
if (!room) throw 'Der var ikke noget rum id på dette rumnummer';

test('convertStartAndEndHour returns correct format', () => {
  const result = convertStartAndEndHour('08.00', 10, '30', '2026-06-16');
  expect(result.start).toEqual(new Date('2026-06-16 08:00'));
  expect(result.end).toEqual(new Date('2026-06-16 10:30'));
});

test('Two users can not make the same booking', async () => {
  const startTime = new Date('August 19, 2026, 12:00:00');

  const endTime = new Date('August 19, 2026, 13:30:00');

  const booking1 = createBooking({
    roomId: room.id,
    startTime: startTime,
    endTime: endTime,
    userId: 1,
    reason: 'testbookings',
  });

  const booking2 = createBooking({
    roomId: room.id,
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
