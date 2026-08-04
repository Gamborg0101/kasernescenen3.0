'use server';
import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'fast-csv';
import ical from 'ical';

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

async function importICAL() {
  const ICALData = await fetch(
    'https://timetable.au.dk/ical?6a68bd80&group=false&eu=NTMyMDY0&h=rWEflVuL72v3M_PSOrRflBUADizSye1UUeIJwpYLtrY=&zoneFeed=true',
  );

  const ICALText = await ICALData.text();
  const data = ical.parseICS(ICALText);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const rooms = {
    '1584-212 Undervisning': 123,
  };

  const upserts = [];
  for (const k in data) {
    if (data.hasOwnProperty(k)) {
      const ev = data[k];
      if (data[k].type == 'VEVENT') {
        // prisma do the update and add bookings to my bookings table
        console.log(ev);

        upserts.push({
          userId: 'Uvaeka',
          roomId: rooms[ev.location],
        });
      }
    }
  }

  /**
   * hent alle rum fra db, og lav rooms færdig med dette.
   * lav en upsert hvor indholdet er komplient med booking schema
   * jeg lave ikke have prod database i development
   * Jeg skal lave et id - og brug et uid
   * Lav en UVAEKA bruger under seeding for at satisfy kontrakten på schema.
   * Tilføj en optional i booking som hedder external id.
   *http headers - særligt content types: 
	Hvad er content type, og hvordan relatere det sig til broweseren? 
https://laravel.com/docs/13.x/responses#file-downloads - “method may be sued to generate a response that forces”

https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Disposition
   */

  //console.log(iCalendarData);
}

importICAL();
/**
 * 
 * model Booking {
  id        Int      @id @default(autoincrement())
  userId    Int
  roomId    Int
  startTime DateTime
  endTime   DateTime
  reason    String
  room      Room     @relation(fields: [roomId], references: [id])
  user      User     @relation(fields: [userId], references: [id])
}
 */

// export default async function importCsv(): Promise<uvaekaBooking[]> {

//   return new Promise((resolve, reject) => {
//     const rows: uvaekaBooking[] = [];
//     const fileLocation = path.resolve(__dirname, '../public', 'timetable.csv');

//     if (!fs.existsSync(fileLocation)) {
//       console.log('Der mangler en fil');
//     }

//     fs.createReadStream(fileLocation)
//       .pipe(csv.parse({ headers: true }))
//       .on('error', (error) => reject(error))
//       .on('data', (row) => {
//         rows.push({
//           beskrivelse: row['Beskrivelse'],
//           startUgeISO: row['Startuge (ISO)'],
//           startUge: row['Startuge'],
//           startDag: row['Startdag'],
//           startDato: row['Startdato'],
//           starttid: row['Starttid'],
//           slutdag: row['Slutdag'],
//           slutdato: row['Slutdato'],
//           sluttid: row['Sluttid'],
//           varighed: row['Varighed'],
//           type: row['Type'],
//           underviser: row['Underviser(e)'],
//           lokale: row['Lokale(r)'],
//           hold: row['Hold'],
//           fakultet: row['Fakultet'],
//           størrelse: row['Størrelse'],
//           noter: row['Noter'],
//           draft: row['Draft'] === 'Ja',
//           videokonference: row['Denne aktivitet finder sted online'] === 'Ja',
//         });
//         rows.map((row) => {
//           console.log(row);
//           //await makeBookingFromCSV(row)
//         });
//       })
//       .on('end', () => resolve(rows));
//   });
// }

//importCsv();
