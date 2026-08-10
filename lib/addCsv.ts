import ical from 'ical';
import { loadEnvConfig } from '@next/env';
loadEnvConfig(process.cwd(), true);
import { prisma } from '@/db';
import bookingConflicts from './utils/bookingConflicts';

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
  await prisma.booking.deleteMany({ where: { userId: 1 } });

  for (const k in data) {
    if (data.hasOwnProperty(k)) {
      const ev = data[k];
      if (data[k].type == 'VEVENT') {
        //console.log(JSON.stringify(ev.location?.split(' ')[0].split('-')[1]));
        const roomNumber = ev.location?.split(' ')[0].split('-')[1];
        const room = await prisma.room.findFirst({
          where: {
            roomNumber: String(roomNumber),
          },
        });
        //console.log(room.id);

        if (!room || !ev.start || !ev.end) continue;

        console.log({ room: roomNumber, start: ev.start, end: ev.end, id: ev.uid });

        try {
          const validBooking = await bookingConflicts({
            startHour: ev.start,
            endTime: ev.end,
            roomNumber: String(roomNumber),
            info: String(ev.summary),
          });

          if (!validBooking?.userId || !validBooking?.roomNumber) {
            console.log('Skipping booking without valid user/room assignment:', ev.summary);
            continue;
          }

          await prisma.booking.create({
            data: {
              userId: 1,
              roomId: Number(validBooking.roomNumber),
              startTime: validBooking.startTime || new Date(),
              endTime: validBooking.endTime || new Date(),
              reason: validBooking.reason || '',
            },
          });
          console.log('Booking: ', ev.summary, 'was created');
        } catch (e) {
          console.log('There was something wrong with: \n', ev.uid, e);
        }
      }
    }
  }
}
importICAL();

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
