import { expect, test, toEqual } from 'bun:test';
import { convertStartAndEndHour } from './lib/actions/bookingActions';

test('convertStartAndEndHour returns correct format', () => {
  const result = convertStartAndEndHour('08.00', 10, '30', '2026-06-16');
  expect(result.start).toEqual(new Date('2026-06-16 08:00'));
  expect(result.end).toEqual(new Date('2026-06-16 10:30'));
});
