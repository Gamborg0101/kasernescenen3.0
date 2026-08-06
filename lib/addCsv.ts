'use server';
import ical from 'ical';
import { loadEnvConfig } from '@next/env';
loadEnvConfig(process.cwd(), true);
import { prisma } from '@/db';

export type uvaekaBooking = {
  beskrivelse: string;
  startUgeISO: string;
  startUge: string;
  startDag: string;
  startDato: string;
  starttid: string;
  slutdag: string;
  slutdato: string;
  sluttid: string;
  varighed: string;
  type: string;
  underviser: string;
  lokale: string;
  hold: string;
  fakultet: string;
  størrelse: string;
  noter: string;
  draft: boolean;
  videokonference: boolean;
};

export default async function importICAL() {
  const ICALData = await fetch(
    'https://timetable.au.dk/ical?6a68bd80&group=false&eu=NTMyMDY0&h=rWEflVuL72v3M_PSOrRflBUADizSye1UUeIJwpYLtrY=&zoneFeed=true',
  );

  const ICALText = await ICALData.text();
  const data = ical.parseICS(ICALText);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const rooms = await prisma.booking.findMany({});

  console.log('hi');
  console.log(rooms);
}
console.log(process.env);
importICAL();

//   for (const k in data) {
//     if (data.hasOwnProperty(k)) {
//       const ev = data[k];
//       if (data[k].type == 'VEVENT') {
//         console.log(JSON.stringify(ev.location));
//         const roomNum = Number(ev.location?.split(' ')[0].split('-')[1]);
//         const room = await prisma.room.findFirst({
//           where: {
//             roomNum: roomNum,
//           },
//         });

//         // console.log({
//         //   user: 'uvaeka',
//         //   roomId: ev.location?.split(' ')[0].split('-')[1],
//         //   startTime: ev.start,
//         //   endTime: ev.end,
//         //   reason: ev.summary,
//         // });

//         //     const createdBookings = await prisma.booking.upsert({
//         //       where: { roomId: ev.location },
//         //       update: {},
//         //       create: {
//         //         userId: 'uvaeka',
//         //         roomId: ev.location,
//         //         startTime: ev.start,
//         //         endTime: ev.end,
//         //         reason: ev.summary,
//         //       },
//         //     });
//       }
//     }
//   }

//   /**
//    *
//    * const createdRoom = await prisma.room.upsert({
//       where: { roomNum: room.roomNum },
//       update: {},
//       create: {
//         roomNum: room.roomNum,
//         name: room.name,
//         capacity: room.capacity,
//         location: room.location,
//       },
//     });
//    *
//    */

//   // prisma do the update and add bookings to my bookings table

//   /**
//    * hent alle rum fra db, og lav rooms færdig med dette.
//    * lav en upsert hvor indholdet er komplient med booking schema
//    * jeg lave ikke have prod database i development
//    * Jeg skal lave et id - og brug et uid
//    * Lav en UVAEKA bruger under seeding for at satisfy kontrakten på schema.
//    * Tilføj en optional i booking som hedder external id.
//    *http headers - særligt content types:
// 	Hvad er content type, og hvordan relatere det sig til broweseren?
// https://laravel.com/docs/13.x/responses#file-downloads - “method may be sued to generate a response that forces”

// https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Disposition
//    */

//   //console.log(iCalendarData);
// }

// importICAL();
// /**
//  *
//  * model Booking {
//   id        Int      @id @default(autoincrement())
//   userId    Int
//   roomId    Int
//   startTime DateTime
//   endTime   DateTime
//   reason    String
//   room      Room     @relation(fields: [roomId], references: [id])
//   user      User     @relation(fields: [userId], references: [id])
// }
//  */
