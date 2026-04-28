import { expect, test, toEqual } from 'bun:test';
import { convertStartAndEndHour } from './lib/utils/convertStartAndEndHour';

test('convertStartAndEndHour returns correct format', () => {
  const result = convertStartAndEndHour('08.00', 10, '30', '2026-06-16');
  expect(result.start).toEqual(new Date('2026-06-16 08:00'));
  expect(result.end).toEqual(new Date('2026-06-16 10:30'));
});

/* 

Ikke-logget-ind bruger bliver redirectet til /
Logget-ind men ikke-registreret bruger bliver sendt til /register
Ikke-admin der forsøger at tilgå /users bliver sendt til /
En admin må godt se /users
En registreret bruger uden admin-rettigheder må gerne tilgå andre sider end /users

convertStartAndEndHour har du allerede i gang med. For makeBooking og deleteABooking er det sværere — de afhænger af auth(), databasekald og revalidatePath, som alle kræver mocking. Det er nok for avanceret at starte med.
convertStartAndEndHour (det du er i gang med):

Returnerer korrekte Date-objekter
start er før end for normalt input
Formatering med punktum i startHour (fx "08.00") håndteres korrekt
Hvad sker der hvis endHourMins er "00"?
Hvad sker der hvis startHour mangler et punktum? (ingen .split-separator)


userActions.ts
DeleteUser og UpdateUser indeholder tilgangskontrol, som er interessant at teste — men igen kræver det mocking af auth(). Noget at vende tilbage til.
Logikken der er værd at notere sig til fremtidige tests:

DeleteUser må ikke køre hvis brugeren hverken er admin eller ejer af kontoen
UpdateUser må ikke køre hvis brugeren ikke er admin


UserList.tsx og WeekAndHours.tsx
Disse er React-komponenter. De kan testes med et bibliotek som React Testing Library, men det er et større skridt end unit-tests. Det du primært ville teste er:
UserList:

At listen viser det rigtige antal brugere
At en bruger forsvinder fra listen efter slet-knappen trykkes

WeekAndHours:

getBookingForHour returnerer den rigtige booking for en given time
createWeek genererer 7 dage
createHoursForDay starter kl. 07:00 og slutter kl. 22:00

WeekAndHours indeholder faktisk en del ren logik (getBookingForHour, createWeek, createHoursForDay) som du nemt kunne trække ud i en separat hjælpefil og teste direkte — præcis ligesom du gjorde med convertStartAndEndHour.

*/
