'use server';

import { expect, test } from 'bun:test';
import { convertStartAndEndHour } from './lib/utils/convertStartAndEndHour';
import { signIn } from './auth/authSetup';

test('convertStartAndEndHour returns correct format', () => {
  const result = convertStartAndEndHour('08.00', 10, '30', '2026-06-16');
  expect(result.start).toEqual(new Date('2026-06-16 08:00'));
  expect(result.end).toEqual(new Date('2026-06-16 10:30'));
});

test('Redirect user to /', async () => {
  const res = await fetch('http://localhost:3000/booking');
  expect(res.url).toBe('http://localhost:3000/');
});

test('Redirect to booking page if not logged in', async () => {
  signIn('google');
  const res = await fetch('http://localhost:3000/booking');
  expect(res.url).toBe('http://localhost:3000/booking');
});

/* 
Tests
  Logget-ind men ikke-registreret bruger bliver sendt til /register
  Ikke-admin der forsøger at tilgå /users bliver sendt til /
  En admin må godt se /users
  start er før end for normalt input
  Deleteuser logik må ikke køre, hvis brugerem ikke er admin eller ejer af kontoen (samme med booking)
  UpdateUser må ikke køre hvis brugeren ikke er admin

*/
