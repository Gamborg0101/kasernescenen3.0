'use server';
import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'fast-csv';
import { convertStartAndEndHour } from './utils/convertStartAndEndHour';
import { da } from '@faker-js/faker/.';

type uvaekaBooking = {
  beskrivelse: string;
  startUgeISO: number;
  startUge: string;
  startDag: string;
  startDato: number;
  startTid: number;
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
export default async function importCsv(): Promise<uvaekaBooking[]> {
  return new Promise((resolve, reject) => {
    const rows: uvaekaBooking[] = [];

    fs.createReadStream(path.resolve(__dirname, '../public', 'timetable.csv'))
      .pipe(csv.parse({ headers: true }))
      .on('error', (error) => reject(error))
      .on('data', (row) => {
        rows.push({
          beskrivelse: row['Beskrivelse'],
          startUgeISO: Number(row['Startuge (ISO)']),
          startUge: row['Startuge'],
          startDag: row['Startdag'],
          startDato: row['Startdato'],
          startTid: row['Starttid'],
          slutdag: row['Slutdag'],
          slutdato: row['Slutdato'],
          sluttid: row['Sluttid'],
          varighed: row['Varighed'],
          type: row['Type'],
          underviser: row['Underviser(e)'],
          lokale: row['Lokale(r)'],
          hold: row['Hold'],
          fakultet: row['Fakultet'],
          størrelse: row['Størrelse'],
          noter: row['Noter'],
          draft: row['Draft'] === 'Ja',
          videokonference: row['Denne aktivitet finder sted online'] === 'Ja',
        });
      })
      .on('end', (rowCount: number) => {
        console.log(`Parsed ${rowCount} rows`);
        resolve(rows);
      });
  });
}

// async function createBookingFromCsv() {
//   const data = await importCsv();
//   const starter = [];

//   data.map((item) => {
//     const startTime = new Date(`${item.startDato}T${item.startTid}`);
//     const endTime = new Date(`${item.slutdato}T${item.sluttid}`);

//     starter.push(convertStartAndEndHour(startTime, endTime, endHourMins, item.startDag));

//     starter.map((item) => {
//       console.log(item);
//     });
//   });

/**
 * TO DO
 * Convert the other usage of convertStartAdnEndHour into a date object, so the function will only accept start and End as date objects.
 *
 *
 *
 *
 */

/**
     * 
     * startHour: string,
  endHour: number,
  endHourMins: string,
  getDate: string,
     */

// data.forEach((element) => {
//   console.log(element.startUgeISO);
// });
//}

/*
DATA FORMAT:
export async function createBooking({ roomId, startTime, endTime, userId, reason }: CreateBooking) {
  await prisma.booking.create({
    data: {
      roomId: roomId,
      startTime: startTime,
      endTime: endTime,
      userId: userId,
      reason: reason,
    },
  });
}

*/

//createBookingFromCsv();
